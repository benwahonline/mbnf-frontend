import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminDashboardSummary = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    normalUsers: 0,
  });
  const [status, setStatus] = useState("");

  const fetchStats = async () => {
    try {
      const token = await currentUser.getIdToken(true);

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/admin/listUsers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const totalUsers = data.length;
        const adminUsers = data.filter((user) => user.isAdmin).length;
        const normalUsers = totalUsers - adminUsers;

        setStats({
          totalUsers,
          adminUsers,
          normalUsers,
        });
      } else {
        const errorText = await response.text();
        setStatus(`❌ Error: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error fetching stats.");
    }
  };

  useEffect(() => {
    fetchStats();
  }, [currentUser]);

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard Summary</h2>
      {status && <p className="mb-4 text-sm text-gray-700">{status}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl text-blue-600 font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Admin Users</h3>
          <p className="text-3xl text-green-600 font-bold">{stats.adminUsers}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Normal Users</h3>
          <p className="text-3xl text-gray-600 font-bold">{stats.normalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSummary;
