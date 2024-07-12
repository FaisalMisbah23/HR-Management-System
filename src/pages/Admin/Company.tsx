import logo from '../../images/logo/logo.png';
import loginImage from '../../images/logo/loginImage.png';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function Company() {
  const [company, setCompany] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMIN_URL}/company/register`,
        { name: company },{
          withCredentials:true
        }
      );
      toast.success(response.data.message);
      window.location.reload()
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <div
        className="h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${loginImage})` }}
      >
        <img className="top-0 left-0" src={logo} alt="logo" />
        <div className="overflow-hidden flex justify-center items-center">
          <div className="bg-transparent m-4 p-8 rounded w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">
              Register Your Company
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block font-semibold  mb-2 text-white "
                  htmlFor="name"
                >
                  Company Name
                </label>
                <input
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                  className="border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  placeholder="Enter your company name"
                  required
                />
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="bg-yellow-100 text-textdark hover:bg-opacity-90 bg-white-200 w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}


// App.js

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCompany } from "../../features/companySlice";

// export const Company = () => {
//     const dispatch = useDispatch();
//     const { isLoading, data, isError } = useSelector((state) => state.company);
    

//     useEffect(() => {
//         dispatch(fetchCompany());
//     }, [dispatch]);

//     // if (isLoading) return <div>Loading...</div>;
//     // if (isError) return <div>Error loading company data.</div>;

//     return (
//         <div>
//             <h1>Company Details</h1>
//             {/* Render company data here */}
//             <h1>{data?.data?.name?"true":"false"}</h1>
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//     );
// };