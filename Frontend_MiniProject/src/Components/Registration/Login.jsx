// import React, {useState} from 'react'
// import { NavLink, useNavigate } from 'react-router-dom'
// import axios from "axios"
// import { toast } from 'react-hot-toast'
// import  {useBankingSystem} from "../Context/UserContext"

// const Login = () => {

//   const navigateTo = useNavigate();
//       const [email,setEmail] = useState("");
//       const [password, setPassword] =useState("");

//       // extracting and using context API hereusing destructuring
//       const {BASE_URL, userDetails, gettingAUser} = useBankingSystem();
  
//       const TOKEN_EXPIRY_DURATION = 15*60*1000;
     
//         const submitLogin = async (e) =>{
            
//           try {
//             e.preventDefault();
//             const data = {
//               email,
//               password
//             };


            
//              const resp = await axios.post(`${BASE_URL}/api/v1/login`, data);

//             console.log(resp);

//             if (resp.data.user.emailVerified === false) {
//               toast.error("Email is not verified!");
//               navigateTo("/signup/otp");
//               return;
//             }


           

//             // save token in session storage
//            sessionStorage.setItem("jwtToken", resp.data.jwtToken);
//            sessionStorage.setItem("userId", resp.data.user.userId);

//              gettingAUser();

//             setTimeout(() => {
//                 sessionStorage.clear();
//             // Redirect the user to the login page
//               navigateTo("/login");
//               toast.error("session timed out ,please re login");
//               console.log("session timed out");
//               }, TOKEN_EXPIRY_DURATION);

//            if (resp.status === 200) {
//             if (resp.data.user.role === "ADMIN") {
//               navigateTo("/admin/dashboard");
//             }else{
//               navigateTo("/dashboard");
//             }
           
            
//             toast.success("Login Successfull!");
            
//            } 
           
           
//            if(resp.status !== 200 || resp.status === 401){
//             toast.error("Invalid Crenditals!")
//            }

//           } catch (error) {
//             console.log(error);
//             toast.error("Invalid Credentials!")
//           }
             
            
//         }


//   return (
//     <>
//     <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="text-center font-bold text-2xl">Log in</div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form onSubmit={submitLogin} className="space-y-6" action="#" method="POST">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email address
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   value={email}
//                   onChange={(e)=>{setEmail(e.target.value)}}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="mt-1">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   value={password}
//                     onChange={(e)=>{setPassword(e.target.value)}}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  
//                 />
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="text-sm">
//                 <NavLink to={"/signup"} className="font-medium text-indigo-600 hover:text-indigo-500">
//                 Don't have Account, Sign Up
//                 </NavLink >
//               </div>
//               <div className="text-sm">
//                 <p onClick={()=>{navigateTo("/forgot-password")}} className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
//                 Forgot Password?
//                 </p >
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                 Log in
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </>
//   )
// }

// export default Login





import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import axios from "axios";


const Login = () => {
  const navigateTo = useNavigate();
  const [accountNo, setAccountNo] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const TOKEN_EXPIRY_DURATION = 15 * 60 * 1000;



const [pin, setPin] = useState(0);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/accounts/${accountNo}`);

        // const data = res.data;

        setPin(res.data.pin);
        console.log("anna ikkada dekho pin kosam");
        console.log(res.data.pin);
        console.log(pin);

      } catch (err) {
        // toast.error("Failed to fetch profile");
        console.error(err);
      }
    };

    fetchAccountDetails();
  }, [accountNo]);


  const submitLogin = (e) => {
    e.preventDefault();

    if (!accountNo || !password) {
      toast.error("Enter email & password");
      return;
    }

     if (parseInt(password) !== pin) {
          toast.error("PIN is incorrect!");
          return;
        }

    const dummyToken = "sample_token_" + Date.now();
    sessionStorage.setItem("jwtToken", dummyToken);
sessionStorage.setItem("accountNo", accountNo);

console.log("All keys:", sessionStorage);
console.log("accountNo:", sessionStorage.getItem("accountNo"));

    login();

    setTimeout(() => {
      sessionStorage.clear();
      navigateTo("/login");
      toast.error("Session timed out, please login again");
    }, TOKEN_EXPIRY_DURATION);

    navigateTo("/");
    toast.success("Login Successful!");
  };

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="text-center font-bold text-2xl">Log in</div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={submitLogin} className="space-y-6">
            <div>
              <label htmlFor="accountNo" className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <div className="mt-1">
                <input
                  id="accountNo"
                  type="number"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  minLength={4}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <NavLink
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
              >
                Don't have Account? Sign Up
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
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

