package com.example.MiniProject.Repository;

import com.example.MiniProject.entity.Transaction;
import com.example.MiniProject.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByFromAccount(Account account);

    List<Transaction> findByToAccount(Account account);

}