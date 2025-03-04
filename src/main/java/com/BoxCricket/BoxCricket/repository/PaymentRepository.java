package com.BoxCricket.BoxCricket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BoxCricket.BoxCricket.entity.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
