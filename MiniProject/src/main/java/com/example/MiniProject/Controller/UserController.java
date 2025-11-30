package com.example.MiniProject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MiniProject.Service.UserService;
import com.example.MiniProject.entity.User;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired 
	private UserService userService;
    
    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
    	return userService.addUser(user);
    }
    @GetMapping("/{id}")
    public User getUserbyId(@PathVariable Long id ) {
    	return userService.getUserById(id);
    }
    @PutMapping("/{id}")
    public User updateUser(@Valid @RequestBody User user,@PathVariable Long id ) {
    	return userService.updateUser(id, user);
    }
     
}
