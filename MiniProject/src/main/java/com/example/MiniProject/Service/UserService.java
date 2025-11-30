package com.example.MiniProject.Service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.MiniProject.Repository.UserRepository;
import com.example.MiniProject.entity.User;


@Service
public class UserService {

    @Autowired
    private UserRepository usersRepository;

    // ------------------------------------------
    // 1. ADD NEW USER
    // ------------------------------------------
    public User addUser(User user) {
        return usersRepository.save(user);
    }

    // ------------------------------------------
    // 2. GET USER BY ID
    // ------------------------------------------
    public User getUserById(Long userId) {
        return usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    // ------------------------------------------
    // 3. UPDATE USER DETAILS
    // ------------------------------------------
    public User updateUser(Long userId, User updatedUser) {
        User existingUser = getUserById(userId);

        // update allowed fields
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setAccountType(updatedUser.getAccountType());

        return usersRepository.save(existingUser);
    }

    // ------------------------------------------
    // 4. DELETE USER BY ID
    // ------------------------------------------
    public String deleteUser(Long userId) {
        User user = getUserById(userId);
        usersRepository.delete(user);
        return "User deleted successfully!";
    }
}
