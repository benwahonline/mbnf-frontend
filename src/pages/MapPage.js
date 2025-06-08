import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate geocoding locations to coordinates (you would replace this with real coords in production!)
  const fakeGeocode = (location) => {
    const lookup = {
      "Kibiti, Pwani": [-7.7185, 38.9232],
      "Dar es Salaam": [-6.7924, 39.2083],
      "Mbeya": [-8.9092, 33.4608],
      "Mwanza": [-2.5164, 32.9172],
      "Morogoro": [-6.8278, 37.6591]
    };
    return lookup[location] || [-6.8, 39]; // Default fallback
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/cases`)
      .then(response => response.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cases:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading map...</p>;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Map of Missing & Abducted Persons</h1>
      <MapContainer
        center={[-6.8, 39]}
        zoom={6}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cases.map((person, index) => {
          const [lat, lng] = fakeGeocode(person.location);
          return (
            <Marker key={index} position={[lat, lng]}>
              <Popup>
                <strong>{person.name}</strong><br />
                Location: {person.location}<br />
                Status: {person.status}<br />
                Date: {person.date}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapPage;
