package com.BoxCricket.BoxCricket.controller;

import java.util.Map;

import com.BoxCricket.BoxCricket.service.StripeService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // Allow frontend access
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody Map<String, Object> data) {
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
