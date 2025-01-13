package com.BoxCricket.BoxCricket.dto;

import lombok.Data;

@Data
public class Slot {
    private String timeSlot;
    private String status; // AVAILABLE, BOOKED, TEMPORARILY_BLOCKED
    private Long blockedBy; // User ID of the person who blocked the slot (if applicable)
}

