import React, { useState, useEffect } from 'react';
import Loader from '../../common/Loader';
import axios from 'axios';
import dayjs from 'dayjs';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_URL}/auth/dashboard`,
        { withCredentials: true }
      );
      setNotifications(res.data.data[0]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!notifications) return <Loader />;

  return (
    <div className="container mx-auto p-4 pt-6">
      <h1 className="text-3xl text-black font-bold mb-4">Notifications</h1>
      <ul className="list-none mb-4 space-y-4">
        {notifications?.notifications.map((notification) => (
          <li key={notification._id} className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">{notification.message}</p>
              <p className="text-sm text-gray-500">
                {dayjs(notification.date).format('DD/MM/YYYY HH:mm')}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserNotifications;
