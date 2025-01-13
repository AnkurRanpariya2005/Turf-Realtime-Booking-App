package com.BoxCricket.BoxCricket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.BoxCricket.BoxCricket.entity.User;
import com.BoxCricket.BoxCricket.service.UserService;

public class AdminController {
 
    @Autowired
    private UserService userService;

    @GetMapping("/get/{id}")
    public User getUserById(@PathVariable("id") Long id) throws Exception {
        return userService.findById(id);

    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id) throws Exception {
        userService.deleteUser(id);
    }


}
