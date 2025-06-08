import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center border hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl text-blue-600 font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
