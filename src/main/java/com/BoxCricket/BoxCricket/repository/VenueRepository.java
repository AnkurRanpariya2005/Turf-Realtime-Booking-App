package com.BoxCricket.BoxCricket.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByOwnerId(Long ownerId);

    @Query("SELECT new com.BoxCricket.BoxCricket.dto.VenueDto(v.id, v.name, v.location, v.dimension, v.pricePerHour, v.imageUrl) FROM Venue v")
    List<VenueDto> findAllVenues();

    Optional<Venue> findById(Long venueId);


    
}

