package com.BoxCricket.BoxCricket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BoxCricket.BoxCricket.entity.Booking;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    
    // List<Booking> findByUserId(Long userId);


    List<Booking> findByVenueId(Long venueId);
    List<Booking> findByUserId(Long userId);


    // @Query("SELECT b FROM Booking b WHERE b.venue.id = :venueId AND b.bookingDate = :bookingDate AND b.timeSlot = :timeSlot")
    // Optional<Booking> findByVenueAndDateAndTime(Long venueId, String bookingDate, String timeSlot);

     
    // @Query("SELECT b FROM Booking b WHERE b.venue.id = :venueId AND b.bookingDate = :bookingDate")
    // Optional<Booking> findByVenueIdAndBookingDate(Long venueId, String bookingDate);
}

