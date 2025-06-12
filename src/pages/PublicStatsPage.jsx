import React, { useEffect, useState } from "react";

const PublicStatsPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE}/public/stats`);
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Public Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.keys(stats).map((status) => (
          <div
            key={status}
            className="border rounded shadow p-4 bg-white text-center"
          >
            <h2 className="text-xl font-bold">{status}</h2>
            <p className="text-2xl">{stats[status]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicStatsPage;