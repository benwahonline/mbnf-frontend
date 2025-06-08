import React from 'react';
import { Link } from 'react-router-dom';
import CaseList from '../components/CaseList';


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">MBNF Admin Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
      </header>

      <nav className="flex space-x-4 mb-6">
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Cases
        </Link>
        <Link
          to="/dashboard/add-case"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Case
        </Link>
      </nav>

      <main className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Cases Overview</h2>

        {/* Placeholder for Case List */}
        <div className="border border-gray-300 rounded p-4 mb-6">
          <p className="text-gray-600">Case list will appear here (under development).</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Add New Case</h2>

        {/* Placeholder for Add Case Form */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Full name of missing person" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Date Missing</label>
            <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location Missing From</label>
            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="City / Region" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea className="w-full border border-gray-300 rounded px-3 py-2" rows="4" placeholder="Brief description, circumstances, notes"></textarea>
          </div>

          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Submit Case</button>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
