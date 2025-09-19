// src/App.tsx
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const App: React.FC = () => {
  useEffect(() => {
    // Initialize map
    const map = L.map("map").setView([20.5937, 78.9629], 5);

    // Tile layers
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 19, attribution: "© OpenStreetMap contributors" }
    ).addTo(map);

    const satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Tiles © Esri" }
    );

    L.control.layers({ "Street Map": osm, Satellite: satellite }).addTo(map);

    // Random owner names
    const ownerNames = [
      "Ramesh","Suresh","Raul","Gopnath","Jabez","Arun","Vikram","Kumar","Ajay","Rahul","Manoj","Vijay"
    ];

    // States + districts
    const states = [
      {
        name: "Tamil Nadu",
        districts: [
          { name: "Chennai", base: [13.0827, 80.2707] },
          { name: "Coimbatore", base: [11.0168, 76.9558] },
          { name: "Madurai", base: [9.9252, 78.1198] },
          { name: "Salem", base: [11.6643, 78.146] },
          { name: "Erode", base: [11.341, 77.7172] }
        ]
      },
      {
        name: "Kerala",
        districts: [
          { name: "Thiruvananthapuram", base: [8.5241, 76.9366] },
          { name: "Kochi", base: [9.9312, 76.2673] },
          { name: "Kozhikode", base: [11.2588, 75.7804] },
          { name: "Thrissur", base: [10.5276, 76.2144] },
          { name: "Kollam", base: [8.8932, 76.6141] }
        ]
      },
      // Add other states similarly...
    ];

    // Generate lands
    states.forEach((state) => {
      state.districts.forEach((district) => {
        // Claimed lands (green) 15 per district
        for (let i = 0; i < 15; i++) {
          const lat = district.base[0] + (Math.random() - 0.5) * 0.05;
          const lng = district.base[1] + (Math.random() - 0.5) * 0.05;
          const owner = ownerNames[Math.floor(Math.random() * ownerNames.length)];

          L.circle([lat, lng], {
            radius: 500,
            color: "green",
            fillColor: "green",
            fillOpacity: 0.6
          }).addTo(map)
            .bindPopup(
              `<b>Owner:</b> ${owner}<br/><b>Land:</b> 3 Acres<br/><b>Place:</b> ${district.name}, ${state.name}`
            );
        }

        // Free lands (blue) 10 per district
        for (let i = 0; i < 10; i++) {
          const lat = district.base[0] + (Math.random() - 0.5) * 0.05;
          const lng = district.base[1] + (Math.random() - 0.5) * 0.05;

          L.circle([lat, lng], {
            radius: 500,
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.6
          }).addTo(map)
            .bindPopup(
              `<b>Land:</b> 3 Acres<br/><b>Place:</b> ${district.name}, ${state.name}<br/><b>Owner:</b> Free`
            );
        }
      });
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <div style={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 1000
      }}>
        <button
          onClick={() => window.location.href = "/"}
          style={{
            padding: "8px 16px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ← Back to Home
        </button>
      </div>
      <div id="map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default App;
