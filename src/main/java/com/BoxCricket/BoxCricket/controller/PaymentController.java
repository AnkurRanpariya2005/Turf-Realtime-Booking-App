package com.BoxCricket.BoxCricket.controller;

import java.util.Map;

import com.BoxCricket.BoxCricket.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // Allow frontend access
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody Map<String, Object> data) {
        return paymentService.createCheckoutSession(data);
    }
}
