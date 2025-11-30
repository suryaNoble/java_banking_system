package com.example.MiniProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.MiniProject.entity.Account;

public interface AccountRepository extends JpaRepository<Account, String> {
	Account findByAccountNo(String accountNo);
	@Query("SELECT a.user.id FROM Account a WHERE a.accountNo = :accountNo")
	Long findUserIdByAccountNo(@Param("accountNo") String accountNo);

}
