package com.example.MiniProject.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.example.MiniProject.Repository.AccountRepository;
import com.example.MiniProject.entity.Account;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    // 1. CREATE NEW ACCOUNT
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }
    
    // 2. GET BALANCE BY ACCOUNT NUMBER
    public double getBalance(String accountNo) {
        Account account = accountRepository.findByAccountNo(accountNo);

        if (account == null) {
            throw new RuntimeException("Account not found: " + accountNo);
        }

        return account.getBalance();
    }

    
    // 3. SET BALANCE (UPDATE BALANCE)
    
    public Account setBalance(String accountNo, double newBalance) {
        Account account = accountRepository.findByAccountNo(accountNo);

        if (account == null) {
            throw new RuntimeException("Account not found: " + accountNo);
        }

        account.setBalance(newBalance);

        return accountRepository.save(account);
    }
    //4.update pin
    public Account updatePin(String accountNo,Integer newPin)
    {
    	Account account = accountRepository.findByAccountNo(accountNo);
    	if (account == null) {
            throw new RuntimeException("Account not found: " + accountNo);
        }
    	account.setPin(newPin);

        return accountRepository.save(account);
    }
    //5. GET USERID WIH USING ACC NO
    public Long getUserId(String accountNo)
    {
    	return accountRepository.findUserIdByAccountNo(accountNo);
    }
//    6.GET ACCOUNT OBJ WITH ACC NO
    public Account findByAccountNo(String accountNo)
    {
    	return accountRepository.findByAccountNo(accountNo);
    }
}
