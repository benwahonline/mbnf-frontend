import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminManagement = () => {
  const { currentUser } = useAuth();
  const [uid, setUid] = useState("");
  const [status, setStatus] = useState("");

  const handlePromote = async () => {
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
        setStatus(`✅ User ${uid} is now an admin.`);
      } else {
        const errorText = await response.text();
        setStatus(`❌ Error: ${errorText}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error promoting user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Management</h1>
      <input
        type="text"
        placeholder="User UID to promote"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />
      <button
        onClick={handlePromote}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
      >
        Promote to Admin
      </button>
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default AdminManagement;
