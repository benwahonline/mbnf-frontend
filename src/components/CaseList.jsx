import React, { useEffect, useState } from "react";
import EditCaseModal from "./EditCaseModal";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCases = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/cases`);
      const data = await response.json();
      setCases(data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleEditClick = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedCase) => {
    try {
      const token = await window.firebase.auth().currentUser.getIdToken();
      await fetch(`${process.env.REACT_APP_API_BASE}/cases/${updatedCase.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCase),
      });

      setIsModalOpen(false);
      fetchCases(); // Refresh list
    } catch (err) {
      console.error("Error updating case:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cases.map((c) => (
        <div key={c.id} className="border rounded shadow p-4 bg-white flex flex-col">
          {c.imageUrl && (
            <img
              src={c.imageUrl}
              alt={c.name}
              className="h-48 object-cover mb-2"
            />
          )}
          <h2 className="text-xl font-bold">{c.name}</h2>
          <p>Status: {c.status}</p>
          <p>Location: {c.location}</p>
          <p>Date: {c.date}</p>
          <p className="text-sm mt-2">{c.description}</p>
          <button
            onClick={() => handleEditClick(c)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      ))}

      <EditCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caseData={selectedCase}
        onSave={handleSave}
      />
    </div>
  );
};

export default CaseList;