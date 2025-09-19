import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./FraAtlas.css"; // custom popup styling

const FraAtlas: React.FC = () => {
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5);

    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const satellite = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Imagery © Esri" }
    );

    const labels = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Labels © Esri" }
    );

    const satelliteWithLabels = L.layerGroup([satellite, labels]);

    L.control.layers({ "Street Map": osm, Satellite: satelliteWithLabels }).addTo(map);

    const ownerNames = [
      "Ramesh","Suresh","Raul","Gopnath","Jabez","Arun",
      "Vikram","Kumar","Ajay","Rahul","Manoj","Vijay"
    ];

    const states = [
      {
        name: "Kerala",
        districts: [
          { name: "Thiruvananthapuram", base: [8.5241, 76.9366] },
          { name: "Kochi", base: [9.9312, 76.2673] },
        ],
      },
    ];

    states.forEach((state) => {
      state.districts.forEach((district) => {
        // Claimed lands (green)
        for (let i = 0; i < 5; i++) {
          const lat = district.base[0] + (Math.random() - 0.5) * 0.05;
          const lng = district.base[1] + (Math.random() - 0.5) * 0.05;
          const owner = ownerNames[Math.floor(Math.random() * ownerNames.length)];

          L.circle([lat, lng], {
            radius: 500,
            color: "green",
            fillColor: "green",
            fillOpacity: 0.6,
          })
            .addTo(map)
            .bindPopup(
              `
              <div class="popup-card">
                <h4>${district.name}, ${state.name}</h4>
                <p><b>👤 Patta Holder:</b> ${owner}</p>
                <p><b>🌾 Land Area:</b> 3 Acres</p>
                <p><b>Status:</b> <span class="status approved">Approved</span></p>
                <p><b>📍 Location:</b> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
                <button class="popup-btn">View Detailed Analysis</button>
              </div>
              `
            );
        }

        // Free lands (blue)
        for (let i = 0; i < 3; i++) {
          const lat = district.base[0] + (Math.random() - 0.5) * 0.05;
          const lng = district.base[1] + (Math.random() - 0.5) * 0.05;

          L.circle([lat, lng], {
            radius: 500,
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.6,
          })
            .addTo(map)
            .bindPopup(
              `
              <div class="popup-card">
                <h4>${district.name}, ${state.name}</h4>
                <p><b>👤 Patta Holder:</b> Free</p>
                <p><b>🌾 Land Area:</b> 3 Acres</p>
                <p><b>Status:</b> <span class="status pending">Pending</span></p>
                <p><b>📍 Location:</b> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
                <button class="popup-btn">Claim This Land</button>
              </div>
              `
            );
        }
      });
    });
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default FraAtlas;
