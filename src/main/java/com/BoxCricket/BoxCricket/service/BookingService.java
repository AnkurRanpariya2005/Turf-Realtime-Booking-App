// package com.BoxCricket.BoxCricket.service;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.redis.core.RedisTemplate;
// import org.springframework.stereotype.Service;

// import com.BoxCricket.BoxCricket.dto.SlotRequest;
// import com.BoxCricket.BoxCricket.entity.Booking;
// import com.BoxCricket.BoxCricket.entity.User;
// import com.BoxCricket.BoxCricket.entity.Venue;
// import com.BoxCricket.BoxCricket.repository.BookingRepository;
// import com.BoxCricket.BoxCricket.repository.UserRepository;
// import com.BoxCricket.BoxCricket.repository.VenueRepository;

// import java.util.HashMap;
// import java.util.LinkedHashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;
// import java.util.concurrent.TimeUnit;

// @Service
// public class BookingService {

//     @Autowired
//     private RedisTemplate<String, String> redisTemplate;

//     @Autowired
//     private BookingRepository bookingRepository;

//     @Autowired
//     private VenueRepository venueRepository;

//     @Autowired
//     private UserRepository userRepository;

//     public Map<String, Map<String, Object>> getSlotsForDate(Long venueId, String date, Long userI) {
//     Map<String, Map<String, Object>> slots = new LinkedHashMap<>();

//     // Generate hourly slots
//     for (int hour = 0; hour < 24; hour++) {
//         String slot = String.format("%02d:00", hour);
//         String slotKey = generateSlotKey(venueId, date, slot);

//         Object userId = redisTemplate.opsForValue().get(slotKey);
//         Map<String, Object> slotDetails = new HashMap<>();

//         if (userId != null) {
//             slotDetails.put("status", "blocked");
//             slotDetails.put("userId", userId);
//         } else {
//             slotDetails.put("status", "available");
//             slotDetails.put("userId", null);
//         }

//         slots.put(slot, slotDetails);
//     }
//     return slots;
// }


//     public boolean blockSlot(Long venueId, String date, String slot, Long userId) {
//         String redisKey = "slots:" + venueId + ":" + date;

//         String currentStatus = (String) redisTemplate.opsForHash().get(redisKey, slot);
//         if ("available".equals(currentStatus) || currentStatus == null) {
//             redisTemplate.opsForHash().put(redisKey, slot, "blocked:" + userId);
//             redisTemplate.expire(redisKey, 1, TimeUnit.MINUTES);
//             return true;
//         }
//         return false;
//     }

//     public void unblockSlot(SlotRequest slotRequest) {
//         String slotKey = generateSlotKey(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot());
//         String userKey = slotRequest.getUserId().toString();

//         // Unblock only if the current user had blocked it
//         Object currentUser = redisTemplate.opsForValue().get(slotKey);
//         if (currentUser != null && currentUser.equals(userKey)) {
//             redisTemplate.delete(slotKey);
//         }
//     }

//     public void confirmSlot(Long venueId, String date, String slot, Long userId) {
//         String redisKey = "slots:" + venueId + ":" + date;

//         redisTemplate.opsForHash().put(redisKey, slot, "booked");

//         Venue venue = venueRepository.findById(venueId).orElseThrow();
//         User user = userRepository.findById(userId).orElseThrow();

//         Booking booking = new Booking();
//         booking.setVenue(venue);
//         booking.setUser(user);
//         // booking.setBookingDate(date);
//         // booking.setTimeSlot(slot);
//         bookingRepository.save(booking);
//     }

//     private String generateSlotKey(Long venueId, String date, String slot) {
//                     return "slot:" + venueId + ":" + date + ":" + slot;
//     }
// }
