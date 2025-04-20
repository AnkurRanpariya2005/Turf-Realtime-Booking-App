package com.BoxCricket.BoxCricket.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.BookingRepository;
import com.BoxCricket.BoxCricket.response.ApiResponse;

@Service
public class AdminService {

    @Autowired
    private UserService userService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    public ResponseEntity<?> getAllOwners() {
        List<User> owners = userService.getAllOwners();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched All Owners", owners)
            );
    }

    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched All Users", users)
            );
    }

    public ResponseEntity<?> getAllVenues() {
        List<Venue> venues = userService.getAllVenues();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched All Venues", venues)
            );
    }

    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userService.countUsers());
        stats.put("totalOwners", userService.countOwners());
        stats.put("totalBookings", bookingService.countBookings());
        return ResponseEntity.ok(stats);
    }


    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.getAll());
    }

}
