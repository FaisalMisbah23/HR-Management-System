import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">404</h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
        <div className="flex justify-center space-x-4">
          <Link to="/admin/">
            <button className="inline-flex text-white bg-primary hover:hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
              Back to Admin Dashboard
            </button>
          </Link>
          <Link to="/user/">
            <button className="inline-flex text-white bg-primary hover:hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
              Back to Employee Dashboard
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
