package com.BoxCricket.BoxCricket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import com.BoxCricket.BoxCricket.dto.Role;
import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.repository.VenueRepository;
import com.BoxCricket.BoxCricket.response.ApiResponse;

@Service
public class VenueService {
    
    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserService userService;

    // Owner: Add a new venue
    public ResponseEntity<ApiResponse<?>> addVenue(String token,@RequestBody VenueDto venueDto) {       
        User owner = userService.getUserByToken(token);
        if (!owner.getRole().equals(Role.OWNER)) {
            throw new RuntimeException("Access denied. Only owners can add venues.");
        }

            Venue venue = new Venue();
            venue.setName(venueDto.getName());
            venue.setLocation(venueDto.getLocation());
            venue.setDimension(venueDto.getDimension());
            venue.setPricePerHour(venueDto.getPricePerHour());
            venue.setImageUrl(venueDto.getImageUrl());
            venue.setOwner(owner);
            venueRepository.save(venue);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ApiResponse<>(true, "Turf Added Succesfully", null)
                );
    }

    // Owner: Edit venue details
    public Venue editVenue(Long venueId, Venue updatedVenue,String token) {
        User owner = userService.getUserByToken(token);

        Venue venue = venueRepository.findById(venueId)
                .orElseThrow(() -> new RuntimeException("Venue not found"));

        if (!venue.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException("Access denied. You can only edit your own venues.");
        }

        if(updatedVenue.getName()!=null){
        venue.setName(updatedVenue.getName());
        }
        if(updatedVenue.getLocation()!=null){
            venue.setLocation(updatedVenue.getLocation());
        }
        if(updatedVenue.getDimension()!=null){
            venue.setDimension(updatedVenue.getDimension());
        }
        if(updatedVenue.getPricePerHour()!=null){
            venue.setPricePerHour(updatedVenue.getPricePerHour());
        }
        
        return venueRepository.save(venue);
    }

}
