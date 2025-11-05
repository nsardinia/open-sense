import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MAPTILER_KEY = "o1YucdjzVonMBIYtE4G5";

// mock data
const sensors = [
  { lng: -82.349, lat: 29.646, intensity: 0.8 }, // SW Rec
  { lng: -82.324, lat: 29.651, intensity: 0.5 }, // Downtown
  { lng: -82.336, lat: 29.648, intensity: 0.3 }, // Midtown
  { lng: -82.304, lat: 29.653, intensity: 0.6 }, // East Campus
  { lng: -82.341, lat: 29.644, intensity: 0.9 }, // UF South
];

export default function Heatmap() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // prevent reinitialization
    maptilersdk.config.apiKey = MAPTILER_KEY;

    // initialize the map
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [-82.3248, 29.6516],
      zoom: 13,
    });

    // create GeoJSON from sensors
    const geojson = {
      type: "FeatureCollection",
      features: sensors.map((s) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [s.lng, s.lat],
        },
        properties: {
          intensity: s.intensity,
        },
      })),
    };

    // add source and heatmap layer
    map.current.on("load", () => {
      map.current.addSource("heatmap-source", {
        type: "geojson",
        data: geojson,
      });

      map.current.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "heatmap-source",
        maxzoom: 18,
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "intensity"], 0, 0, 1, 1],
          "heatmap-intensity": 1,
          "heatmap-radius": 30,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(103,169,207)",
            0.4, "rgb(209,229,240)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            1, "rgb(178,24,43)"
          ],
        },
      });
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        height: "80vh",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
}
