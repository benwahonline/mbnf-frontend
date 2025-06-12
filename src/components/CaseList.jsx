import React, { useEffect, useState } from "react";
import EditCaseModal from "./EditCaseModal";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCases = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/cases`);
      const data = await response.json();
      setCases(data);
      setFilteredCases(data);
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

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = cases.filter(
      (c) =>
        c.name?.toLowerCase().includes(term) ||
        c.location?.toLowerCase().includes(term)
    );
    setFilteredCases(filtered);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search cases by name or location"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCases.map((c) => (
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
    </div>
  );
};

export default CaseList;