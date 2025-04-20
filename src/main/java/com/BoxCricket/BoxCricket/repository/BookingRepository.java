package com.BoxCricket.BoxCricket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.BoxCricket.BoxCricket.entity.Booking;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b ORDER BY b.date DESC")
    List<Booking> getAll();

    List<Booking> findByVenueId(Long venueId);
    List<Booking> findByUserId(Long userId);

    @Query("SELECT count(b) from Booking b")
    long countBooking();

}

