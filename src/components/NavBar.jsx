import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow mb-6">
      <div className="flex space-x-4">
        <Link to="/" className="text-blue-600 font-bold text-lg">
          MBNF Platform
        </Link>
        {currentUser && (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/stats" className="text-gray-700 hover:text-blue-600">
              Stats
            </Link>
          </>
        )}
      </div>
      <div>
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
