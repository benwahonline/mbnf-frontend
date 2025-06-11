import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const CopyTokenButton = () => {
  const { currentUser } = useAuth();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleGetToken = async () => {
    try {
      const freshToken = await currentUser.getIdToken(true);
      setToken(freshToken);
      setMessage("✅ Token fetched. You can now copy it.");
    } catch (err) {
      console.error("Error getting token:", err);
      setMessage("❌ Error fetching token.");
    }
  };

  const handleCopyToken = () => {
    if (!token) {
      setMessage("❌ No token to copy. Click 'Show Token' first.");
      return;
    }
    navigator.clipboard.writeText(token).then(
      () => {
        setMessage("✅ Token copied to clipboard.");
      },
      (err) => {
        console.error("Error copying token:", err);
        setMessage("❌ Failed to copy token.");
      }
    );
  };

  return (
    <div className="p-4 border rounded shadow bg-white max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Copy Token Utility</h2>
      <button
        onClick={handleGetToken}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
      >
        Show Token
      </button>
      <button
        onClick={handleCopyToken}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Copy Token
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
      {token && (
        <textarea
          className="border mt-2 p-2 w-full text-xs"
          rows="4"
          value={token}
          readOnly
        ></textarea>
      )}
    </div>
  );
};

export default CopyTokenButton;