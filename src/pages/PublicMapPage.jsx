import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PublicMapPage = () => {
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
      <h1 className="text-3xl font-bold mb-4">Incidents Map</h1>
      <MapContainer center={[-6.7924, 39.2083]} zoom={6} style={{ height: "600px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cases
          .filter((c) => c.geo && c.geo.lat && c.geo.lng)
          .map((c) => (
            <Marker key={c.id} position={[c.geo.lat, c.geo.lng]}>
              <Popup>
                <h2 className="text-lg font-bold">{c.name}</h2>
                <p>Status: {c.status}</p>
                <p>Location: {c.location}</p>
                <p>Date: {c.date}</p>
                {c.imageUrl && (
                  <img src={c.imageUrl} alt={c.name} className="mt-2 h-32 object-cover" />
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default PublicMapPage;