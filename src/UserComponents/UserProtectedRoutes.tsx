import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchEmployee } from '../features/currentEmpSlice';
import { useEffect, useState } from 'react';

const UserProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currEmp.data.data);
  const [loading, setLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchEmployee());
      setLoading(false);
    };

    if (!data) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [data, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Navigate to="/user/auth/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default UserProtectedRoutes;
