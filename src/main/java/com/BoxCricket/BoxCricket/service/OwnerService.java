package com.BoxCricket.BoxCricket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestHeader;

import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.VenueRepository;

@Service
public class OwnerService {
    
    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserService userService;

    public List<Venue> getAllVenues(@RequestHeader("Authorization") String token) {
        User owner = userService.getUserByToken(token);
        Long owner_id = owner.getId();
        return venueRepository.findByOwnerId(owner_id);
    }
}
