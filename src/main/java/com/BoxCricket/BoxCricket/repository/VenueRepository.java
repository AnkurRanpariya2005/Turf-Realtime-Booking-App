package com.BoxCricket.BoxCricket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BoxCricket.BoxCricket.entity.Venue;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByOwnerId(Long ownerId);
}

