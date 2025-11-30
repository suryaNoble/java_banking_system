import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import SyncLoader from "react-spinners/SyncLoader"
  import axios from "axios";


const AccountDetails = () => {

  const navigateTo = useNavigate();
  const [isLoading] = useState(false);

  const [accDetails, setAccDetails] = useState({
    accountType: "",
    pin: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!accDetails.accountType) {
      newErrors.accountType = "Please select account type";
    }

    if (!accDetails.pin.trim()) {
      newErrors.pin = "PIN is required";
    } else if (!/^\d{4}$/.test(accDetails.pin)) {
      newErrors.pin = "PIN must be exactly 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = (e) => {
    setAccDetails({ ...accDetails, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("User not created. Please fill User Details first.");
    return;
  }

  // Generate 10 digit account number
  const accountNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();

  try {
    const response = await axios.post("http://localhost:8080/accounts", {
      accountNo: accountNo,
      pin: Number(accDetails.pin),
      accountType: accDetails.accountType,
      balance: 0,
      user: {
        id: Number(userId)
      }
    });

    console.log("Account created:", response.data);

    navigateTo("/login");

  } catch (error) {
    console.error("Account Creation Failed:", error);
  }
};


  return (
    <>
      {isLoading ? (
        <div className='flex flex-row justify-center items-center h-[100vh]'>
          <SyncLoader size={20} color={"#5145CD"} />
        </div>
      ) : (

      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="text-center text-2xl font-bold">Account Setup</div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium">Account Type</label>
                <select
                  name="accountType"
                  value={accDetails.accountType}
                  onChange={handleDetails}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
                {errors.accountType && <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">PIN</label>
                <input
                  name="pin"
                  type="password"
                  maxLength={4}
                  value={accDetails.pin}
                  onChange={handleDetails}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin}</p>}
              </div>

              <button
                type="submit"
                className="w-full profile-hover-btn flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create Account
              </button>

            </form>

          </div>
        </div>

      </div>

      )}
    </>
  );
};

export default AccountDetails;
