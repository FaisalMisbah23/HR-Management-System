import React, { useState ,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Navbar } from "flowbite-react";
import logo from '../images/logo/logoLight.png'
import axios from 'axios'


function LandingPage() {
    const [data,setData]=useState()
    const location = useLocation();
    const isActive = (hash) => location.hash === hash;
    const fetchData = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_ADMIN_URL}/auth/landingpage`,
          { withCredentials: true },
        );
          setData(res.data.data[0])
      };
    
    useEffect(()=>{
      fetchData()
    },[])

    if(data) console.log(data)
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar fluid rounded>
        <Navbar.Brand href="#">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Link to="/admin/auth/signup">
            <Button className="bg-primary">Sign Up</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link className={`${isActive('#stattistics') ? 'bg-primary' : ''}`} active={isActive('#stattistics')} href="#stattistics">
          Stattistics Overview
          </Navbar.Link>
          <Navbar.Link className={`${isActive('#features') ? 'bg-primary' : ''}`} active={isActive('#features')} href="#features">
            Features
          </Navbar.Link>
          <Navbar.Link className={`${isActive('#testimonials') ? 'bg-primary' : ''}`} active={isActive('#testimonials')} href="#testimonials">
            Testimonials
          </Navbar.Link>
          <Navbar.Link className={`${isActive('#call-to-action') ? 'bg-primary' : ''}`} active={isActive('#call-to-action')} href="#call-to-action">
            Get Started
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <main className="flex-1 p-6">
<section className="hero py-8 flex flex-wrap justify-center items-center">
  <div className="w-full md:w-1/2 xl:w-1/2 p-4 md:px-8 xl:px-12 text-center md:text-left xl:text-left">
    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
      Streamline Your HR Management
    </h1>
    <p className="text-lg md:text-xl text-black mb-8">
      Our HR management system helps you automate and simplify your HR processes, from onboarding to payroll.
    </p>
    <div className="flex justify-center md:justify-start xl:justify-start mb-8">
      <Link to='/admin/auth/signup' className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded mx-2">
        Get Started
      </Link>
      <Link to='/admin/auth/signin' className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded mx-2">
        Sign In
      </Link>
    </div>
  </div>
  <div className="hidden md:block xl:block w-1/2 xl:w-1/2 p-4 md:px-8 xl:px-12">
    <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3RyZWFtbGluZSUyMFlvdXIlMjBIUiUyME1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D" alt="Hero Image" className="w-full h-full object-cover" />
  </div>
</section>
{data && (<div id='stattistics' className="px-4 py-8 font-sans text-gray-700 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Statistics Overview</h2>
                        <div className="grid md:grid-cols-3 gap-8 max-md:text-center rounded overflow-hidden max-md:max-w-md mx-auto">
                            <div className="bg-yellow-100 px-6 py-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                <h3 className="text-5xl font-extrabold text-primary">{data.totalCompanies}+</h3>
                                <p className="text-lg font-bold mt-5 text-gray-800">Total Companies Registered</p>
                                <p className="text-sm mt-3 text-gray-600">We have a vast network of registered companies, growing daily.</p>
                            </div>

                            <div className="bg-green-100 px-6 py-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                <h3 className="text-5xl font-extrabold text-primary">{data.totalHRs}+</h3>
                                <p className="text-lg font-bold mt-5 text-gray-800">Total HR Professionals</p>
                                <p className="text-sm mt-3 text-gray-600">A large pool of HR professionals managing various aspects of human resources.</p>
                            </div>

                            <div className="bg-orange-100 px-6 py-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                <h3 className="text-5xl font-extrabold text-primary">{data.totalEmployees}+</h3>
                                <p className="text-lg font-bold mt-5 text-gray-800">Total Employees</p>
                                <p className="text-sm mt-3 text-gray-600">Thousands of employees are registered, showcasing our extensive reach.</p>
                            </div>
                        </div>
                    </div>
                </div>)}

        <section id='features' className="py-6 bg-gray-50">
  <div  className="container mx-auto p-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12"> Features </h2>
    <div className="flex flex-wrap justify-center">
      {[ 
        { 
          title: 'Streamlined Onboarding', 
          description: 'Easily onboard new employees with our intuitive onboarding process.', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 2048 2048">
          <path fill="currentColor" d="M2048 512v1536H0V512h517q-2-16-3-32t-2-32q0-93 35-174t96-143t142-96T960 0q93 0 174 35t143 96t96 142t35 175q0 16-1 32t-4 32zM960 128q-66 0-124 25t-102 69t-69 102t-25 124t25 124t68 102t102 69t125 25t124-25t101-68t69-102t26-125t-25-124t-69-101t-102-69t-124-26m960 512h-555q-25 52-62 97t-85 77q103 40 186 106t140 152t89 188t31 212v64h-128v-64q0-123-44-228t-121-183t-182-121t-229-44q-111 0-210 38t-176 107t-126 162t-61 205h648l-230-230l91-90l384 384l-384 384l-91-90l230-230H256v-64q0-110 31-211t90-187t141-152t185-107q-98-69-148-175H128v1280h1792z" />
      </svg>
        },
        { 
          title: 'Time Management', 
          description: 'Track employee attendance, leave, and overtime with our powerful time management tools.', 
          icon:           
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <g fill="none">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
              <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1" />
          </g>
      </svg>
        },
        { 
          title: 'Payroll Automation', 
          description: 'Automate your payroll process and ensure accurate and timely payments.', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
          <path fill="currentColor" d="M16 27c-3.6 0-7.1-1.8-9.2-5H12v-2H4v8h2v-3.7c2.5 3 6.1 4.7 10 4.7zm15-4v-2h-2.1c-.1-.6-.4-1.2-.7-1.8l1.5-1.5l-1.4-1.4l-1.5 1.5c-.5-.3-1.1-.6-1.8-.7V15h-2v2.1c-.6.1-1.2.4-1.8.7l-1.5-1.5l-1.4 1.4l1.5 1.5c-.3.5-.6 1.1-.7 1.8H17v2h2.1c.1.6.4 1.2.7 1.8l-1.5 1.5l1.4 1.4l1.5-1.5c.5.3 1.1.6 1.8.7V29h2v-2.1c.6-.1 1.2-.4 1.8-.7l1.5 1.5l1.4-1.4l-1.5-1.5c.3-.5.6-1.1.7-1.8zm-7 2c-1.7 0-3-1.3-3-3s1.3-3 3-3s3 1.3 3 3s-1.3 3-3 3m-4-15h5.2C21.9 4.9 15.1 3.5 10 6.8c-3.1 2-5 5.5-5 9.2H3C3 8.8 8.8 3 16 3c3.9 0 7.5 1.7 10 4.7V4h2v8h-8z" />
      </svg>
          
        },
        { 
          title: 'Employee Management', 
          description: 'Manage employee records, performance, and development with ease.', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 36 36">
          <path fill="currentColor" d="M16.43 16.69a7 7 0 1 1 7-7a7 7 0 0 1-7 7m0-11.92a5 5 0 1 0 5 5a5 5 0 0 0-5-5M22 17.9a25.4 25.4 0 0 0-16.12 1.67a4.06 4.06 0 0 0-2.31 3.68v5.95a1 1 0 1 0 2 0v-5.95a2 2 0 0 1 1.16-1.86a22.9 22.9 0 0 1 9.7-2.11a23.6 23.6 0 0 1 5.57.66Zm.14 9.51h6.14v1.4h-6.14z" />
          <path fill="currentColor" d="M33.17 21.47H28v2h4.17v8.37H18v-8.37h6.3v.42a1 1 0 0 0 2 0V20a1 1 0 0 0-2 0v1.47H17a1 1 0 0 0-1 1v10.37a1 1 0 0 0 1 1h16.17a1 1 0 0 0 1-1V22.47a1 1 0 0 0-1-1" />
      </svg>
        },
        { 
          title: 'Compliance Tracking', 
          description: 'Stay on top of HR compliance requirements and avoid costly penalties.', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
          <path fill="currentColor" d="M6 23H3q-.825 0-1.412-.587T1 21v-3h2v3h3zm12 0v-2h3v-3h2v3q0 .825-.587 1.413T21 23zm-6-4.5q-3 0-5.437-1.775T3 12q1.125-2.95 3.563-4.725T12 5.5t5.438 1.775T21 12q-1.125 2.95-3.562 4.725T12 18.5m0-2q2.2 0 4.025-1.2t2.8-3.3q-.975-2.1-2.8-3.3T12 7.5T7.975 8.7t-2.8 3.3q.975 2.1 2.8 3.3T12 16.5m0-1q1.45 0 2.475-1.025T15.5 12t-1.025-2.475T12 8.5T9.525 9.525T8.5 12t1.025 2.475T12 15.5m0-2q-.625 0-1.063-.437T10.5 12t.438-1.062T12 10.5t1.063.438T13.5 12t-.437 1.063T12 13.5M1 6V3q0-.825.588-1.412T3 1h3v2H3v3zm20 0V3h-3V1h3q.825 0 1.413.588T23 3v3zm-9 6" />
      </svg>
        },
        { 
          title: 'Robust Reporting', 
          description: 'Generate comprehensive reports to gain valuable insights into your workforce.', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
          <g fill="currentColor">
              <path d="M25 5h-.17v2H25a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h.17V5H7a3 3 0 0 0-3 3v20a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3" />
              <path d="M23 3h-3V0h-8v3H9v6h14zm-2 4H11V5h3V2h4v3h3z" />
              <path d="M10 13h12v2H10zm0 5h12v2H10zm0 5h12v2H10z" class="ouiIcon__fillSecondary" />
          </g>
      </svg>
        }
      ].map((feature, index) => (
        <div key={index} className="feature w-full md:w-1/2 lg:w-1/3 p-4 mb-8">
          <div className="flex items-center mb-2">
            {feature.icon}
            <h3 className="ml-2 text-2xl font-bold">{feature.title}</h3>
          </div>
          <p className="text-lg">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
<section id='testimonials' className="py-6 bg-gray-100">
  <div className="container mx-auto p-4">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
      What Our Customers Say
    </h2>
    <p className="text-lg text-gray-600 text-center mb-12">
      Don't just take our word for it. Hear from our satisfied customers who have seen real results from using our HR management system.
    </p>
    <div className="flex flex-wrap justify-center">
      {[
        {
          quote: 'Streamlined our HR processes and saved us so much time!',
          author: 'Sydney Mcdonald, HR Manager',
          image: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
        {
          quote: 'The performance management feature has been a game-changer for our company.',
          author: 'Cooper Kaufman, CEO',
          image: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
        {
          quote: 'The onboarding process is so easy and efficient. New hires are up and running in no time!',
          author: 'Ava Lee, Operations Manager',
          image: 'https://randomuser.me/api/portraits/women/46.jpg',
        },
      ].map((testimonial, index) => (
        <div key={index} className="testimonial w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-8">
          <p className="text-lg mb-2">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center">
            <img src={testimonial.image} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
            <p className="text-lg text-gray-600">
              {testimonial.author}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
<section id='call-to-action' className="py-6 bg-gray-50">
  <div className="container mx-auto p-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Ready to Simplify HR and Boost Productivity?
    </h2>
    <p className="text-lg mb-8">
    Get started with our HR management system today and see the difference for yourself.    </p>
    <div className="flex justify-center mb-8">
    <Link to='/admin/auth/signup' className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded mx-2">
        Get Started
      </Link>
      <Link to='/admin/auth/signin' className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded mx-2">
        Sign In
      </Link>
    </div>
    <p className="text-sm text-gray-600">
      No credit card required. Cancel anytime.
    </p>
  </div>
</section>
      </main>
      <footer className="py-4 px-6 bg-white shadow">
        <div className="container mx-auto p-4 text-center">
          <p className="text-lg text-gray-600 mb-4">
            &copy; 2024 HR Management System. All Rights Reserved.
          </p>
          <ul className="flex justify-center mb-4">
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">
                Terms of Service
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition duration-300 ease-in-out">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;