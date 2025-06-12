import React, { useState, useEffect } from "react";

const EditCaseModal = ({ isOpen, onClose, caseData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(caseData || {});
  }, [caseData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Case</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select status</option>
            <option value="Missing">Missing</option>
            <option value="Found">Found</option>
            <option value="Abducted">Abducted</option>
            <option value="Re-abducted">Re-abducted</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            placeholder="Date"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="geo.lat"
            value={formData?.geo?.lat || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                geo: { ...(prev.geo || {}), lat: e.target.value },
              }))
            }
            placeholder="Geo.lat"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="geo.lng"
            value={formData?.geo?.lng || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                geo: { ...(prev.geo || {}), lng: e.target.value },
              }))
            }
            placeholder="Geo.lng"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCaseModal;