// import React, { useState, useEffect } from 'react';
// import { toast } from "react-hot-toast";
// import Navbar from '../LandingPage/Navbar';
// import AvatarCard from './AvatarCard';

// const Profile = () => {

//   const [editMode, setEditMode] = useState(false);

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     accountType: ""
//   });


//        const accountNumber = 323456789;


//   useEffect(() => {
//     const fetchAccountDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/accounts/${accountNumber}`);

//         if (!response.ok) {
//           toast.error("Failed to fetch profile");
//           return;
//         }

//         const data = await response.json();
//         console.log("Fetched profile:", data);
//          console.log("Fetched profile lo user:", data.user);

//         setUser({
//           name: data.user.name,
//           email: data.user.email,
//           phoneNumber: data.user.phone,
//           accountType: data.accountType
//         });

//       } catch (error) {
//         toast.error("Server error");
//         console.error(error);
//       }
//     };

//     fetchAccountDetails();
//   }, [accountNumber]);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleEditToggle = () => {
//     setEditMode(true);
//   };

//   const handleSave = () => {
//     if (!user.name || !user.email || !user.phoneNumber) {
//       toast.error("All fields required");
//       return;
//     }

//     if (user.phoneNumber.length !== 10) {
//       toast.error("Enter valid 10 digit number");
//       return;
//     }

//     toast.success("Profile Updated");
//     setEditMode(false);
//   };

//   return (
//     <div>
//       <Navbar/>
//     <div className="p-6 mt-5 mb-4 max-w-xl mx-auto bg-white rounded-xl shadow-xl pt-8 relative">


//       <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>

// <AvatarCard name={user.name} email={user.email} />


//       <div className="flex flex-col space-y-4">

//         <label className="font-medium">
//           Name:
//           {editMode ? (
//             <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             className="w-full bg-gray-200 p-2 rounded-lg mt-1"
//             />
//           ) : (
//             <p className="bg-gray-100 p-2 rounded-lg mt-1">{user.name}</p>
//           )}
//         </label>

//         <label className="font-medium">
//           Email:
//           {editMode ? (
//             <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             className="w-full bg-gray-200 p-2 rounded-lg mt-1"
//             />
//           ) : (
//             <p className="bg-gray-100 p-2 rounded-lg mt-1">{user.email}</p>
//           )}
//         </label>

//         <label className="font-medium">
//           Phone Number:
//           {editMode ? (
//             <input
//             type="text"
//             name="phoneNumber"
//             value={user.phoneNumber}
//             onChange={handleChange}
//             className="w-full bg-gray-200 p-2 rounded-lg mt-1"
//             />
//           ) : (
//             <p className="bg-gray-100 p-2 rounded-lg mt-1">{user.phoneNumber}</p>
//           )}
//         </label>

//         <label className="font-medium">
//           Account Type:
//           <p className="bg-gray-100 p-2 rounded-lg mt-1 text-gray-600">
//             {user.accountType?.toUpperCase()}
//           </p>
//         </label>

//         {!editMode ? (
//           <button
//           className="bg-indigo-600 text-white py-2 rounded-lg mt-4"
//           onClick={handleEditToggle}
//           >
//             Update Profile
//           </button>
//         ) : (
//           <button
//           className="bg-green-600 text-white py-2 rounded-lg mt-4"
//           onClick={handleSave}
//           >
//             Save
//           </button>
//         )}

//       </div>
//         </div>

//     </div>
//   );
// };

// export default Profile;








import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from '../LandingPage/Navbar';
import AvatarCard from './AvatarCard';

const Profile = () => {

  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    accountType: ""
  });

  // const accountNumber = "323456789";    
  const accountNumber = sessionStorage.getItem("accountNo");
     

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/accounts/${accountNumber}`);

        const data = res.data;

        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          accountType: data.accountType
        });

      } catch (err) {
        toast.error("Failed to fetch profile");
        console.error(err);
      }
    };

    fetchAccountDetails();
  }, []);

  // Handle field changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  // Toggle edit mode
  const handleEditToggle = () => setEditMode(true);


  // SAVE updated user → backend PUT request
  const handleSave = async () => {
    if (!user.name || !user.email || !user.phone) {
      return toast.error("All fields are required");
    }

    if (user.phone.length !== 10) {
      return toast.error("Enter valid 10 digit number");
    }

    const updatedUser = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      accountType:user.accountType

    };

    try {
      const res = await axios.put(
        `http://localhost:8080/users/${user.id}`,
        updatedUser
      );
      console.log(res);
      console.log("check here")

      toast.success("Profile Updated Successfully");

      setUser({
        ...user,
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone
      });

      setEditMode(false);

    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="p-6 mt-5 mb-4 max-w-xl mx-auto bg-white rounded-xl shadow-xl pt-8 relative">

        <h1 className="text-2xl font-semibold mb-6 text-center">Profile</h1>

        <AvatarCard name={user.name} email={user.email} />

        <div className="flex flex-col space-y-4">

          {/* Name */}
          <label className="font-medium">
            Name:
            {editMode ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full bg-gray-200 p-2 rounded-lg mt-1"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded-lg mt-1">{user.name}</p>
            )}
          </label>

          {/* Email */}
          <label className="font-medium">
            Email:
            {editMode ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full bg-gray-200 p-2 rounded-lg mt-1"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded-lg mt-1">{user.email}</p>
            )}
          </label>

          {/* Phone */}
          <label className="font-medium">
            Phone Number:
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="w-full bg-gray-200 p-2 rounded-lg mt-1"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded-lg mt-1">{user.phone}</p>
            )}
          </label>

          {/* Account Type */}
          <label className="font-medium">
            Account Type:
            <p className="bg-gray-100 p-2 rounded-lg mt-1 text-gray-600">
              {user.accountType?.toUpperCase()}
            </p>
          </label>

          {/* BUTTONS */}
          {!editMode ? (
            <button
              className="bg-indigo-600 profile-hover-btn text-white py-2 rounded-lg mt-4"
              onClick={handleEditToggle}
            >
              Update Profile
            </button>
          ) : (
            <button
              className="bg-green-600 profile-hover-btn text-white py-2 rounded-lg mt-4"
              onClick={handleSave}
            >
              Save
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
