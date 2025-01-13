package com.BoxCricket.BoxCricket.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {

    private Long id;
    private String bookingDate;
    private String timeSlot;
    private String venueName;
    private String userName;
    private BookingStatus status;

}
