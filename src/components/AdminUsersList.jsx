import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminUsersList = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const token = await currentUser.getIdToken(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/admin/listUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("Error fetching users.");
    }
  };

  const setAdminClaim = async (uid, isAdmin) => {
    try {
      const token = await currentUser.getIdToken(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/admin/set-claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: uid,
          admin: isAdmin,
        }),
      });

      const text = await response.text();

      if (response.ok) {
        setMessage(`✅ ${text}`);
        fetchUsers(); // Refresh list after update
      } else {
        setMessage(`❌ ${text}`);
      }
    } catch (err) {
      console.error("Error setting admin claim:", err);
      setMessage("Error setting admin claim.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 border rounded shadow bg-white max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Admin Users List</h2>
      {message && <p className="mb-2 text-sm">{message}</p>}
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">UID</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Is Admin</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td className="border px-2 py-1 text-xs">{user.uid}</td>
              <td className="border px-2 py-1">{user.email || "N/A"}</td>
              <td className="border px-2 py-1 text-center">{user.isAdmin ? "✅" : "❌"}</td>
              <td className="border px-2 py-1 text-center">
                {user.isAdmin ? (
                  <button
                    onClick={() => setAdminClaim(user.uid, false)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => setAdminClaim(user.uid, true)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Make Admin
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