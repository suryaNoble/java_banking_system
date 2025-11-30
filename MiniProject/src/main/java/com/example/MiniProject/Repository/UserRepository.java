package com.example.MiniProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MiniProject.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
