package com.BoxCricket.BoxCricket.controller;

import com.BoxCricket.BoxCricket.dto.SlotRequest;
import com.BoxCricket.BoxCricket.dto.SlotStatus;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.BookingRepository;
import com.BoxCricket.BoxCricket.repository.UserRepository;
import com.BoxCricket.BoxCricket.repository.VenueRepository;
// import com.BoxCricket.BoxCricket.service.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/booking")
@Slf4j
public class BookingController {

    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    public BookingController(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // Fetch available and blocked slots
    @GetMapping("/slots/{venueId}/{date}")
    public ResponseEntity<Map<String, SlotStatus>> getSlots(
            @PathVariable Long venueId,
            @PathVariable String date,
            @RequestParam Long userId) { // Pass userId to prevent user from blocking their own slots
        Map<String, SlotStatus> slots = new HashMap<>();
        List<String> timeSlots = getAllTimeSlots(); // You need to generate the list of slots

        for (String slot : timeSlots) {
            String slotKey = generateSlotKey(venueId, date, slot);
            String blockedUserId = redisTemplate.opsForValue().get(slotKey);

            if (blockedUserId != null) {
                slots.put(slot, new SlotStatus(blockedUserId, "blocked"));
            } else {
                slots.put(slot, new SlotStatus(null, "available"));
            }
        }

        return ResponseEntity.ok(slots);
    }

    // Block the slot for the current user
    @PostMapping("/block")
    public ResponseEntity<Void> blockSlot(
            @RequestBody SlotRequest slotRequest) {
        String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot());
        redisTemplate.opsForValue().set(slotKey, slotRequest.getUserId().toString());
        redisTemplate.expire(slotKey, 1, TimeUnit.MINUTES);
        return ResponseEntity.ok().build(); 
    }

    // Unblock the slot for the current user
    @PostMapping("/unblock")
    public ResponseEntity<Void> unblockSlot(
            @RequestBody SlotRequest slotRequest) {
        String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot());
        redisTemplate.delete(slotKey);
        return ResponseEntity.ok().build();
    }

    // Book multiple slots
    @PostMapping("/book")
public ResponseEntity<String> bookSlots(@RequestBody SlotRequest slotRequest) {
    boolean allSlotsBlocked = true;

    // Retrieve venue and user data from the database
    Venue venue = venueRepository.findById(slotRequest.getVenueId()).orElse(null);
    User user = userRepository.findById(slotRequest.getUserId()).orElse(null);

    if (venue == null || user == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid venue or user.");
    }

    // Check if each slot is blocked by the current user
    for (String slot : slotRequest.getSlots()) {
        String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slot);

        // Verify if the slot is blocked by the current user
        String blockedBy = redisTemplate.opsForValue().get(slotKey);
        if (blockedBy == null || !blockedBy.equals(slotRequest.getUserId().toString())) {
            allSlotsBlocked = false;
            break;
        }
    }

    // If all selected slots are blocked, proceed with booking
    if (allSlotsBlocked) {
        // Iterate through each slot to book individually
        for (String slot : slotRequest.getSlots()) {

            try {
                Booking booking = new Booking();
                booking.setVenue(venue);
                booking.setDate(slotRequest.getDate());
                booking.setSlot(slot); // Save each slot individually
                booking.setUser(user); // Set the booking creation time
                bookingRepository.save(booking); // Save the individual slot booking
            } catch (Exception e) {
                log.info("erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr:{}",e);
            }
            
        }

        // Mark each slot as "booked" in Redis
        for (String slot : slotRequest.getSlots()) {
            String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slot);
            redisTemplate.opsForValue().set(slotKey, "BOOKED"); // Mark slot as booked in Redis
        }

        return ResponseEntity.ok("Slots booked successfully");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Some slots are not blocked by the current user.");
    }
}


    private String generateSlotKey(Long venueId, String date, String slot) {
            return venueId + ":" + date + ":" + slot;
    }

    private List<String> getAllTimeSlots() {
        // Generate time slots, e.g., ["00:00", "01:00", ... , "23:00"]
        return Arrays.asList("00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00");
    }
}
