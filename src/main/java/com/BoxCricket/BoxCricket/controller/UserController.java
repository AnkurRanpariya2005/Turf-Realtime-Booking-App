package com.BoxCricket.BoxCricket.controller;

import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.VenueRepository;
import com.BoxCricket.BoxCricket.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController()
@RequestMapping("/api/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private VenueRepository venueRepository;

    @GetMapping("/venues")
    public List<VenueDto> getAllVenues() {
        return venueRepository.findAllVenues();
    }

    // User: Fetch venue details by ID
    @GetMapping("/venue/{venueId}")
    public Venue getVenueById(@PathVariable Long venueId) {
        return venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found"));
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
    
}
