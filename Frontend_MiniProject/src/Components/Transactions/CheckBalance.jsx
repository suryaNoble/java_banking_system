import React, { useState } from "react";
import { FaWifi } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";

const CheckBalance = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [pin, setPin] = useState("");
  const [step, setStep] = useState("enterPin"); 
  // steps: enterPin → showBalance → back

  const handleOK = () => {
    if (step === "enterPin") {
      setStep("showBalance");
    } else {
      setStep("enterPin");
      setIsFlipped(false);
      setPin("");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-6">

      {/* CARD WRAPPER FOR 3D FLIP */}
      <div className="relative w-[350px] h-[200px] perspective-1000">
        <div
          className={`relative w-full h-full duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >

          {/* FRONT SIDE */}
          <div className="absolute w-full h-full backface-hidden 
            bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl">
            
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Untitled.</h2>
              <FaWifi className="text-xl rotate-90" />
            </div>

            <div className="absolute bottom-6 left-6">
              <p className="text-xs tracking-wide font-semibold">OLIVIA RHYE</p>
              <p className="text-xs mt-1">06/28</p>
              <p className="text-lg tracking-widest mt-2">1234 1234 1234 1234</p>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-1 items-center">
              <div className="w-6 h-6 rounded-full bg-red-600 opacity-90"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-3"></div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 
            bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 text-white shadow-xl flex flex-col justify-center items-center gap-4">

            {step === "enterPin" && (
              <>
                <h2 className="text-lg font-medium">Enter PIN</h2>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-40 px-3 py-1 rounded-md text-black text-center"
                />
                <button
                  className="bg-white text-black px-5 py-1 rounded-lg font-semibold"
                  onClick={handleOK}
                >
                  OK
                </button>
              </>
            )}

            {step === "showBalance" && (
              <>
                <h2 className="text-xl font-semibold">Balance</h2>
                <p className="text-3xl font-bold">₹ 25,430.00</p>
                <button
                  className="bg-white text-black px-5 py-1 rounded-lg font-semibold"
                  onClick={handleOK}
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4 BUTTON OPTIONS BELOW CARD */}
      <div className="grid grid-cols-2 gap-4 w-[350px]">
        <button 
          onClick={() => setIsFlipped(true)}
          className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition"
        >
          Option 1
        </button>

        <button className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Option 2
        </button>

        <button className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Option 3
        </button>

        <button className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition">
          Option 4
        </button>
      </div>

    </div>
  );
};

export default CheckBalance;



//this is an experimanetal file for flipping card not used in project
