import React, { useEffect, useRef, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import ReactDOM from "react-dom/client"
import SensorCard from "./sensorcard"

const MAPTILER_KEY = "o1YucdjzVonMBIYtE4G5"

function normalize(value, min, max) {
  if (value == null || isNaN(value)) return 0 // safety check
  return Math.min(1, Math.max(0, (value - min) / (max - min)))
}

// where pm and gas are a little more important in intensity
function calculateIntensity(readings) {
  const pmNorm = normalize(readings?.pm, 0, 200)
  const soundNorm = normalize(readings?.sound, 60, 90)
  const tempNorm = normalize(readings?.temp, 70, 100)
  const humidityNorm = normalize(readings?.humidity, 45, 90)
  const gasNorm = normalize(readings?.gas, 400, 2000)

  return (
    (2.5 * pmNorm +
      2.0 * gasNorm +
      1.25 * soundNorm +
      0.75 * tempNorm +
      0.5 * humidityNorm) /
    7.0
  )
}

export default function Heatmap({ sensorData, devices}) {
  const mapContainer = useRef(null)
  const map = useRef(null)


  // converting the single real ESP into a node (same format as fake ones)
  const liveNode = sensorData
    ? {
        id: "live-node",
        lat: sensorData.latitude,
        lng: sensorData.longitude,
        readings: {
          pm: sensorData.pm,
          gas: sensorData.gas,
          sound: sensorData.sound,
          temp: sensorData.temp,
          humidity: sensorData.humidity,
        },
      }
    : null

  // combining fake + real nodes so they all behave the same
  const nodes = liveNode ? [...devices, liveNode] : devices 

  useEffect(() => {
    console.log(devices)
    if (!map.current) {

      maptilersdk.config.apiKey = MAPTILER_KEY

      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [-82.3248, 29.6516],
        zoom: 13,
      })
    }

    // converting nodes into geojson features for maptiler
    const geojson = {
      type: "FeatureCollection",
      features: nodes.map((node) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [node.lng, node.lat],
        },
        properties: {
        id: node.id,
        intensity: calculateIntensity(node.readings),

        // this is what the popup will use
        pm: node.readings.pm,
        gas: node.readings.gas,
        sound: node.readings.sound,
        temp: node.readings.temp,
        humidity: node.readings.humidity,
        },
      })),
    }

    map.current.on("load", () => {
    if (map.current.getSource("heatmap-source")) {
        map.current.getSource("heatmap-source").setData(geojson);
    } else { 
        map.current.addSource("heatmap-source", {
          type: "geojson",
          data: geojson,
        })


      // actual heatmap layer
      map.current.addLayer({
        id: "heatmap-layer",
        type: "heatmap",
        source: "heatmap-source",
        maxzoom: 18,
        paint: {
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0,
            0,
            1,
            1,
          ],
          "heatmap-intensity": 1,
          "heatmap-radius": 30,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgba(77, 15, 248, 1)",
            0.6,
            "rgba(237, 102, 24, 1)",
            0.8,
            "rgba(241, 95, 37, 1)",
            1,
            "rgb(178,24,43)",
          ],
        },
      })

      // invisible layer just for detecting hover
      map.current.addLayer({
        id: "sensor-points",
        type: "circle",
        source: "heatmap-source",
        paint: {
          "circle-radius": 10,
          "circle-opacity": 0,
        },
      })
          
      
        const popup = new maptilersdk.Popup({
          closeButton: false,
          closeOnClick: false,
        })

    
    
      // when someone hovers on a point, show the card
      map.current.on("mouseenter", "sensor-points", (e) => {
      map.current.getCanvas().style.cursor = "pointer"

      const coordinates = e.features[0].geometry.coordinates.slice()
      const props = e.features[0].properties

      const readings = {
        pm: Number(props.pm),
        gas: Number(props.gas),
        sound: Number(props.sound),
        temp: Number(props.temp),
        humidity: Number(props.humidity),
      }

      const container = document.createElement("div")
      const root = ReactDOM.createRoot(container)


      root.render(<SensorCard data={readings} />)
      popup.setLngLat(coordinates).setDOMContent(container).addTo(map.current)
    })
  }

      map.current.on("mouseleave", "sensor-points", () => {
        map.current.getCanvas().style.cursor = ""
        popup.remove()
      })
    })
  }, [sensorData])

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* overlay panel - just for quick testing + debugging */}
      {sensorData && (
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
            latest sensor readings
          </h4>
          <p>pm: {sensorData.pm ?? "n/a"}</p>
          <p>gas: {sensorData.gas ?? "n/a"}</p>
          <p>sound: {sensorData.sound ?? "n/a"}</p>
          <p>temp: {sensorData.temp ?? "n/a"}</p>
          <p>humidity: {sensorData.humidity ?? "n/a"}</p>
        </div>
      )}
    </div>
  )
}
