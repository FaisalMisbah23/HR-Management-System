
"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { fetchEmployee } from "../features/currentEmpSlice";
import {useEffect} from 'react'
import axios from "axios";
import {toast} from 'react-toastify'
import logo from '../images/logo/logoLight.png'

export default function UserNavbar() {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const {data} = useSelector((state)=>state.currEmp.data);

  useEffect(()=>{
    dispatch(fetchEmployee())
  },[])

    // logout
    const handleLogout = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_USER_URL}/auth/logout`,{},
          { withCredentials: true }
        );
        toast.success(response.data.message);
        navigate("/user/auth/signin")
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An error occurred. Please try again.');
        }
      }
    }; 
  


  const isActive = (path) => location.pathname.includes(path);
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="http://localhost:5173/user/dashboard">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2 z-10">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={data?.avatar} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{data?.name}</span>
            <span className="block truncate text-sm font-medium">{data?.email}</span>
          </Dropdown.Header>
          <Link to='/user/dashboard'><Dropdown.Item>Dashboard</Dropdown.Item></Link>
          <Link to='/user/setting'><Dropdown.Item>Settings</Dropdown.Item></Link>
          <Link to='/user/profile'><Dropdown.Item>Profile</Dropdown.Item></Link>
          <Link to='/admin'><Dropdown.Item>Admin</Dropdown.Item></Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
      <Navbar.Link active={isActive('/user/dashboard')}>
          <Link to="/user/dashboard">Dashboard</Link>
        </Navbar.Link>
        <Navbar.Link active={isActive('/user/leaveform')}>
          <Link to="/user/leaveform">Leave Form</Link>
        </Navbar.Link>
        <Navbar.Link active={isActive('/user/kpigoals')}>
          <Link to="/user/kpigoals">KPI Goals</Link>
        </Navbar.Link>
        <Navbar.Link active={isActive('/user/updateprofile')}>
          <Link to="/user/updateprofile">Update Profile</Link>
        </Navbar.Link>
        <Navbar.Link active={isActive('/user/leavehistroy')}>
          <Link to="/user/leavehistroy">Leave History</Link>
        </Navbar.Link>
        <Navbar.Link active={isActive('/user/leavehistroy')}>
          <Link to="/user/notifications">Notifications</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
