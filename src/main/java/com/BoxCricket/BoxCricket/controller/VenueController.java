package com.BoxCricket.BoxCricket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.response.ApiResponse;
import com.BoxCricket.BoxCricket.service.VenueService;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("/api/venue")
@Slf4j
public class VenueController {

    @Autowired
    private VenueService venueService;

    // Owner: Add a new venue
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<?>> addVenue( @RequestHeader("Authorization") String token,@RequestBody VenueDto venueDto) {       
        return venueService.addVenue(token,venueDto);  
    }

    // Owner: Edit venue details
    @PutMapping("/edit/{venueId}")
    public Venue editVenue(@PathVariable Long venueId, @RequestBody Venue updatedVenue,@RequestHeader("Authorization") String token) {
        return venueService.editVenue(venueId, updatedVenue,token);
    }
    
}
