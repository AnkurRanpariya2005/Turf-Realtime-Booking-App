package com.BoxCricket.BoxCricket.controller;

import com.BoxCricket.BoxCricket.dto.Role;
import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.repository.VenueRepository;
import com.BoxCricket.BoxCricket.response.ApiResponse;
import com.BoxCricket.BoxCricket.service.UserService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private VenueRepository venueRepository;

    @PostMapping("/register/user")
    public ResponseEntity<ApiResponse<?>> registerUser(@RequestBody User user) throws Exception {
        return userService.registerUser(user);
        
    }

    // Owner Registration
    @PostMapping("/register/owner")
    public ResponseEntity<ApiResponse<?>> registerOwner(@RequestBody User user) throws Exception {
        user.setRole(Role.OWNER);
        return userService.registerOwner(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> loginUser(@RequestBody User user) {
        return userService.verify(user);
        
    }

}
