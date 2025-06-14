
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCaseModal from "./EditCaseModal";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 10;

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get("/api/cases");
        setCases(response.data);
        setFilteredCases(response.data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };
    fetchCases();
  }, []);

  useEffect(() => {
    const filtered = cases.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCases(filtered);
    setCurrentPage(1);
  }, [search, cases]);

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or location"
          className="border p-2 rounded w-1/2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            const csv = [Object.keys(cases[0] || {}).join(",")];
            cases.forEach(row =>
              csv.push(Object.values(row).join(","))
            );
            const blob = new Blob([csv.join("\n")], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cases.csv";
            a.click();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
        >
          Export to CSV
        </button>
      </div>

      {currentCases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <ul className="space-y-4">
          {currentCases.map(c => (
            <li key={c.id} className="border rounded p-4 shadow">
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p>Status: {c.status}</p>
              <p>Location: {c.location}</p>
              <p>Date: {c.date}</p>
              <button
                onClick={() => setSelectedCase(c)}
                className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedCase && (
        <EditCaseModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdate={(updatedCase) => {
            const updated = cases.map(c => c.id === updatedCase.id ? updatedCase : c);
            setCases(updated);
          }}
        />
      )}
    </div>
  );
};

export default CaseList;
