// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logoLight from '../../images/logo/logoLight.png';
// import userLoginImg from '../../images/logo/userLoginImg.png';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const SignIn: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e:any) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_ADMIN_URL}/auth/login`,
//         {
//           email: formData.email,
//           password: formData.password,
//         },{
//           withCredentials:true
//         }
//       );
//       toast.success(response.data.message);
//         navigate('/admin');
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error('An error occured please try again ');
//       }
//     }
//   };
//   return (
//     <div className="rounded-sm border h-screen overflow-hidden border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="flex flex-wrap flex-row-reverse items-center">
//         <div className="hidden w-full xl:block xl:w-1/2">
//           <img
//             className="relative h-screen w-full"
//             src={userLoginImg}
//             alt="img"
//           />
//           <h1 className=" absolute text-white text-3xl font-bold top-[61%] left-[55%]">
//             Manage all <span className="text-yellow-100">HR Operations</span>{' '}
//             from the <br /> comfort of your home.
//           </h1>
//         </div>

//         <div className="w-full h-screen border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
//           <Link
//             className="inline-block pl-2 sm:pl-6 xl:pl-10"
//             to="/user/auth/signup"
//           >
//             <img src={logoLight} alt="Logo" />
//           </Link>
//           <div className="w-full p-4 sm:p-12.5 xl:p-17.5 mt-32 xl:mt-0">
//             <h2 className="mb-1.5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
//               Sign In
//             </h2>
//             <span className="mb-9 block font-medium">
//               Sign In to your account
//             </span>
//             <form onSubmit={handleLogin}>
//               <div className="mb-4">
//                 <label className="mb-2.5 block font-medium text-black dark:text-white">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your email"
//                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   />

//                   <span className="absolute right-4 top-4">
//                     <svg
//                       className="fill-current"
//                       width="22"
//                       height="22"
//                       viewBox="0 0 22 22"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g opacity="0.5">
//                         <path
//                           d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
//                           fill=""
//                         />
//                       </g>
//                     </svg>
//                   </span>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <label className="mb-2.5 block font-medium text-black dark:text-white">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     placeholder="Enter your password"
//                     className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   />

//                   <span className="absolute right-4 top-4">
//                     <svg
//                       className="fill-current"
//                       width="22"
//                       height="22"
//                       viewBox="0 0 22 22"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <g opacity="0.5">
//                         <path
//                           d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
//                           fill=""
//                         />
//                         <path
//                           d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
//                           fill=""
//                         />
//                       </g>
//                     </svg>
//                   </span>
//                 </div>
//               </div>
//               <div className="mb-5">
//                 <input
//                   type="submit"
//                   value="Sign In"
//                   className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
//                 />
//               </div>

//               <div className="mt-6 text-center">
//                 <p>
//                   Don’t have an account yet?{' '}
//                   <Link to="/admin/auth/signup" className="text-primary">
//                     Join KRIS today.
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React from 'react'

const SignIn = () => {
  return (
   <div className="flex flex-col min-h-[100dvh]">
<header className="px-4 lg:px-6 h-14 flex items-center justify-between">
  <a className="flex items-center" href="#" rel="ugc">
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
    <span className="sr-only">HR Management System</span>
  </a>
  <button className="block lg:hidden p-2 focus:outline-none" id="menu-button">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
  <nav className="hidden lg:flex gap-4 sm:gap-6" id="menu">
    <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
      Features
    </a>
    <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
      Pricing
    </a>
    <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
      About
    </a>
    <a className="text-sm font-medium hover:underline underline-offset-4" href="#" rel="ugc">
      Contact
    </a>
  </nav>
</header>

  <main className="flex-1">
  <section className="w-full py-12 md:py-24 lg:py-32">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Streamline Your HR Management
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Our HR management system helps you automate and simplify your HR processes, from onboarding to payroll.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" href="#" rel="ugc">
            Get Started
          </a>
          <a className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" href="#" rel="ugc">
            Contact Sales
          </a>
        </div>
      </div>
      <img src="/placeholder.svg" width={550} height={550} alt="Hero" className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square" />
    </div>
  </div>
</section>

    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width={20} height={14} x={2} y={6} rx={2} />
            </svg>
            <h3 className="text-xl font-bold">Streamlined Onboarding</h3>
            <p className="text-muted-foreground">Easily onboard new employees with our intuitive onboarding process.</p>
          </div>
          <div className="grid gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width={18} height={18} x={3} y={4} rx={2} />
              <path d="M3 10h18" />
            </svg>
            <h3 className="text-xl font-bold">Time Management</h3>
            <p className="text-muted-foreground">
              Track employee attendance, leave, and overtime with our powerful time management tools.
            </p>
          </div>
          <div className="grid gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
            <h3 className="text-xl font-bold">Payroll Automation</h3>
            <p className="text-muted-foreground">
              Automate your payroll process and ensure accurate and timely payments.
            </p>
          </div>
          <div className="grid gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3 className="text-xl font-bold">Employee Management</h3>
            <p className="text-muted-foreground">Manage employee records, performance, and development with ease.</p>
          </div>
          <div className="grid gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width={20} height={14} x={2} y={6} rx={2} />
            </svg>
            <h3 className="text-xl font-bold">Compliance Tracking</h3>
            <p className="text-muted-foreground">
              Stay on top of HR compliance requirements and avoid costly penalties.
            </p>
          </div>
          <div className="grid gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
              <line x1={12} x2={12} y1={20} y2={10} />
              <line x1={18} x2={18} y1={20} y2={4} />
              <line x1={6} x2={6} y1={20} y2={16} />
            </svg>
            <h3 className="text-xl font-bold">Robust Reporting</h3>
            <p className="text-muted-foreground">
              Generate comprehensive reports to gain valuable insights into your workforce.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Customer Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from our satisfied customers about how our HR management system has transformed their businesses.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">"Streamlined our HR processes"</h3>
                <p className="text-muted-foreground">
                  "Since implementing the HR management system, our HR\n team has been able to focus on strategic
                  initiatives\n rather than manual tasks."
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" src="/placeholder-user.jpg" />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-none">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">HR Manager, Acme Inc.</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">"Improved employee engagement"</h3>
                <p className="text-muted-foreground">
                  "Our employees love the user-friendly interface and\n self-service features of the HR management
                  system. It's\n made their lives so much easier."
                </p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <img className="aspect-square h-full w-full" src="/placeholder-user.jpg" />
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-none">John Bauer</p>
                    <p className="text-sm text-muted-foreground">HR Specialist, Globex Corporation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/placeholder.svg" width={550} height={310} alt="Testimonials" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last" />
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="grid gap-4">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Starter</div>
            <h3 className="text-2xl font-bold">$9/month</h3>
            <p className="text-muted-foreground">Perfect for small businesses with up to 10 employees.</p>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Onboarding and employee records
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Time and attendance tracking
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Basic reporting
              </li>
            </ul>
            <a className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" href="#" rel="ugc">
              Get Started
            </a>
          </div>
          <div className="grid gap-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Professional
            </div>
            <h3 className="text-2xl font-bold">$29/month</h3>
            <p className="text-muted-foreground">Ideal for growing businesses with up to 50 employees.</p>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-secondary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                All Starter features
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-secondary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Payroll management
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-secondary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Performance management
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-secondary">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Advanced reporting
              </li>
            </ul>
            <a className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" href="#" rel="ugc">
              Get Started
            </a>
          </div>
          <div className="grid gap-4">
            <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">Enterprise</div>
            <h3 className="text-2xl font-bold">Custom Pricing</h3>
            <p className="text-muted-foreground">Tailored solutions for businesses with more than 50 employees.</p>
            <ul className="grid gap-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                All Professional features
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Dedicated account manager
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Customized reporting and analytics
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Advanced compliance features
              </li>
            </ul>
            <a className="inline-flex h-10 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground shadow transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" href="#" rel="ugc">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Contact Us</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get</h2>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>


  )
}

export default SignIn