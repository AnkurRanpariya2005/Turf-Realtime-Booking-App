package com.BoxCricket.BoxCricket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.BoxCricket.BoxCricket.controller.WebSocketController;
import com.BoxCricket.BoxCricket.dto.SlotRequest;
import com.BoxCricket.BoxCricket.dto.SlotStatus;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.BookingRepository;
import com.BoxCricket.BoxCricket.repository.UserRepository;
import com.BoxCricket.BoxCricket.repository.VenueRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class BookingService {

    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private WebSocketController webSocketController;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    public BookingService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    
    public long countBookings() {
        return bookingRepository.countBooking(); // Assuming a method exists to count bookings in your TurfRepository
    }

    private Map<String, SlotStatus> getFullSlotStatus(Long venueId, String date) {
        Map<String, SlotStatus> slots = new HashMap<>();
        List<String> timeSlots = getAllTimeSlots();

        for (String slot : timeSlots) {
            String slotKey = generateSlotKey(venueId, date, slot);
            String blockedUserId = redisTemplate.opsForValue().get(slotKey);

            if (blockedUserId != null) {
                slots.put(slot, new SlotStatus(blockedUserId, "Blocked", blockedUserId));
            } else {
                String slotBookingStatus = redisTemplate.opsForValue().get(slotKey);
                if ("BOOKED".equals(slotBookingStatus)) {
                    slots.put(slot, new SlotStatus(null, "Booked", null));
                } else {
                    slots.put(slot, new SlotStatus(null, "Available", null));
                }
            }
        }

        return slots;
    }

    public ResponseEntity<Map<String, SlotStatus>> getSlots(
            @PathVariable Long venueId,
            @PathVariable String date,
            @RequestParam Long userId) {
        Map<String, SlotStatus> slots = new HashMap<>();
        List<String> timeSlots = getAllTimeSlots(); // Generate the list of slots

        for (String slot : timeSlots) {
            String slotKey = generateSlotKey(venueId, date, slot);
            String blockedUserId = redisTemplate.opsForValue().get(slotKey);
            log.info("Blocked User : ",blockedUserId );

            if (blockedUserId != null) {
                if (blockedUserId.toString().equals(userId.toString())) {
                    slots.put(slot, new SlotStatus(blockedUserId, "SelectedCurrentUser", userId.toString()));
                } else {
                    // If another user has blocked the slot
                    slots.put(slot, new SlotStatus(blockedUserId, "Blocked", blockedUserId.toString()));
                }
            } else {
                // Check if the slot is booked (e.g., stored as "BOOKED" in Redis or database)
                String slotBookingStatus = redisTemplate.opsForValue().get(slotKey);
                if ("BOOKED".equals(slotBookingStatus)) {
                    slots.put(slot, new SlotStatus(null, "Booked", null));
                } else {
                    slots.put(slot, new SlotStatus(null, "Available", null));
                }
            }
        }
        webSocketController.broadcastSlotsUpdate(venueId, date, slots);
        return ResponseEntity.ok(slots);
    }

    // Block the slot for the current user
    public ResponseEntity<Void> blockSlot(SlotRequest slotRequest) {
        String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot());
        redisTemplate.opsForValue().set(slotKey, slotRequest.getUserId().toString());
        redisTemplate.expire(slotKey, 1, TimeUnit.MINUTES);

        // Generate the full slot list and broadcast it
        Map<String, SlotStatus> slots = getFullSlotStatus(slotRequest.getVenueId(), slotRequest.getDate());
        webSocketController.broadcastSlotsUpdate(slotRequest.getVenueId(), slotRequest.getDate(), slots);

        return ResponseEntity.ok().build();
    }

    // Unblock the slot for the current user
    public ResponseEntity<Void> unblockSlot(SlotRequest slotRequest) {
        String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot());
        redisTemplate.delete(slotKey);

        // Generate the full slot list and broadcast it
        Map<String, SlotStatus> slots = getFullSlotStatus(slotRequest.getVenueId(), slotRequest.getDate());
        webSocketController.broadcastSlotsUpdate(slotRequest.getVenueId(), slotRequest.getDate(), slots);

        return ResponseEntity.ok().build();
    }

    // Book multiple slots
    public ResponseEntity<String> bookSlots(SlotRequest slotRequest) {
        boolean allSlotsBlocked = true;
        Venue venue = venueRepository.findById(slotRequest.getVenueId()).orElse(null);
        User user = userRepository.findById(slotRequest.getUserId()).orElse(null);

        if (venue == null || user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid venue or user.");
        }

        for (String slot : slotRequest.getSlots()) {
            String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slot);
            String blockedBy = redisTemplate.opsForValue().get(slotKey);
            if (blockedBy == null || !blockedBy.equals(slotRequest.getUserId().toString())) {
                allSlotsBlocked = false;
                break;
            }
        }

        if (allSlotsBlocked) {
            for (String slot : slotRequest.getSlots()) {
                Booking booking = new Booking();
                booking.setVenue(venue);
                booking.setDate(slotRequest.getDate());
                booking.setSlot(slot);
                booking.setUser(user);
                bookingRepository.save(booking);

                String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slot);
                redisTemplate.opsForValue().set(slotKey, "BOOKED");
            }

            // Generate the full slot list and broadcast it
            Map<String, SlotStatus> slots = getFullSlotStatus(slotRequest.getVenueId(), slotRequest.getDate());
            webSocketController.broadcastSlotsUpdate(slotRequest.getVenueId(), slotRequest.getDate(), slots);

            return ResponseEntity.ok("Slots booked successfully");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Some slots are not blocked by the current user.");
        }
    }

    private String generateSlotKey(Long venueId, String date, String slot) {
        return venueId + ":" + date + ":" + slot;
    }

    private List<String> getAllTimeSlots() {
        // Generate time slots, e.g., ["00:00", "01:00", ... , "23:00"]
        return Arrays.asList("00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00",
                "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00",
                "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00",
                "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00",
                "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00");
    }

    public List<Booking> getBookings(Long venueId) {
        return bookingRepository.findByVenueId(venueId);
    }

}
