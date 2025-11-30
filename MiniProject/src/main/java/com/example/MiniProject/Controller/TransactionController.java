package com.example.MiniProject.Controller;


import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.MiniProject.RequestObjects.DepositRequest;
import com.example.MiniProject.RequestObjects.TransferRequest;
import com.example.MiniProject.RequestObjects.WithdrawRequest;
import com.example.MiniProject.Service.TransactionService;
import com.example.MiniProject.entity.Transaction;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/deposit")
    public Transaction deposit(@RequestBody DepositRequest request) {
        return transactionService.deposit(request);
    }

    @PostMapping("/withdraw")
    public Transaction withdraw(@RequestBody WithdrawRequest request) {
        return transactionService.withdraw(request);
    }

    @PostMapping("/transfer")
    public Transaction transfer(@RequestBody TransferRequest request) {
        return transactionService.transfer(request);
    }
    
    @GetMapping("/account/{accountNo}")
    public List<Transaction> getAccountTransactions(@PathVariable String accountNo) {
        return transactionService.getTransactionsByAccountNo(accountNo);
    }

}
