//assts-map
import React from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  Circle,
  Polygon,
  FeatureGroup,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

const defaultCenter: [number, number] = [23.3441, 85.3096];
const defaultZoom = 13;

const FraAtlas: React.FC = () => {
  const navigate = useNavigate();

  const waterBodyPolygon: [number, number][] = [
    [23.3510579, 85.2963536],
    [23.3512722, 85.2964823],
    [23.3516539, 85.296536],
    [23.3517967, 85.2965789],
    [23.3519272, 85.2966245],
    [23.3518656, 85.29689],
    [23.3518139, 85.2971609],
    [23.3517918, 85.2973916],
    [23.3517622, 85.2976142],
    [23.3515771, 85.297573],
    [23.3511047, 85.297464],
    [23.350691, 85.2973782],
    [23.3507156, 85.2972602],
    [23.3506713, 85.2971341],
    [23.350691, 85.2970107],
    [23.3507322, 85.296956],
    [23.3507058, 85.2968042],
    [23.3507944, 85.2966164],
    [23.3509126, 85.2964501],
    [23.3510579, 85.2963536],
  ];

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Map */}
      <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: "100%", width: "100%" }}>
        {/* Layer control */}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Esri Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Marker */}
        <Marker position={defaultCenter}>
          <Popup>
            <b>Analysis Center</b>
            <br />
            FRA Suitability: Medium
          </Popup>
        </Marker>

        {/* Circle */}
        <Circle center={defaultCenter} radius={2000} pathOptions={{ color: "red", fillOpacity: 0.1 }}>
          <Popup>Analysis Area (2 km radius)</Popup>
        </Circle>

        {/* Example Polygon */}
        <FeatureGroup>
          <Polygon positions={waterBodyPolygon} pathOptions={{ color: "#1E90FF", fillOpacity: 0.6 }}>
            <Popup>Water Body: Argora Pond</Popup>
          </Polygon>
        </FeatureGroup>
      </MapContainer>

      {/* Back to Home button (overlayed) */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "8px 12px",
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default FraAtlas;
