import React, { useEffect, useState } from 'react';

const Gallery = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/cases`)
      .then(response => response.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cases:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading cases...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Missing & Abducted Persons Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cases.map((person, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <div className="h-48 bg-gray-200 flex items-center justify-center mb-4">
			
			{person.image ? (
				<img src={person.image} alt={person.name} className="h-48 w-full object-cover mb-4 rounded" />
				) : (
				<div className="h-48 bg-gray-200 flex items-center justify-center mb-4">
				<span className="text-6xl">🕵️‍♂️</span>
				</div>
				)}

              {/* Optional: replace with real image if you add image URLs */}
              <span className="text-6xl">🕵️‍♂️</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
            <p className="text-gray-700"><strong>Location:</strong> {person.location}</p>
            <p className="text-gray-700"><strong>Date Missing:</strong> {person.date}</p>
            <p className="text-gray-700"><strong>Status:</strong> {person.status}</p>
            {person.details && (
              <p className="text-sm text-gray-600 mt-2">{person.details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
