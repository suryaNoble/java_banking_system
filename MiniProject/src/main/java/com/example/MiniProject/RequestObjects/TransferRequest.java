package com.example.MiniProject.RequestObjects;

public class TransferRequest {
	private String toAccountNumber ;
	private String fromAccountNumber ;
	  private Double amount;
	  private Integer pin;
	  public Integer getPin() {
		return pin;
	  }
	  public void setPin(Integer pin) {
		  this.pin = pin;
	  }
	  public String getToAccountNumber() {
		  return toAccountNumber;
	  }
	  public void setToAccountNumber(String toAccountNumber) {
		  this.toAccountNumber = toAccountNumber;
	  }
	  public String getFromAccountNumber() {
		  return fromAccountNumber;
	  }
	  public void setFromAccountNumber(String fromAccountNumber) {
		  this.fromAccountNumber = fromAccountNumber;
	  }
	  public Double getAmount() {
		  return amount;
	  }
	  public void setAmount(Double amount) {
		  this.amount = amount;
	  }
	  
	  
}
