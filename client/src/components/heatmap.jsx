import React, { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MAPTILER_KEY = "o1YucdjzVonMBIYtE4G5";

// mock data
const sensors = [
  // { lng: -82.349, lat: 29.646, intensity: 0.8 }, // SW Rec
  // { lng: -82.324, lat: 29.651, intensity: 0.5 }, // Downtown
  // { lng: -82.336, lat: 29.648, intensity: 0.3 }, // Midtown
  // { lng: -82.304, lat: 29.653, intensity: 0.6 }, // East Campus
  // { lng: -82.341, lat: 29.644, intensity: 0.9 }, // UF South

  // FOR DEMO ONLY 
  { lng: -82.343939, lat: 29.647993, intensity: 0.6 }, // Marston Basement type
  { lng: -82.344561, lat: 29.648378, intensity: 1.5 }, // Dungeon
  { lng: -82.347768, lat: 29.644067, intensity: 0.2 }, // Malachowsky
  { lng: -82.348868, lat: 29.649853, intensity: 1 }, // The Swamp

];

function normalize(value, min, max) {
  if (value == null || isNaN(value)) return 0; // safety check
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

export default function Heatmap({ sensorData }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // normalized readings for each sensor
  const pmNorm = normalize(sensorData?.pm, 0, 200);
  const soundNorm = normalize(sensorData?.sound, 60, 90);
  const tempNorm = normalize(sensorData?.temp, 70, 100);
  const humidityNorm = normalize(sensorData?.humidity, 45, 90);
  const gasNorm = normalize(sensorData?.gas, 400, 2000);

  // where pm and gas are a little more important in intensity
  const totalIntensity = (2.5 * pmNorm + 2.0 * gasNorm + 1.25 * soundNorm + 0.75 * tempNorm + 0.5 * humidityNorm) / 7.0;

  useEffect(() => {
    if (map.current) return; // prevent reinitialization
    maptilersdk.config.apiKey = MAPTILER_KEY;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [-82.3248, 29.6516],
      zoom: 13,
    });

    const geojson = {
      type: "FeatureCollection",
      features: sensors.map((s) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [s.lng, s.lat] },
        properties: { intensity: s.intensity },
      })),
    };

    map.current.on("load", () => {
      map.current.addSource("heatmap-source", { type: "geojson", data: geojson });

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
            0.4, "rgba(77, 15, 248, 1)",
            0.6, "rgba(237, 102, 24, 1)",
            0.8, "rgba(241, 95, 37, 1)",
            1, "rgb(178,24,43)"
          ],
        },
      });
    });
  }, []);

// this use-effect heatmap to update live everytime sensor data changes in firebase
useEffect(() => {
  if (!map.current || !sensorData) return;

  const newPoint = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [sensorData.longitude, sensorData.latitude],
    },
    properties: { intensity: totalIntensity },
  };

  const updateHeatmap = () => {
    const source = map.current.getSource("heatmap-source");
    if (!source) return;

    const existingData = source._data || { type: "FeatureCollection", features: [] }; // need to have existing features
    const baseFeatures = existingData.features.filter(f => !f.properties.isLive); // remove any previous "live" point so they don't build
    const updatedData = {  
      type: "FeatureCollection",
      features: [
        ...baseFeatures,
        { ...newPoint, properties: { ...newPoint.properties, isLive: true } }, // adds the latest reading as a single live point
      ],
    };

    source.setData(updatedData);
  };

  if (map.current.isStyleLoaded()) {
    updateHeatmap();
  } else {
    map.current.once("load", updateHeatmap);
  }
}, [sensorData, totalIntensity]);


  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {sensorData && (   // this is the overlay box top left, can maybe make a component
        <div
          style={{
            position: "absolute",
            top: "2%",
            left: "2%",
            zIndex: 2,
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "12px",
            padding: "12px 18px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            color: "#000",
            maxWidth: "250px",
            fontFamily: "sans-serif",
          }}
        >
          <h4 style={{ marginBottom: "6px", fontWeight: "600" }}>
            Latest Sensor Readings
          </h4>
          <p>PM: {sensorData.pm ?? "N/A"}</p>
          <p>Gas: {sensorData.gas ?? "N/A"}</p>
          <p>Sound: {sensorData.sound ?? "N/A"}</p>
          <p>Temp: {sensorData.temp ?? "N/A"}</p>
          <p>Humidity: {sensorData.humidity ?? "N/A"}</p>
        </div>
      )}
    </div>
  );
}
