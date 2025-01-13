package com.BoxCricket.BoxCricket.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.BoxCricket.BoxCricket.dto.BookingStatus;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.BookingRepository;
import com.BoxCricket.BoxCricket.repository.UserRepository;
import com.BoxCricket.BoxCricket.repository.VenueRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class BookingService {


    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private WebSocketService websocketService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VenueRepository venueRepository;

    // public Map<String, String> getSlotsForDate(Long venueId, String date) {
    //     String redisKey = "slots:" + venueId + ":" + date;
    //     Map<Object, Object> redisSlots = redisTemplate.opsForHash().entries(redisKey);

    //     // Fetch confirmed bookings from the database
    //     Optional<Booking> confirmedBookings = bookingRepository.findByVenueIdAndBookingDate(venueId, date);

    //     Map<String, String> slots = new HashMap<>();
    //     for (int hour = 0; hour < 24; hour++) {
    //         String slot = String.format("%02d:00-%02d:00", hour, hour + 1);

    //         // Check Redis first for blocked slots
    //         if (redisSlots.containsKey(slot)) {
    //             slots.put(slot, redisSlots.get(slot).toString());
    //         } else {
    //             // Check database for confirmed bookings
    //             boolean isBooked = confirmedBookings.stream()
    //                     .anyMatch(booking -> booking.getTimeSlot().equals(slot));
    //             slots.put(slot, isBooked ? "booked" : "available");
    //         }
    //     }

    //     return slots;
    // }
    public Map<String, String> getSlotsForDate(Long venueId, String date) {
        String redisKey = "slots:" + venueId + ":" + date;
        Map<Object, Object> redisSlots = redisTemplate.opsForHash().entries(redisKey);
    
        // Fetch confirmed bookings from the database
        Optional<Booking> confirmedBookings = bookingRepository.findByVenueIdAndBookingDate(venueId, date);
    
        Map<String, String> slots = new HashMap<>();
        for (int hour = 0; hour < 24; hour++) {
            String slot = String.format("%02d:00-%02d:00", hour, hour + 1);
    
            // Check Redis for status
            String status = (String) redisSlots.get(slot);
            if (status == null || "available".equals(status)) {
                // If Redis key has expired, check database
                boolean isBooked = confirmedBookings.stream()
                        .anyMatch(booking -> booking.getTimeSlot().equals(slot));
                slots.put(slot, isBooked ? "booked" : "available");
            } else {
                slots.put(slot, status);
            }
        }
    
        return slots;
    }
    
    

    // public boolean blockSlot(Long venueId, String date, String slot) {
    //     String redisKey = "slots:" + venueId + ":" + date;
        
    //     log.info("redisKey: @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", slot);
    //     // Check if the slot is already blocked or booked
    //     String currentStatus = (String) redisTemplate.opsForHash().get(redisKey, slot);
    //     if ("available".equals(currentStatus) || currentStatus == null) {
    //         redisTemplate.opsForHash().put(redisKey, slot, "blocked");
    //         redisTemplate.expire(redisKey + ":" + slot, 1, TimeUnit.MINUTES); // Temporary block for 5 minutes
    //         websocketService.sendSlotUpdate(venueId, date, slot, "blocked");
    //         return true;
    //     }
    //     return false;
    // }

    public boolean blockSlot(Long venueId, String date, String slot) {
        String redisKey = "slots:" + venueId + ":" + date;
    
        // Check if the slot is already blocked or booked
        String currentStatus = (String) redisTemplate.opsForHash().get(redisKey, slot);
        if ("available".equals(currentStatus) || currentStatus == null) {
            redisTemplate.opsForHash().put(redisKey, slot, "blocked");
    
            // Set expiration for the hash field
            redisTemplate.expire(redisKey, 1, TimeUnit.MINUTES);
            websocketService.sendSlotUpdate(venueId, date, slot, "blocked");
            return true;
        }
        return false;
    }
    
    
    public void confirmSlot(Long venueId, String date, String slot, Long userId) {
        String redisKey = "slots:" + venueId + ":" + date;

        // Mark as booked in Redis
        redisTemplate.opsForHash().put(redisKey, slot, "booked");

        Venue venue = venueRepository.findById(venueId).orElseThrow();
        User user = userRepository.findById(userId).orElseThrow();

        // Save booking in the database
        Booking booking = new Booking();
        booking.setVenue(venue); // Assuming a constructor or setting ID
        booking.setUser(user);
        booking.setBookingDate(date);
        booking.setTimeSlot(slot);
        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        websocketService.sendSlotUpdate(venueId, date, slot, "booked");
    }

    
}


