import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminUsersList = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    try {
      const token = await currentUser.getIdToken(true); // force refresh

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
        setUsers(data);
      } else {
        const errorText = await response.text();
        setStatus(`❌ Error: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error fetching users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const handlePromote = async (uid) => {
    try {
      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/admin/setAdmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uidToMakeAdmin: uid }),
        }
      );

      if (response.ok) {
        setStatus(`✅ User ${uid} promoted to admin.`);
        fetchUsers(); // refresh user list
      } else {
        const errorText = await response.text();
        setStatus(`❌ Error: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error promoting user.");
    }
  };

  const handleDemote = async (uid) => {
    try {
      const token = await currentUser.getIdToken();

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE}/admin/removeAdmin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uidToRemoveAdmin: uid }),
        }
      );

      if (response.ok) {
        setStatus(`✅ Admin role removed for user ${uid}.`);
        fetchUsers(); // refresh user list
      } else {
        const errorText = await response.text();
        setStatus(`❌ Error: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error removing admin role.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Users List</h1>
      {status && <p className="mb-4 text-sm text-gray-700">{status}</p>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">UID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Is Admin?</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td className="border px-4 py-2">{user.uid}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 text-center">
                {user.isAdmin ? "✅ Yes" : "❌ No"}
              </td>
              <td className="border px-4 py-2 space-x-2 text-center">
                {!user.isAdmin ? (
                  <button
                    onClick={() => handlePromote(user.uid)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Promote
                  </button>
                ) : (
                  <button
                    onClick={() => handleDemote(user.uid)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Demote
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersList;
