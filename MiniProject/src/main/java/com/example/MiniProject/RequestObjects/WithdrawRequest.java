package com.example.MiniProject.RequestObjects;

public class WithdrawRequest {
	private String accountNumber ;
	  private Double amount;
	  private Integer pin;
	  public Integer getPin() {
		return pin;
	  }
	  public void setPin(Integer pin) {
		  this.pin = pin;
	  }
	  public String getAccountNumber() {
		return accountNumber;
	  }
	  public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	  }
	  public Double getAmount() {
		return amount;
	  }
	  public void setAmount(Double amount) {
		this.amount = amount;
	  }
	  
}
