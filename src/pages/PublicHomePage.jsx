import React from "react";
import { Link } from "react-router-dom";

const PublicHomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        MBNF Public Portal
      </h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        Browse cases of missing persons, abductions, and other related incidents.
        View statistics and see incidents mapped geographically.
      </p>
      <div className="space-x-4">
        <Link
          to="/public/cases"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Browse Cases
        </Link>
        <Link
          to="/public/stats"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Stats
        </Link>
        <Link
          to="/public/map"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          View Map
        </Link>
      </div>
    </div>
  );
};

export default PublicHomePage;