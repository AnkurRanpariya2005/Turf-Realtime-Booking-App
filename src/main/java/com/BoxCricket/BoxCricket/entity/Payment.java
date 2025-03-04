package com.BoxCricket.BoxCricket.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId; // User who made the booking
    private Long boxCricketId; // Turf ID
    private Double amount; // Dynamic amount based on turf pricing
    private String paymentStatus; // "PENDING", "SUCCESS", "FAILED"
    private String paymentGatewayResponseId; // Transaction ID from payment gateway

    private LocalDateTime paymentTime;

   
}
