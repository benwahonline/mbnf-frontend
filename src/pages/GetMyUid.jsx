import React from "react";
import { useAuth } from "../context/AuthContext";

const GetMyUid = () => {
  const { currentUser, isAdmin, isSuperAdmin } = useAuth();

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">Get My UID</h2>
        <p className="text-gray-700">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow text-center">
      <h2 className="text-xl font-bold mb-4">Get My UID</h2>
      <p className="mb-2 text-gray-700">
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p className="mb-2 text-gray-700">
        <strong>UID:</strong> {currentUser.uid}
      </p>
      <p className="mb-2 text-gray-700">
        <strong>Is Admin:</strong> {isAdmin ? "✅ Yes" : "❌ No"}
      </p>
      <p className="mb-2 text-gray-700">
        <strong>Is Super Admin:</strong> {isSuperAdmin ? "✅ Yes" : "❌ No"}
      </p>
      <p className="text-xs text-gray-500 mt-4">
        (You can copy the UID above and paste it in your .env files)
      </p>
    </div>
  );
};

export default GetMyUid;
