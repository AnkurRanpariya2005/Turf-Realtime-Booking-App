package com.BoxCricket.BoxCricket.controller;

import com.BoxCricket.BoxCricket.dto.SlotRequest;
import com.BoxCricket.BoxCricket.dto.SlotStatus;
import com.BoxCricket.BoxCricket.entity.Booking;
import com.BoxCricket.BoxCricket.service.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/booking")
@Slf4j
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/slots/{venueId}/{date}")
    public ResponseEntity<Map<String, SlotStatus>> getSlots(@PathVariable Long venueId, @PathVariable String date, @RequestParam Long userId) {
        return bookingService.getSlots(venueId, date, userId);
    }

    // Block the slot for the current user
    @PostMapping("/block")
    public ResponseEntity<Void> blockSlot(@RequestBody SlotRequest slotRequest) {
        return bookingService.blockSlot(slotRequest);  
    }

    // Unblock the slot for the current user
    @PostMapping("/unblock")
    public ResponseEntity<Void> unblockSlot(@RequestBody SlotRequest slotRequest) {
       return bookingService.unblockSlot(slotRequest);
    }

    // Book multiple slots
    @PostMapping("/book")
    public ResponseEntity<String> bookSlots(@RequestBody SlotRequest slotRequest) {
        return bookingService.bookSlots(slotRequest);
    }

    @GetMapping("/my-booking")
    public List<Booking> getBookings(@RequestParam Long venueId) {
        return bookingService.getBookings(venueId);
    }

}
