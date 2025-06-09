import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to MBNF Platform</h1>
      <p className="text-lg mb-6 text-gray-700">
        This is the Missing Persons Platform Admin Dashboard. Please log in to access the system.
      </p>
      <Link
        to="/login"
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default HomePage;
