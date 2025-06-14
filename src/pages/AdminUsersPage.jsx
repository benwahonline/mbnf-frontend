
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/users`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers(response.data);
      } catch (error) {
        setMessage("Error fetching admin users");
      }
    };

    fetchAdminUsers();
  }, []);

  const revokeAdmin = async (uid) => {
    try {
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/revoke`,
        { uid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prev) => prev.filter((user) => user.uid !== uid));
      setMessage("Admin rights revoked successfully.");
    } catch (error) {
      setMessage("Error revoking admin rights");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Users</h2>
      {message && <p className="text-sm text-red-600">{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.uid} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{user.email}</span>
              <button
                onClick={() => revokeAdmin(user.uid)}
                className="px-3 py-1 text-white bg-red-600 rounded"
              >
                Revoke Admin
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
