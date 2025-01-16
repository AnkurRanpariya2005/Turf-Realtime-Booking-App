package com.BoxCricket.BoxCricket.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotRequest {
    private Long venueId;
    private String date; // Format: YYYY-MM-DD
    private String slot; // Format: HH:MM-HH:MM
    private Long userId; // User ID (optional for certain cases)
    private List<String> slots;
}
