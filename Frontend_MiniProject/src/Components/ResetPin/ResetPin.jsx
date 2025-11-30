import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa"
import axios from "axios";
import { useEffect } from "react";

const ResetPin = () => {
  const navigateTo = useNavigate();
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [cnfrmpassword, setCnfrmpassword] = useState("");

  const [showoldpassword, setShowoldpassword] = useState(false);
const [shownewpassword, setShownewpassword] = useState(false);
//   const [showcnfrmpassword, setShowcnfrmpassword] = useState(false);



const { login } = useAuth();

login();

// const accountNumber = 323456789;
const accountNumber = sessionStorage.getItem("accountNo");



const [pin, setPin] = useState(0);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/accounts/${accountNumber}`);

        // const data = res.data;

        setPin(res.data.pin);
        console.log("anna ikkada dekho pin kosam");
        console.log(res.data.pin);
        console.log(pin);

      } catch (err) {
        toast.error("Failed to fetch profile");
        console.error(err);
      }
    };

    fetchAccountDetails();
  }, []);

 

 

  

  const submitResetPin = async (e) => {
    e.preventDefault();

    // 1️ Validate empty fields
    if (!oldpassword || !newpassword || !cnfrmpassword) {
      toast.error("All fields are required!");
      return;
    }

    // 2️ Check old PIN matches
    if (parseInt(oldpassword) !== pin) {
      toast.error("Old PIN is incorrect!");
      return;
    }

    // 3️ New PIN length validation
    if (newpassword.length !== 4) {
      toast.error("New PIN must be exactly 4 digits!");
      return;
    }

    // 4️ Confirm PIN validation
    if (newpassword !== cnfrmpassword) {
      toast.error("New PIN and Confirm PIN do not match!");
      return;
    }

    try {
      // 5️ PUT API CALL
      await axios.put(
        `http://localhost:8080/accounts/${accountNumber}/pin/${newpassword}`
      );

      toast.success("PIN Reset Successful!");
      navigateTo("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset PIN!");
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center font-bold text-2xl">Reset PIN</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitResetPin} className="space-y-6">
            <div>
              <label htmlFor="oldpassword" className="block text-sm font-medium text-gray-700">
               Enter Old PIN
              </label>
              <div className="mt-1 relative w-full">
                <input
                  id="oldpassword"
                  type={showoldpassword ? "text" : "password"}
                  value={oldpassword}
                  onChange={(e) => setOldpassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowoldpassword(!showoldpassword)}
                  >
                    {showoldpassword ? (
                      <FaEye className="text-gray-500" />
                    ) : (
                      <FaRegEyeSlash className="text-gray-500" />
                    )}
                  </span>
              </div>
            </div>

            <div>
              <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700">
                Enter New PIN
              </label>
              <div className="mt-1 relative w-full">
                <input
                  id="newpassword"
                  type={shownewpassword ? "text" : "password"}
                  minLength={4}
                  value={newpassword}
                  onChange={(e) => setNewpassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShownewpassword(!shownewpassword)}
                  >
                    {shownewpassword ? (
                      <FaEye className="text-gray-500" />
                    ) : (
                      <FaRegEyeSlash className="text-gray-500" />
                    )}
                  </span>
              </div>
            </div>

            <div>
              <label htmlFor="cnfrmpassword" className="block text-sm font-medium text-gray-700">
                Confirm New PIN
              </label>
              <div className="mt-1 relative w-full">
                <input
                  id="cnfrmpassword"
                  type={shownewpassword ? "text" : "password"}
                  minLength={4}
                  value={cnfrmpassword}
                  onChange={(e) => setCnfrmpassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShownewpassword(!shownewpassword)}
                  >
                    {shownewpassword ? (
                      <FaEye className="text-gray-500" />
                    ) : (
                      <FaRegEyeSlash className="text-gray-500" />
                    )}
                  </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
              >
                Don't Wanna Reset? Go Home
              </NavLink>

              {/* <p
                onClick={() => navigateTo("/forgot-password")}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer text-sm"
              >
                Forgot Password?
              </p> */}
            </div>

            <button
              type="submit"
              className="w-full flex profile-hover-btn justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Reset PIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPin;
