package com.example.MiniProject.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

  
import com.example.MiniProject.Service.AccountService;
import com.example.MiniProject.entity.Account;

import jakarta.validation.Valid;

//@RestController
//@RequestMapping("/accounts")
//public class AccountController {
//
//    @Autowired
//    private AccountService accountService;
//
//    @PostMapping
//    public Account createAccount(@Valid @RequestBody Account account) {
//        return accountService.createAccount(account);
//    }
//
//    @GetMapping("/{accountNumber}")
//    public Account getAccountByAccNo(@PathVariable Long accountNumber) {
//        return accountService.findByAccountNo(accountNumber);
//    }
//
//    @GetMapping("/{accountNumber}/balance")
//    public Double getBalance(@PathVariable Long accountNumber) {
//        return accountService.getBalance(accountNumber);
//    }
//
//    @PutMapping("/{accountNumber}/pin/{pin}")
//    public Account updatePin(
//            @PathVariable Long accountNumber,
//            @PathVariable Integer pin) {
//        return accountService.updatePin(accountNumber, pin);
//    }
//}
@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping
    public Account createAccount(@Valid @RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping("/{accountNumber}")
    public Account getAccountByAccNo(@PathVariable String accountNumber) {
        return accountService.findByAccountNo(accountNumber);
    }

    @GetMapping("/{accountNumber}/pin/{pin}")
    public Double getBalance(@PathVariable String accountNumber,@PathVariable Integer pin) {
        Account account =accountService.findByAccountNo(accountNumber);
        if(!account.getPin().equals(pin))
        	throw new RuntimeException("Pin is not corrrect");
    	return accountService.getBalance(accountNumber);
    }

    @PutMapping("/{accountNumber}/pin/{pin}")
    public Account updatePin(
            @PathVariable String accountNumber,
            @PathVariable Integer pin) {
        return accountService.updatePin(accountNumber, pin);
    }
}
