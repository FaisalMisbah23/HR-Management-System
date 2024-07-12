import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchHR } from './features/getCurrHrSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const  [loading,setLoading]=useState(true)
  const data = useSelector((state) => state.currHR.data.data);
  let location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchHR());
      setLoading(false)
    };

    if (!data) {
      fetchData();
    } else {
      setLoading(false)
    }
  }, [data, dispatch]);

  if(loading){
    return null
  }


  if (!data) {
    return <Navigate to="/admin/auth/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
