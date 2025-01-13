package com.BoxCricket.BoxCricket.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.dto.BookingStatus;
import com.BoxCricket.BoxCricket.dto.SlotRequest;
import com.BoxCricket.BoxCricket.service.BookingService;
import com.BoxCricket.BoxCricket.service.UserService;

import lombok.extern.slf4j.Slf4j;

import com.BoxCricket.BoxCricket.repository.VenueRepository;


@RestController
@RequestMapping("/api/booking")
@Slf4j
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/slots/{venueId}/{date}")
    public Map<String, String> getSlots(@PathVariable Long venueId, @PathVariable String date) {
        return bookingService.getSlotsForDate(venueId, date);
    }

    @PostMapping("/block")
    public ResponseEntity<String> blockSlot(@RequestBody SlotRequest slotRequest) {
        log.info("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", slotRequest);
        boolean blocked = bookingService.blockSlot(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot());
        return blocked ? ResponseEntity.ok("Slot blocked successfully")
                    : ResponseEntity.status(HttpStatus.CONFLICT).body("Slot already taken");
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmBooking(@RequestBody SlotRequest slotRequest) {
        bookingService.confirmSlot(slotRequest.getVenueId(), slotRequest.getDate(), slotRequest.getSlot(), slotRequest.getUserId());
        return ResponseEntity.ok("Booking confirmed");
    }

}
