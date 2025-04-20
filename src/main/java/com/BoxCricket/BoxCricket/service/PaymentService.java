package com.BoxCricket.BoxCricket.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.BoxCricket.BoxCricket.entity.Payment;
import com.BoxCricket.BoxCricket.repository.PaymentRepository;
import com.stripe.exception.StripeException;

@Service
public class PaymentService {

    @Autowired
    private StripeService stripeService;
    
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

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(Map<String, Object> data) {
        try {
            String sessionUrl = stripeService.createCheckoutSession(
                (String) data.get("currency"),
                ((Integer) data.get("amount")).longValue(),
                (String) data.get("successUrl"),
                (String) data.get("cancelUrl")
            );

            return Map.of("url", sessionUrl);
        } catch (StripeException e) {
            return Map.of("error", e.getMessage());
        }
    }
}
