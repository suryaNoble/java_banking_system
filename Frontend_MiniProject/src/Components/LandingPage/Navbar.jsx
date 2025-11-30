// import React from "react";
// import { NavLink } from "react-router-dom";
// import banklogo from "../../assets/images/cblogo.png";
// import { FaUserCircle } from "react-icons/fa";
// import { useAuth } from "../Context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const { isLoggedIn, logout } = useAuth();
//     const navigate  = useNavigate();

//   return (
//     <nav className="navbar  flex flex-row justify-between mx-auto items-center h-[15vh] bg-gray-300 mx-auto px-[7rem]">
//       <div>
//         <img src={banklogo} className="logo w-[6rem]" alt="yolobank" />
//       </div>
//       <div>
//         <a
//           className="abc hover:bg-slate-300/[0.1] py-[0.2rem] px-[1.0rem] rounded-lg duration-[0.5s]  transition-all font-semibold"
//           href="https://github.com/suryaNoble/java_mini_project.git"
//           target="_blank"
//         >
//           Github
//         </a>
//         <NavLink to={"/contactUs"}>
//           <a
//             href="#"
//             className="abc hover:bg-slate-300/[0.1] py-[0.2rem] px-[1.0rem] rounded-lg duration-[0.5s]  transition-all font-semibold"
//           >
//             Contact Us
//           </a>
//         </NavLink>

//         <NavLink to={"/about"}>
//           <a
//             href="#"
//             className="abc hover:bg-slate-300/[0.1] py-[0.2rem] px-[1.0rem] rounded-lg duration-[0.5s]  transition-all font-semibold"
//           >
//             About
//           </a>
//         </NavLink>

//         {isLoggedIn ? (
//         <div className="flex items-center gap-2">
//           <FaUserCircle className="text-3xl cursor-pointer" />
//           <button onClick={logout} className="bg-white text-blue-600 px-2 py-1 rounded">
//             Logout
//           </button>
//         </div>
//       ) : 
//       (
//          <button onClick={() => {
              
//               navigate("/login");
//             }}
//              className="bg-white text-blue-600 px-3 py-1 rounded">Sign In</button>
//       )
//       }
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import banklogo from "../../assets/images/cblogo.png";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";


const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar flex flex-row justify-between items-center h-[15vh] bg-gray-300 mx-auto px-[7rem]">
     <Link to="/">
  <img src={banklogo} className="logo w-[6rem] cursor-pointer" alt="Vedabank" />
</Link>
      <div className="flex items-center gap-4">

      <NavLink to="/">

        <div>
            <IoHomeOutline className="text-xl" />
          </div>
      </NavLink>

        <NavLink to="/contactUs">
          <div className="abc hover:bg-slate-300/[0.1] py-[0.2rem] px-[1.0rem] rounded-lg duration-500 font-semibold">
            Contact Us
          </div>
        </NavLink>

        <NavLink to="/about">
          <div className="abc hover:bg-slate-300/[0.1] py-[0.2rem] px-[1.0rem] rounded-lg duration-500 font-semibold">
            About
          </div>
        </NavLink>

        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 profile-hover-btn hover:bg-gray-200"
                >
                  Show Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/transactions");
                    setOpen(false);
                  }}
                  className="w-full profile-hover-btn text-left px-4 py-2 hover:bg-gray-200"
                >
                  Transactions
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/reset-pin");
                    setOpen(false);
                  }}
                  className="w-full  reset-pin-btn text-left px-4 py-2  hover:bg-gray-200"
                >
                  Reset PIN
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="w-full logout-btn text-left px-4 py-2  hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white profile-hover-btn text-blue-600 px-3 py-1 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
