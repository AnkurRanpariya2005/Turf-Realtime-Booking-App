package com.BoxCricket.BoxCricket.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
 
    @Autowired
    private AdminService adminService;

    @GetMapping("/get/all/owners")
    public ResponseEntity<?> getAllOwners() {
        return adminService.getAllOwners();
    }

    @GetMapping("/get/all/users")
    public ResponseEntity<?> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/get/all/venues")
    public ResponseEntity<?> getAllVenues() {
        return adminService.getAllVenues();
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return adminService.getStats();
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return adminService.getAllBookings();
    }
    

}
