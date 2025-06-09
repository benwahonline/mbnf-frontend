import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CaseList from "../components/CaseList";

const Dashboard = () => {
  const { logout } = useAuth();
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
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">MBNF Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Cases Overview</h2>
        <CaseList />
      </main>
    </div>
  );
};

export default Dashboard;
