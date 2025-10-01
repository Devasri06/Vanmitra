//fra-atlas

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./FraAtlas.css";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Point,
} from "geojson";

declare global {
  interface Window {
    myFRAMap?: {
      loadGeoJson: (force?: boolean) => void;
    };
  }
}

type FRAMapProps = {
  initialCoordinates?: string;
};

const FRAMap: React.FC<FRAMapProps> = ({ initialCoordinates }) => {
  const [previewMarker, setPreviewMarker] = useState<L.CircleMarker | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const geoLayerRef = useRef<L.GeoJSON<any> | null>(null);
  const loadingRef = useRef(false);

  // ✅ Initialize map
  useEffect(() => {
    const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    });

    const esriImagery = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Imagery © Esri" }
    );

    const esriLabels = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { maxZoom: 19, attribution: "Labels © Esri" }
    );

    const esriHybrid = L.layerGroup([esriImagery, esriLabels]);

    const mapInstance = L.map("map", {
      center: [20.5937, 78.9629],
      zoom: 5,
      layers: [esriHybrid],
    });

    L.control.layers(
      { OpenStreetMap: osm, "Esri Satellite Hybrid": esriHybrid },
      {}
    ).addTo(mapInstance);

    mapRef.current = mapInstance;

    // ✅ create persistent empty geoLayer
    geoLayerRef.current = L.geoJSON(undefined, {
      pointToLayer: (_feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 6,
          fillColor: "blue",
          color: "#333",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.7,
        }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};
        let coords: [number, number] | null = null;

        if (feature.geometry?.type === "Point") {
          coords = feature.geometry.coordinates as [number, number];
        }

        const popupContent = `
          <div class="popup-card">
            <h4>${props.District || "Unknown"}, ${props.State || ""}</h4>
            <p>👤 <b>Patta Holder:</b> ${props.Name || "N/A"}</p>
            <p>🌾 <b>Land Area:</b> ${props.LandArea || "N/A"}</p>
            <p>Status: 
              <span class="status ${props.Status === "Approved" ? "approved" : "pending"}">
                ${props.Status || "Approved"}
              </span>
            </p>
            <p>📍 <b>Location:</b> 
              ${coords ? `${coords[1].toFixed(4)}, ${coords[0].toFixed(4)}` : ""}
            </p>
            <button class="popup-btn">View Detailed Analysis</button>
          </div>
        `;
        layer.bindPopup(popupContent);
      },
    }).addTo(mapInstance);

    loadGeoJson();

    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 500);

    return () => {
      mapInstance.remove();
    };
  }, []);

  // ✅ Load GeoJSON (no flicker)
  const loadGeoJson = async (force = false) => {
    const mapInstance = mapRef.current;
    if (!mapInstance || loadingRef.current || !geoLayerRef.current) return;

    loadingRef.current = true;

    let data: FeatureCollection<Geometry, GeoJsonProperties> | null = null;

    if (!force) {
      const cached = localStorage.getItem("geojson");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const cleanedFeatures =
            parsed.features?.filter((f: any) => f.geometry && f.geometry.type !== "None") || [];

          data = { type: "FeatureCollection", features: cleanedFeatures };
          geoLayerRef.current.clearLayers();
          geoLayerRef.current.addData(data);
          console.log("⚡ Loaded GeoJSON from cache");
        } catch (err) {
          console.warn("❌ Failed to parse cached geojson:", err);
        }
      }
    }

    if (force || !data) {
      try {
        const res = await fetch("http://localhost:8000/geojson", { cache: "no-store" });
        const parsed = await res.json();
        const cleanedFeatures =
          parsed.features?.filter((f: any) => f.geometry && f.geometry.type !== "None") || [];

        const fresh: FeatureCollection<Geometry, GeoJsonProperties> = {
          type: "FeatureCollection",
          features: cleanedFeatures,
        };

        localStorage.setItem("geojson", JSON.stringify(fresh));
        geoLayerRef.current.clearLayers();
        geoLayerRef.current.addData(fresh);

        console.log("✅ Refreshed GeoJSON from backend");
      } catch (err) {
        console.error("❌ Failed to fetch geojson:", err);
      }
    }

    loadingRef.current = false;
  };

  // ✅ Expose refresh
  useEffect(() => {
    if (!mapRef.current) return;
    window.myFRAMap = { loadGeoJson };
    return () => {
      delete window.myFRAMap;
    };
  }, []);

  // ✅ Handle preview + finalize
  useEffect(() => {
  if (!mapRef.current) return;
  const map = mapRef.current;

  const previewHandler = (e: any) => {
    const { lat, lng } = e.detail;
    console.log("📍 Preview event:", lat, lng);

    if (previewMarker) map.removeLayer(previewMarker);

    const newMarker = L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: "red",
      color: "#900",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    })
      .addTo(map)
      .bindPopup("📍 Preview Location (not saved yet)")
      .openPopup();

    setPreviewMarker(newMarker);
    map.setView([lat, lng], 12);
  };

  const refreshHandler = () => {
    console.log("🔄 Refreshing GeoJSON via button/event...");
    loadGeoJson(true);
  };

  const finalizeHandler = async () => {
    console.log("🔥 Finalize handler triggered");

    if (previewMarker && mapRef.current) {
      const { lat, lng } = previewMarker.getLatLng();

      // ✅ Optimistically add blue feature
      const newFeature: Feature<Point> = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [lng, lat] },
        properties: { Name: "New", Status: "Pending" },
      };

      if (geoLayerRef.current) {
        geoLayerRef.current.addData(newFeature);
        console.log("📍 Optimistically added to map:", lat, lng);
      }

      mapRef.current.removeLayer(previewMarker);
      setPreviewMarker(null);

      try {
        await fetch("http://localhost:8000/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFeature),
        });

        await loadGeoJson(true); // ✅ sync with backend
      } catch (err) {
        console.error("❌ Failed to save feature:", err);
      }
    }
  };

  // ✅ Add custom refresh button control
  const RefreshControl = L.Control.extend({
    options: { position: "topright" },
    onAdd: () => {
      const btn = L.DomUtil.create("button", "refresh-btn");
      btn.innerHTML = "⟳";
      btn.title = "Refresh Data";

      L.DomEvent.on(btn, "click", (e: any) => {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        window.dispatchEvent(new Event("refresh-geojson"));
      });

      return btn;
    },
  });

  const refreshControl = new RefreshControl();
  map.addControl(refreshControl);

  // ✅ Wire event listeners
  window.addEventListener("show-scanned-location", previewHandler);
  window.addEventListener("refresh-geojson", refreshHandler);
  window.addEventListener("finalize-scanned-location", finalizeHandler);

  // ✅ Initial coordinates preview if provided
  if (initialCoordinates) {
    const [lat, lon] = initialCoordinates.split(",").map(Number);
    previewHandler({ detail: { lat, lng: lon } });
  }

  return () => {
    window.removeEventListener("show-scanned-location", previewHandler);
    window.removeEventListener("refresh-geojson", refreshHandler);
    window.removeEventListener("finalize-scanned-location", finalizeHandler);
    map.removeControl(refreshControl);
  };
}, [previewMarker, initialCoordinates]);


  return <div id="map" className="w-full h-full" />;
};

export default FRAMap;
