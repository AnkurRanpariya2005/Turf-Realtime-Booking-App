package com.BoxCricket.BoxCricket.entity;

import java.util.List;

import com.BoxCricket.BoxCricket.dto.Role;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Venue> venues;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

   
    
}
