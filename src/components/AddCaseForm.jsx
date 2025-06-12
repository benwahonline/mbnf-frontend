import React, { useState } from "react";
import { addCase } from "../services/api";
import { useAuth } from "../context/AuthContext";

const AddCaseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    status: "Missing",
  });

  const { currentUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get Firebase token
      const token = currentUser && (await currentUser.getIdToken());

      await addCase(formData, token);

      alert("Case added successfully!");
      setFormData({
        name: "",
        location: "",
        date: "",
        description: "",
        status: "Missing",
      });
    } catch (error) {
      console.error("Error adding case:", error);
      alert("Failed to add case.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full border p-2 rounded"
      />
      <input
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full border p-2 rounded"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="Missing">Missing</option>
        <option value="Found">Found</option>
        <option value="Abducted">Abducted</option>
        <option value="Re-abducted">Re-abducted</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Case
      </button>
    </form>
  );
};

export default AddCaseForm;