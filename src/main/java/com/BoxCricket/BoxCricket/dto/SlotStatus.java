package com.BoxCricket.BoxCricket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SlotStatus {
    private String slot;
    private String status;
    private String currentUserId;


}
