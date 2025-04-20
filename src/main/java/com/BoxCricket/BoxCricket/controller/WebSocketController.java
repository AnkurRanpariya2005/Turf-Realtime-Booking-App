package com.BoxCricket.BoxCricket.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.BoxCricket.BoxCricket.dto.SlotStatus;

@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Notify clients when a slot is updated
    public void notifySlotUpdate(String venueId, String date, String slot,String currentUserId, String status) {
        String destination = "/topic/slots/" + venueId + "/" + date;
        messagingTemplate.convertAndSend(destination, new SlotStatus(slot, status, currentUserId));
    }

    public void broadcastSlotsUpdate(Long venueId, String date, Map<String, SlotStatus> slots) {
        String topic = String.format("/topic/slots/%d/%s", venueId, date);
        messagingTemplate.convertAndSend(topic, slots);
    }
}


