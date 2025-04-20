package com.BoxCricket.BoxCricket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.service.OwnerService;

@RestController
@RequestMapping("/api/owner")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping("/venues")
    public List<Venue> getAllVenues(@RequestHeader("Authorization") String token) {
        return ownerService.getAllVenues(token);
    }

}
