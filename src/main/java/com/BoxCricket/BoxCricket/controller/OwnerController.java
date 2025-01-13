package com.BoxCricket.BoxCricket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.VenueRepository;
import com.BoxCricket.BoxCricket.service.UserService;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserService userService;
    
    @GetMapping("/venues")
    public List<Venue> getAllVenues(@RequestHeader("Authorization") String token) {
        User owner = userService.getUserByToken(token);
        Long owner_id = owner.getId();
        return venueRepository.findByOwnerId(owner_id);
    }

}
