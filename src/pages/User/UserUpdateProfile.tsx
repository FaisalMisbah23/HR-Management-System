import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../../features/currentEmpSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserUpdateProfile = () => {
  const { data } = useSelector((state) => state.currEmp.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);
  
  const [formData, setFormData] = useState({
    firstName: data?.name?.split(" ")[0] || '',
    lastName: data?.name?.split(" ")[1] || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || '',
    department: data?.department || '',
    jobtitle: data?.jobtitle || '',
    jobcategory: data?.jobcategory || '',
    gender: data?.gender || '',
    startdate: data?.startdate || '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.name.split(" ")[0] || '',
        lastName: data.name.split(" ")[1] || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        department: data.department || '',
        jobtitle: data.jobtitle || '',
        jobcategory: data.jobcategory || '',
        gender: data.gender || '',
        startdate: data.startdate || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_USER_URL}/auth/updateprofile`,
        {
          firstName:formData.firstName,
          lastName:formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          department: formData.department,
          jobtitle: formData.jobtitle,
          jobcategory: formData.jobcategory,
          gender: formData.gender,
          startdate: formData.startdate,
        },{withCredentials:true}
      );
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-bold text-3xl text-black dark:text-white">
          Update Profile Information
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                name="firstName"
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              name="email"
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* <--password--> */}
          {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
            Re-type Password
          </label>
          <input
            type="password"
            placeholder="Re-enter password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

        </div> */}

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startdate}
                name="startdate"
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Gender
              </label>
              <select
              defaultValue="Male"
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                name="department"
                onChange={handleChange}
                placeholder="Enter your department name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Job Title
              </label>
              <input
                type="text"
                name="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
                placeholder="Enter your jobtitle"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Job Category
              </label>
              <select
              defaultValue="Full Time"
                name="jobcategory"
                id="jobcategory"
                value={formData.jobcategory}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
            Submit  
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateProfile;
