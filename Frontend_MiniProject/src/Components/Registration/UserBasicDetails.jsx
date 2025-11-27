import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import SyncLoader from "react-spinners/SyncLoader"

const UserBasicDetails = () => {

  const navigateTo = useNavigate();
  const [isLoading] = useState(false);

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!details.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(details.name)) {
      newErrors.name = "Name should contain only letters";
    }

    if (!details.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(details.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!details.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(details.email)) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("User Details Submitted:", details);
    navigateTo("/signup/account-details");
  };

  return (
    <>
      {isLoading ? (
        <div className='flex flex-row justify-center items-center h-[100vh]'>
          <SyncLoader size={20} color={"#5145CD"} />
        </div>
      ) : (

      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="text-center text-2xl font-bold">Sign Up - Basic Info</div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  type="text"
                  value={details.name}
                  onChange={handleDetails}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  type="number"
                  maxLength={10}
                  value={details.phone}
                  onChange={handleDetails}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  value={details.email}
                  onChange={handleDetails}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Next
              </button>

            </form>

            <div className="mt-6 text-center">
              <NavLink to={"/login"} className="text-sm text-gray-700">
                Already having an account?
              </NavLink>
            </div>

          </div>
        </div>

      </div>

      )}
    </>
  );
};

export default UserBasicDetails;
