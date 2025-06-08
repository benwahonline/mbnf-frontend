import React from "react";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <StatsCard title="Missing Persons" value="120+" />
        <StatsCard title="Resolved Cases" value="35" />
        <StatsCard title="Ongoing Investigations" value="50" />
      </div>
    </div>
  );
};

export default Home;
