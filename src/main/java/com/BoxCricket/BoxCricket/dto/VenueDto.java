package com.BoxCricket.BoxCricket.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VenueDto {
    
    private Long id;
    private String name;
    private String location;
    private String dimension;
    private BigDecimal pricePerHour;
    private String ImageUrl;
    private Integer rating;

}
