package com.BoxCricket.BoxCricket.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BoxCricket.BoxCricket.entity.Payment;
import com.BoxCricket.BoxCricket.repository.PaymentRepository;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public void updatePaymentStatus(Long paymentId, String status, String transactionId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment Not Found"));
        payment.setPaymentStatus(status);
        payment.setPaymentGatewayResponseId(transactionId);
        paymentRepository.save(payment);
    }
}
