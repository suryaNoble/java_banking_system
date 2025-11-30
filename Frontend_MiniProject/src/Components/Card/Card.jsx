import React, { useState } from "react";
import { FaWifi } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { getUserById } from "../../api/userApi";
import { useEffect } from "react";
import { getAccount,checkBalance } from "../../api/accountApi";
import toast from "react-hot-toast";


const Card = () => {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("normal"); 
  // normal → enterPin → showBalance

  const [pin, setPin] = useState("");

  const  handleOK = async () => {
    if (screen === "enterPin") {
      
      try {
        if(pin.length==0){
          alert("pin enter cheyyandi Sir!");
          setPin("");
          return
        }
    const data = await checkBalance(accountNumber, pin);
    console.log("checking pin entered by user for balancec check");
    console.log(pin);
    console.log("Balance:", data);

    setBalance(data);       // store balance returned from backend
    setScreen("showBalance");
    
  } catch (err) {
    toast.error("Invalid PIN");
    setPin("");
    console.log(err);
  }
    } else {
      setScreen("normal");
      setPin("");
      setBalance(null);
    }
  };
      const [showPin, setShowPin] = useState(false);



  const [account, setAccount] = useState();
  // const accountNumber = 323456789; // you will replace with logged-in user ID

const token = sessionStorage.getItem("jwtToken");
const accountNumber = sessionStorage.getItem("accountNo");

console.log(accountNumber);
console.log("here we have everything")


  
  useEffect(() => {
  getAccount(accountNumber).then(data => {
    console.log("API Response:", data);
    setAccount(data);
  });
}, [])


const [balance, setBalance] = useState(null);


  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-6">

      {/* CARD */}
      <div className="w-[350px] h-[200px] rounded-xl p-6 text-white 
          bg-gradient-to-br from-gray-400 to-blue-400 relative shadow-xl flex justify-center items-center">

        {/* ================= NORMAL CARD VIEW ================= */}
        {screen === "normal" && (
          <>
            <div className="absolute top-6 left-6 flex justify-between items-center w-[85%]">
              <h2 className="font-semibold text-lg">KDBC Bank</h2>
              <FaWifi className="text-xl rotate-90" />
            </div>

            <div className="absolute bottom-6 left-6">
              <p className="text-xs tracking-wide font-semibold">{account?.user?.name}</p>
              <p className="text-xs mt-1">06/28</p>
              <p className="text-lg tracking-widest mt-2">{account?.accountNo}</p>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-1 items-center">
              <div className="w-6 h-6 rounded-full bg-red-600 opacity-90"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-3"></div>
            </div>
          </>
        )}

        {/* ================= ASK FOR PIN ================= */}
        {screen === "enterPin" && (
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="text-lg font-medium">Enter PIN</h2>
            <div className="relative w-full">

  <input
    type={showPin ? "text" : "password"}
    value={pin}
    
    onChange={(e) => setPin(e.target.value)}
    className="bg-white px-3 py-1 pr-10 rounded-md text-black text-center w-full"
  />

  <span
    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
    onClick={() => setShowPin(!showPin)}
  >
    {showPin ? (
      <FaEye className="text-gray-500" />
    ) : (
      <FaRegEyeSlash className="text-gray-500" />
    )}
  </span>

</div>

            <button
              className="bg-white ok-btn text-black px-5 py-1 rounded-lg font-semibold"
              onClick={handleOK}
            >
              OK
            </button>
          </div>
        )}

        {/* ================= SHOW BALANCE ================= */}
        {screen === "showBalance" && (
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="text-xl font-semibold">Your Balance</h2>
            <p className="text-3xl font-bold">
  ₹ {balance !== null ? balance.toLocaleString() : "Error,try Again"}
</p>


            <button
              className="bg-white ok-btn text-black px-5 py-1 rounded-lg font-semibold"
              onClick={handleOK}
            >
              OK
            </button>
          </div>
        )}
      </div>

      {/* BUTTONS SECTION */}
      <div className="grid grid-cols-2 gap-4 w-[350px]">

        <button 
         onClick={()=> navigate("/withdraw")}
         className="bg-gradient-to-br from-gray-400 to-blue-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Withdraw
        </button>

        <button
          onClick={()=> navigate("/deposit")}
          className="bg-gradient-to-br from-gray-400 to-blue-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Deposit
        </button>

        <button 
          onClick={()=> navigate("/transfer")}
          className="bg-gradient-to-br from-gray-400 to-blue-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Transfer
        </button>

        {/* CHECK BALANCE triggers content switching */}
        <button 
         onClick={()=> {if(screen != "enterPin"){setScreen("enterPin")} else{setScreen("normal")}}}
         className="bg-gradient-to-br from-gray-400 to-blue-400 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Check Balance
        </button>

      </div>

    </div>
  );
};

export default Card;

