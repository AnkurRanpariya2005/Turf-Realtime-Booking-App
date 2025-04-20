package com.BoxCricket.BoxCricket.controller;

import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.service.UserService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController()
@RequestMapping("/api/user")
@Slf4j
public class UserController {
    
    @Autowired
    private UserService userService;  

    @GetMapping("/venues")
    public List<VenueDto> getAllVenues(@RequestParam(value = "location", required = false) String location) {
       return userService.getAllVenues(location);
    }
   
    @GetMapping("/venue/{venueId}")
    public Venue getVenueById(@PathVariable Long venueId) {
        return userService.getVenueById(venueId);
    }

    @PutMapping("update")
    public User updateUser(@RequestHeader("Authorization") String token, @RequestBody User user) throws Exception {
        User reqUser = userService.getUserByToken(token);
        return userService.updateUser(user, reqUser.getId());
    }


    @GetMapping("/profile")
    public User getUsernameFromToken(@RequestHeader("Authorization") String token) {
        User user = userService.getUserByToken(token);
        user.setPassword(null);
        return user;
        
    }

    @GetMapping("/my-booking")
    public List<Booking> myBookings(@RequestHeader("Authorization") String token) {
        return userService.myBookings(token);   
    }
    
}
