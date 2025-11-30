package com.example.MiniProject.Service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.MiniProject.Repository.AccountRepository;
import com.example.MiniProject.Repository.TransactionRepository;
import com.example.MiniProject.RequestObjects.DepositRequest;
import com.example.MiniProject.RequestObjects.TransferRequest;
import com.example.MiniProject.RequestObjects.WithdrawRequest;
import com.example.MiniProject.entity.Account;
import com.example.MiniProject.entity.Transaction;
import com.example.MiniProject.exception.AccountNotFoundException;
import com.example.MiniProject.exception.InsufficientBalanceException;
import com.example.MiniProject.exception.InvalidPinException;

@Service
public class TransactionService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(AccountRepository accountRepository,
                              TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    private Account getVerifiedAccount(String accountNo, Integer pin) {
        Account acc = accountRepository.findById(accountNo)
                .orElseThrow(() -> new AccountNotFoundException("Account not found: " + accountNo));

        if (!acc.getPin().equals(pin)) {
            throw new InvalidPinException("Invalid PIN!");
        }
        return acc;
    }

    @Transactional
    public Transaction deposit(DepositRequest req) {
        Account acc = getVerifiedAccount(req.getAccountNumber(), req.getPin());

        acc.setBalance(acc.getBalance() + req.getAmount());
        accountRepository.save(acc);

        Transaction t = new Transaction();
        t.setTransactionType("DEPOSIT");
        t.setAmount(req.getAmount());
        t.setToAccount(acc);

        return transactionRepository.save(t);
    }

    @Transactional
    public Transaction withdraw(WithdrawRequest req) {
        Account acc = getVerifiedAccount(req.getAccountNumber(), req.getPin());

        if (acc.getBalance() < req.getAmount()) {
            throw new InsufficientBalanceException("Not enough balance!");
        }

        acc.setBalance(acc.getBalance() - req.getAmount());
        accountRepository.save(acc);

        Transaction t = new Transaction();
        t.setTransactionType("WITHDRAW");
        t.setAmount(req.getAmount());
        t.setFromAccount(acc);

        return transactionRepository.save(t);
    }

    @Transactional
    public Transaction transfer(TransferRequest req) {

        Account fromAcc = getVerifiedAccount(req.getFromAccountNumber(), req.getPin());

        Account toAcc = accountRepository.findById(req.getToAccountNumber())
                .orElseThrow(() -> new AccountNotFoundException("Receiver account not found"));

        if (fromAcc.getBalance() < req.getAmount()) {
            throw new InsufficientBalanceException("Insufficient balance for transfer!");
        }

        fromAcc.setBalance(fromAcc.getBalance() - req.getAmount());
        toAcc.setBalance(toAcc.getBalance() + req.getAmount());

        accountRepository.save(fromAcc);
        accountRepository.save(toAcc);

        Transaction t = new Transaction();
        t.setTransactionType("TRANSFER");
        t.setAmount(req.getAmount());
        t.setFromAccount(fromAcc);
        t.setToAccount(toAcc);

        return transactionRepository.save(t);
    }
    
    public List<Transaction> getTransactionsByAccountNo(String accountNo) {

        Account account = accountRepository.findById(accountNo)
                .orElseThrow(() -> new RuntimeException("Account not found: " + accountNo));

        List<Transaction> sent = transactionRepository.findByFromAccount(account);
        List<Transaction> received = transactionRepository.findByToAccount(account);

        List<Transaction> all = new ArrayList<>();
        all.addAll(sent);
        all.addAll(received);

        // Sort by latest first
        all.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));

        return all;
    }

}
