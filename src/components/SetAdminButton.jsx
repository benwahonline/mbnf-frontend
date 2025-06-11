import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SetAdminButton = () => {
  const { currentUser } = useAuth();
  const [uid, setUid] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const handleSetAdmin = async () => {
    try {
      const token = await currentUser.getIdToken(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/admin/set-claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid, admin: isAdmin }),
      });
      const text = await response.text();
      if (response.ok) {
        setMessage(`✅ ${text}`);
      } else {
        setMessage(`❌ ${text}`);
      }
    } catch (err) {
      console.error("Error setting admin claim:", err);
      setMessage("❌ Error setting admin claim.");
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Set Admin Claim</h2>
      <input
        type="text"
        placeholder="Enter User UID"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <div className="mb-2">
        <label className="mr-2">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <span className="ml-2">Make Admin</span>
        </label>
      </div>
      <button
        onClick={handleSetAdmin}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Set Admin
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default SetAdminButton;