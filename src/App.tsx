import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import LeaveSettings from './pages/LeaveManagement/LeaveSettings';
import LeaveRecall from './pages/LeaveManagement/LeaveRecall';
import LeaveHistroy from './pages/LeaveManagement/LeaveHistory';
import EmployeeManagement from './pages/EmployeeManagement/EmployeeManagement';
import Target from './pages/PerformanceManagement/Target';
import TargetSetup from './pages/PerformanceManagement/TargetSetup';
import UserSignIn from './pages/User/UserSignIn';
import UserSignup from './pages/User/UserSignup';
import UserDashboard from './pages/User/UserDashboard';
import UserNavbar from './UserComponents/Navbar';
import UserLeaveHistroy from './pages/User/UserLeaveHistroy';
import UserKpiGoals from './pages/User/UserKpiGoals';
import LeaveForm from './pages/User/LeaveForm';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Company } from './pages/Admin/Company';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompany } from './features/companySlice';
import UserUpdateProfile from './pages/User/UserUpdateProfile';
import UpdateProfile from './pages/EmployeeManagement/UpdateProfile';
import EditTarget from './pages/PerformanceManagement/EditTarget';
import { fetchHR } from './features/getCurrHrSlice';
import ProtectedRoute from './ProtectedRoute';
import UserSetting from './pages/User/UserSetting';
import UserProfile from './pages/User/UserProfile';
import UserProtectedRoutes from './UserComponents/UserProtectedRoutes';
import { fetchEmployee } from './features/currentEmpSlice';
import UserNotifications from './pages/User/UserNotifications';
import ErrorPage from './components/ErrorPage';
import { useFetchCompany } from './hooks/useFetchCompany';
import LandingPage from './components/LandingPage';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.company.data);

  useEffect(() => {
    dispatch(fetchCompany());
}, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);





  return loading ? (
    <Loader />
  ) : (
    <>
   <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={true}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

<Routes>
     <Route
          path="/"
          element={
            <>
              <PageTitle title="Home | Kris - Human Resource Management System" />
              <LandingPage/>
            </>
          }
        />
     <Route
          path="/admin/"
          element={
            <>
              <PageTitle title="Dashboard | Kris - Human Resource Management System" />
              <ProtectedRoute>
              {data?.name?<ECommerce />:<Company/>}
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/calendar"
          element={
            <>
              <PageTitle title="Calendar | Kris - Human Resource Management System" />
             <ProtectedRoute><Calendar/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <>
              <PageTitle title="Profile | Kris - Human Resource Management System" />
              <ProtectedRoute><Profile/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | Kris - Human Resource Management System" />
              <ProtectedRoute><FormElements/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <>
              <PageTitle title="Settings | Kris - Human Resource Management System" />
              <ProtectedRoute><Settings/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/emplyeemanagement"
          element={
            <>
              <PageTitle title="Employee Management | Kris - Human Resource Management System" />
              <ProtectedRoute><EmployeeManagement/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/emplyeemanagement/update/:employeeId"
          element={
            <>
              <PageTitle title="Update Profile | Kris - Human Resource Management System" />
              <ProtectedRoute><UpdateProfile/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/leavemanagement/leaveplan"
          element={
            <>
              <PageTitle title="Leave Settings | Kris - Human Resource Management System" />
              <ProtectedRoute><LeaveSettings/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/leavemanagement/manageleaves"
          element={
            <>
              <PageTitle title="Leave Recall | Kris - Human Resource Management System" />
              <ProtectedRoute><LeaveRecall/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/leavemanagement/leavehistroy"
          element={
            <>
              <PageTitle title="Leave Histroy | Kris - Human Resource Management System" />
              <ProtectedRoute><LeaveHistroy/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/performancemanagement/targetsetup"
          element={
            <>
              <PageTitle title="Target Setup | Kris - Human Resource Management System" />
              <ProtectedRoute><TargetSetup/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/performancemanagement/target"
          element={
            <>
              <PageTitle title="Target | Kris - Human Resource Management System" />
              <ProtectedRoute><Target/></ProtectedRoute>
            </>
          }
        />
        <Route
          path="/admin/performancemanagement/target/:targetId"
          element={
            <>
              <PageTitle title="Edit Target | Kris - Human Resource Management System" />
              <ProtectedRoute><EditTarget/></ProtectedRoute>
            </>
          }
        />

        <Route
          path="/admin/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Kris - Human Resource Management System" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/admin/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Kris - Human Resource Management System" />
              <SignUp />
            </>
          }
        />

          // User Routes

          <Route
          path="/user/auth/signin"
          element={
            <>
              <PageTitle title="Sign In | Kris - Human Resource Management System" />
              <UserSignIn />
            </>
          }
        />
        
          <Route
          path="/user/auth/signup"
          element={
            <>
              <PageTitle title="Sign Up | Kris - Human Resource Management System" />
              <UserSignup />
            </>
          }
        />
          <Route
          path="/user/dashboard"
          element={
            <>
              <PageTitle title="User Dashboard | Kris - Human Resource Management System" />
              <UserNavbar/>
             <UserProtectedRoutes><UserDashboard /></UserProtectedRoutes> 
            </>
          }
        />
          <Route
          path="/user/leavehistroy"
          element={
            <>
              <PageTitle title="User Leave Histroy | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><UserLeaveHistroy /></UserProtectedRoutes>
            </>
          }
        />
          <Route
          path="/user/kpigoals"
          element={
            <>
              <PageTitle title="User KPI Goals | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><UserKpiGoals /></UserProtectedRoutes> 
            </>
          }
        />
          <Route
          path="/user/leaveform"
          element={
            <>
              <PageTitle title="Apply For Leave | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><LeaveForm /></UserProtectedRoutes>
            </>
          }
        />
          <Route
          path="/user/updateprofile"
          element={
            <>
              <PageTitle title="Update Profile | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><UserUpdateProfile /></UserProtectedRoutes>
            </>
          }
        />
          <Route
          path="/user/setting"
          element={
            <>
              <PageTitle title="User Setting | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><UserSetting /></UserProtectedRoutes>
            </>
          }
        />
          <Route
          path="/user/profile"
          element={
            <>
              <PageTitle title="User Profile | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><UserProfile /></UserProtectedRoutes>
            </>
          }
        />
          <Route
          path="/user/notifications"
          element={
            <>
              <PageTitle title="User Notifications | Kris - Human Resource Management System" />
              <UserNavbar/>
              <UserProtectedRoutes><UserNotifications /></UserProtectedRoutes>
            </>
          }
        />
          <Route
          path='*'
          element={
            <>
              <PageTitle title="Error 404 | Kris - Human Resource Management System" />              
              <ErrorPage/>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
