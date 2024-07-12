import React,{useEffect,useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Badge, Button, Dropdown, DropdownItem } from 'flowbite-react';
import axios from 'axios'
import Loader from '../../common/Loader';
import CardDataStats from '../../components/CardDataStats';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
const [data,setData]=useState()

  const fetchData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_USER_URL}/auth/dashboard`,
      { withCredentials: true },
    );
      setData(res.data.data[0])
  };

useEffect(()=>{
  fetchData()
},[])


if(data) console.log(data)

if(!data) return <Loader/>

const targetNotifications = data?.notifications.filter((e)=>{return e.message.includes("target")})
const leaveNotifications = data?.notifications.filter((e)=>{return e.message.includes("leave")})

const pendingTasks = data?.targets.filter((e)=>{return !(e.marking)})
const completedTasks = data?.targets.filter((e)=>{return e.marking})

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
     <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-[#121C3E] to-[#64748b] font-sans px-6 py-12 mb-6">
      <div className="container mx-auto flex flex-col justify-center items-center text-center">
        <h2 className="text-white sm:text-6xl text-4xl font-bold mb-8">{data.company.name}</h2>
        <h2 className="text-white sm:text-3xl text-2xl font-bold mb-4">Employee Dashboard</h2>
      </div>
    </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardDataStats title="Performance" total={data.performance}>
        <svg  className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	<path fill="" d="M3 22V8h4v14zm7 0V2h4v20zm7 0v-8h4v8z" />
</svg>
        </CardDataStats>
        <CardDataStats title="Projects" total={data.targetCount}>
        <svg className="fill-primary dark:fill-white"
 xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36">
	<path fill="" d="M29.29 34H6.71A1.7 1.7 0 0 1 5 32.31V6.69A1.75 1.75 0 0 1 7 5h2v2H7v25h22V7h-2V5h2.25A1.7 1.7 0 0 1 31 6.69v25.62A1.7 1.7 0 0 1 29.29 34" class="clr-i-outline clr-i-outline-path-1" />
	<path fill="" d="M16.66 25.76L11.3 20.4a1 1 0 0 1 1.42-1.4l3.94 3.94l8.64-8.64a1 1 0 0 1 1.41 1.41Z" class="clr-i-outline clr-i-outline-path-2" />
	<path fill="" d="M26 11H10V7.33A2.34 2.34 0 0 1 12.33 5h1.79a4 4 0 0 1 7.75 0h1.79A2.34 2.34 0 0 1 26 7.33ZM12 9h12V7.33a.33.33 0 0 0-.33-.33H20V6a2 2 0 0 0-4 0v1h-3.67a.33.33 0 0 0-.33.33Z" class="clr-i-outline clr-i-outline-path-3" />
	<path fill="none" d="M0 0h36v36H0z" />
</svg>
        </CardDataStats>
        <CardDataStats title="Completed" total={data.completeTargets}>
        <svg  className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
	<path fill="" d="m22 27.18l-2.59-2.59L18 26l4 4l8-8l-1.41-1.41z" />
	<path fill="" d="M25 5h-3V4a2.006 2.006 0 0 0-2-2h-8a2.006 2.006 0 0 0-2 2v1H7a2.006 2.006 0 0 0-2 2v21a2.006 2.006 0 0 0 2 2h9v-2H7V7h3v3h12V7h3v11h2V7a2.006 2.006 0 0 0-2-2m-5 3h-8V4h8Z" />
</svg>
        </CardDataStats>
        <CardDataStats title="Total Leaves" total={data.totalLeaves}>
        <svg className="fill-primary dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
	<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
		<path fill='' d="M4 21.4V2.6a.6.6 0 0 1 .6-.6h11.652a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 20 5.75V21.4a.6.6 0 0 1-.6.6H4.6a.6.6 0 0 1-.6-.6M8 10h8m-8 8h8m-8-4h4" />
		<path fill='' d="M16 2v3.4a.6.6 0 0 0 .6.6H20" />
	</g>
</svg>
        </CardDataStats>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Personal Information */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Personal Information</h2>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Name:</label>
            <p className="text-lg">{data.name}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Email:</label>
            <p className="text-lg">{data.email}</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Department:</label>
            <p className="text-lg">{data.department}</p>
          </div>
          <Button size="sm" color="primary" className="w-full">
            Edit Details
          </Button>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Notifications</h2>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <Badge color="success" size="sm" className="mr-2">
                New
              </Badge>
              <p className="text-lg">{targetNotifications[targetNotifications.length-1]?.message}</p>
            </li>
            <li className="flex items-center mb-2">
              <Badge color="success" size="sm" className="mr-2">
                New
              </Badge>
              <p className="text-lg">{targetNotifications[targetNotifications.length-2]?.message}</p>
            </li>
            <li className="flex items-center mb-2">
              <Badge color="warning" size="sm" className="mr-2">
                Alert
              </Badge>
              <p className="text-lg">{leaveNotifications[leaveNotifications.length-1]?.message}</p>
            </li>
          </ul>
          <Link to='/user/notifications'>
          <Button size="sm" color="primary" className="w-full">
            View All Notifications
          </Button>
          </Link>
        </div>

        {/* Attendance and Leave Management */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Attendance & Leave</h2>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Attendance:</label>
            <p className="text-lg">{((260-data.totalLeaves)/260)*100}%</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Total Leave Duration:</label>
            <p className="text-lg">{data.totalLeaves} days</p>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-bold mb-1">Remaining Leave Balance:</label>
            <p className="text-lg">{24-data.totalLeaves>=0?(24-data.totalLeaves):0} days</p>
          </div>
          <Link to="/user/leavehistroy">
          <Button size="sm" color="primary" className="w-full">
            View Leave History & Details
          </Button></Link>
        </div>

        {/* Task Management */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Tasks</h2>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <Badge color="primary" size="sm" className="mr-2">
                Ongoing
              </Badge>
              <p className="text-lg">{pendingTasks[pendingTasks.length-1]?.title}</p>
            </li>
            <li className="flex items-center mb-2">
              <Badge color="success" size="sm" className="mr-2">
                Completed
              </Badge>
              <p className="text-lg">{completedTasks[completedTasks.length-1]?.title}</p>
            </li>
            <li className="flex items-center mb-2">
              <Badge color="success" size="sm" className="mr-2">
                Completed
              </Badge>
              <p className="text-lg">{completedTasks[completedTasks.length-2]?.title}</p>
            </li>
          </ul>
          <Link to="/user/kpigoals">
          <Button size="sm" color="primary" className="w-full">
            View All Tasks
          </Button></Link>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Performance</h2>
          <LineChart width={300} height={200} data={[
            { name:month[new Date(completedTasks[completedTasks.length - 1]?.updatedAt).getMonth()], value: data.performance },
          ]}>
            <Line type="monotone" dataKey="value" stroke="#8884d8"/>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
          </LineChart>
        </div>

        {/* Communication Tools */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-2">Communication</h2>
          <ul className="list-none mb-4">
            <li className="flex items-center mb-2">
              <Badge color="primary" size="sm" className="mr-2">
                Email
              </Badge>
              <p className="text-lg">{data.email}</p>
            </li>
            <li className="flex items-center mb-2">
              <Badge color="success" size="sm" className="mr-2">
                Phone
              </Badge>
              <p className="text-lg">{data.phoneNumber}</p>
            </li>
          </ul>
          <Link to="/user/updateprofile">
          <Button size="sm" color="primary" className="w-full">
            Edit Details
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard