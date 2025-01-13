package com.BoxCricket.BoxCricket.controller;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.BoxCricket.BoxCricket.dto.Slot;

@RestController
@RequestMapping("/api/slots")
public class SlotWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    public SlotWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void broadcastSlotsUpdate(String venueId, String date, List<Slot> slots) {
        messagingTemplate.convertAndSend("/topic/slots/" + venueId + "/" + date, slots);
    }
}
