import React, { useEffect, useState } from "react";

const PublicCasesPage = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE}/public/cases`);
        const data = await response.json();
        setCases(data);
      } catch (err) {
        console.error("Error fetching cases:", err);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Public Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cases.map((c) => (
          <div
            key={c.id}
            className="border rounded shadow p-4 bg-white flex flex-col"
          >
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicCasesPage;