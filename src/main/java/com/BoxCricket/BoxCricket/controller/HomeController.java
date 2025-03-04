package com.BoxCricket.BoxCricket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.repository.VenueRepository;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    @Autowired
    private VenueRepository venueRepository;
 
    @GetMapping("/get/{location}")
    public List<VenueDto> getVenuesByLocation(@PathVariable String location) {
        return venueRepository.findByLocation(location);
    }

    @GetMapping("/get/top-venues")
    public List<VenueDto> getTopVenue() {
        return venueRepository.findTopVenues();
    }

}
