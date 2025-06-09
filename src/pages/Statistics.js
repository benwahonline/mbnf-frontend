import React, { useEffect, useState } from "react";
import { fetchStats } from "../services/api";

const Statistics = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p>Loading statistics...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Case Statistics</h2>
      {Object.keys(stats).length === 0 ? (
        <p>No statistics available.</p>
      ) : (
        <ul>
          {Object.entries(stats).map(([status, count]) => (
            <li key={status} className="mb-2">
              <span className="font-semibold">{status}:</span> {count}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Statistics;
