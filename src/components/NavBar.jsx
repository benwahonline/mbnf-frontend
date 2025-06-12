import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  const isSuperAdmin =
    isAdmin && currentUser?.uid === process.env.REACT_APP_SUPER_ADMIN_UID;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow mb-6">
      <div className="flex space-x-4">
        <Link to="/" className="text-blue-600 font-bold text-lg">
          MBNF Platform
        </Link>
        <Link to="/public/cases" className="text-gray-700 hover:text-blue-600">
          Browse Cases
        </Link>
        <Link to="/public/stats" className="text-gray-700 hover:text-blue-600">
          View Stats
        </Link>
        <Link to="/public/map" className="text-gray-700 hover:text-blue-600">
          View Map
        </Link>
        {currentUser && (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/stats" className="text-gray-700 hover:text-blue-600">
              Stats
            </Link>
            {isSuperAdmin && (
              <>
                <Link
                  to="/admin-users"
                  className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>Admin Users</span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Super Admin
                  </span>
                </Link>
                <Link
                  to="/admin-management"
                  className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
                >
                  <span>Admin Management</span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Super Admin
                  </span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-end space-y-2">
        {currentUser ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
            <div className="text-xs text-gray-600 mt-2">
              Logged in UID: {currentUser.uid}
            </div>
          </>
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