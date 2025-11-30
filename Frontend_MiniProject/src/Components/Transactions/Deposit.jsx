import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Navbar from "../LandingPage/Navbar";


const Deposit = () => {
  const navigateTo = useNavigate();
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
    const [showPin, setShowPin] = useState(false);

  const { login } = useAuth();

  const TOKEN_EXPIRY_DURATION = 15 * 60 * 1000;

  // const submitDeposit = (e) => {
  //   e.preventDefault();

  //   if (!amount || !pin) {
  //     toast.error("Enter amount and pin");
  //     return;
  //   }
  //   console.log("Deposited amount:", amount);
    
  //   navigateTo("/");

  // };

    //  const accountNumber = 323456789;
    const accountNumber = sessionStorage.getItem("accountNo");



  const submitDeposit = async (e) => {
    e.preventDefault();
  
    if (!amount || !pin) {
      toast.error("Enter amount and pin");
      return;
    }
  
    try {
      // const accountNo = localStorage.getItem("accountNo"); 
  
      const response = await fetch("http://localhost:8080/transaction/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber,
          amount: parseFloat(amount),
          pin
        })
      });
  
      if (!response.ok) {
        const err = await response.text();
        toast.error("Enter correct PIN");
        return;
      }
  
      const data = await response.json();
  
      toast.success("Deposit Successful!");
  
      navigateTo("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  


  return (
    <div>

      <Navbar/>

    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center font-bold text-2xl">Deposit Money</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitDeposit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Enter Amount
              </label>
              <div className="mt-1">
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
              </div>
            </div>

            <div>
  <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
    PIN
  </label>

  <div className="mt-1 relative">
    <input
      id="pin"
      type={showPin ? "text" : "password"}
      value={pin}
      onChange={(e) => setPin(e.target.value)}
      required
      className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 
      rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
      focus:border-indigo-500 sm:text-sm"
      />

    <span
      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
      onClick={() => setShowPin(!showPin)}
      >
      {showPin ? <FaEye className="text-gray-500" /> : <FaRegEyeSlash className="text-gray-500" />}
    </span>
  </div>
</div>


            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                >
                Don't have Money? Go to Home
              </NavLink>

            
            </div>

            <button
              type="submit"
              className="w-full profile-hover-btn flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
              Deposit
            </button>
          </form>
        </div>
      </div>
    </div>
              </div>
  );
};

export default Deposit;