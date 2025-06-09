import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import CaseList from "../components/CaseList";
import AddCaseForm from "../components/AddCaseForm";

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
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">MBNF Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            to="/stats"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Stats
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="p-6 space-y-8">
        {/* Add Case Form */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Add New Case</h2>
          <AddCaseForm />
        </section>

        {/* Cases Overview */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Cases Overview</h2>
          <CaseList />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
