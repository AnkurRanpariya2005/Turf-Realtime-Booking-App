package com.BoxCricket.BoxCricket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.repository.VenueRepository;

@Service
public class HomeService {

    @Autowired
    private VenueRepository venueRepository;
 
    public List<VenueDto> getVenuesByLocation(@PathVariable String location) {
        return venueRepository.findByLocation(location);
    }

    public List<VenueDto> getTopVenue() {
        return venueRepository.findTopVenues();
    }
}
