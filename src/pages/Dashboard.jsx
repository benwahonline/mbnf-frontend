import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CaseList from "../components/CaseList";
import AddCaseForm from "../components/AddCaseForm";

const { isAdmin } = useAuth();

{isAdmin && (
  <button className="bg-green-500 text-white px-4 py-2 rounded">
    Admin Action
  </button>
)}

const Dashboard = () => {
  const { logout, isAdmin } = useAuth(); // get isAdmin from context
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
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="p-6 space-y-8">
        {/* Admin-only section */}
        {isAdmin && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Admin Panel</h2>
            <button
              onClick={() => alert("Admin action executed!")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Admin Action
            </button>
          </section>
        )}

        {/* Add Case Form (only show to admin) */}
        {isAdmin && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Add New Case</h2>
            <AddCaseForm />
          </section>
        )}

        {/* Cases Overview (visible to all logged-in users) */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Cases Overview</h2>
          <CaseList />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
