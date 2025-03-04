package com.BoxCricket.BoxCricket.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BoxCricket.BoxCricket.dto.VenueDto;
import com.BoxCricket.BoxCricket.entity.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByOwnerId(Long ownerId);

    @Query("SELECT new com.BoxCricket.BoxCricket.dto.VenueDto(v.id, v.name, v.location, v.dimension, v.pricePerHour, v.imageUrl, v.rating) FROM Venue v")
    List<VenueDto> findAllVenues();

    Optional<Venue> findById(Long venueId);

    @Query("select new com.BoxCricket.BoxCricket.dto.VenueDto(v.id, v.name, v.location, v.dimension, v.pricePerHour, v.imageUrl, v.rating) from Venue v where v.location = :location order by v.rating desc limit 3")
    List<VenueDto> findByLocation(String location);

    @Query("select new com.BoxCricket.BoxCricket.dto.VenueDto(v.id, v.name, v.location, v.dimension, v.pricePerHour, v.imageUrl, v.rating) from Venue v order by v.rating desc limit 3")
    List<VenueDto> findTopVenues();
    
}

