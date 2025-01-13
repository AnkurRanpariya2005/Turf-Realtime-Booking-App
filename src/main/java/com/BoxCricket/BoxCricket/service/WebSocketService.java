package com.BoxCricket.BoxCricket.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendSlotUpdate(Long venueId, String date, String slot, String status) {
        Map<String, String> update = Map.of("venueId", venueId.toString(), "date", date, "slot", slot, "status", status);
        messagingTemplate.convertAndSend("/topic/slots", update);
    }
}

