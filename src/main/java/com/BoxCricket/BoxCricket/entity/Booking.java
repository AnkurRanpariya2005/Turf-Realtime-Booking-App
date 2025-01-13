package com.BoxCricket.BoxCricket.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.BoxCricket.BoxCricket.dto.BookingStatus;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"venue_id", "bookingDate", "timeSlot"})
    }
)
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @Column(nullable = false)
    private String bookingDate;

    @Column(nullable = false)
    private String timeSlot;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @CreationTimestamp
    private LocalDateTime blockedAt;


}