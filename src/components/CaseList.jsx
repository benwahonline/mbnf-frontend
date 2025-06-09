import React, { useEffect, useState } from "react";
import { fetchCases } from "../services/api";

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCases = async () => {
      try {
        const data = await fetchCases();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCases();
  }, []);

  if (loading) {
    return <p>Loading cases...</p>;
  }

  if (!cases.length) {
    return <p>No cases found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cases.map((c) => (
        <div
          key={c.id || c._id}
          className="bg-white p-4 rounded shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold mb-2">{c.name}</h3>
          <p className="text-sm text-gray-600 mb-1">Location: {c.location}</p>
          <p className="text-sm text-gray-600 mb-1">Date: {c.date}</p>
          <p className="text-sm text-gray-700">{c.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
