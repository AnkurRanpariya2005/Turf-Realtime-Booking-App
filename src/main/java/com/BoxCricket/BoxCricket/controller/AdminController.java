package com.BoxCricket.BoxCricket.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.entity.Venue;
import com.BoxCricket.BoxCricket.response.ApiResponse;
import com.BoxCricket.BoxCricket.service.UserService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/admin")
public class AdminController {
 
    @Autowired
    private UserService userService;

    @GetMapping("/get/all/owners")
    public ResponseEntity<?> getAllOwners() {
        List<User> owners = userService.getAllOwners();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched All Owners", owners)
            );
    }

    @GetMapping("/get/all/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched All Users", users)
            );
    }

    @GetMapping("/get/all/venues")
    public ResponseEntity<?> getAllVenues() {
        List<Venue> venues = userService.getAllVenues();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched All Venues", venues)
            );
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) throws Exception {
        User user = userService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "Fetched User", user)
            );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) throws Exception {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "User Deleted", null)
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) throws Exception {
        User updatedUser = userService.updateUser(user, id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ApiResponse<>(true, "User Updated", updatedUser)
        );
    }

    // @PostMapping("/add/plans")
    // public ResponseEntity<?> addPlans(@RequestBody User user) throws Exception {
    //     userService.addPlans(user);
    //     return ResponseEntity.status(HttpStatus.OK).body(
    //             new ApiResponse<>(true, "Plans Added", null)
    //     );
    // }

}
