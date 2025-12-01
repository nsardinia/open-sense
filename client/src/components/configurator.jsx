import "../styles/configurator.css";
import "../../node_modules/react-grid-layout/css/styles.css";

import { useState, useEffect } from "react";
import SensorCard from "../components/sensorcard.jsx";
import GridLayout from "react-grid-layout";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebaseConfig";

export default function Configurator({ devices, onDemoNodesChange, onToggleAlarm }) {

  const [deviceName, setDeviceName] = useState("");
  const [deviceLocationLat, setDeviceLocationLat] = useState("");
  const [deviceLocationLon, setDeviceLocationLon] = useState("");
  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(1);

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // AI Chat
  const handleAISent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant. Provide environmental insights based on the sensor data.",
            },
            { role: "user", content: prompt + JSON.stringify(devices) },
          ],
          max_tokens: 200,
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // Load existing devices
  useEffect(() => {
    if (devices && devices.length > 0) {
      const initialCards = devices.map((device, index) => ({
        i: device.id,
        x: index % 2,
        y: Math.floor(index / 2),
        w: 1,
        h: 1,
        name: device.id,
        readings: device.readings,
      }));

      setCards(initialCards);
      setCounter(devices.length + 1);
    }
  }, [devices]);

  // Add new device
  const getNextGridPosition = () => {
    const count = cards.length;
    return {
      x: count % 2,
      y: Math.floor(count / 2),
    };
  };

  const addCard = () => {
    const newId = `device-${counter}`;
    const pos = getNextGridPosition();

    const newCard = {
      i: newId,
      x: pos.x,
      y: pos.y,
      w: 1,
      h: 1,
      id: deviceName || `Device ${counter}`,
      readings: { pm: 0, gas: 0, sound: 0, temp: 0, humidity: 0 },
      lat: parseFloat(deviceLocationLat) || 0.0,
      lon: parseFloat(deviceLocationLon) || 0.0,
    };

    setCards([...cards, newCard]);
    setCounter(counter + 1);

    if (onDemoNodesChange) {
      onDemoNodesChange([
        ...devices,
        {
          id: newCard.id,
          lat: newCard.lat,
          lng: newCard.lon,
          readings: newCard.readings,
        },
      ]);
    }

    setDeviceName("");
    setDeviceLocationLat("");
    setDeviceLocationLon("");
  };

  return (
    <div className="config-window">

      {/* AI Assistant Header */}
      <div className="configHeader">
        <input
          type="text"
          className="aiBar"
          placeholder="AI Assistant — Ask about environmental patterns, risks, or insights…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button className="addDeviceButton" onClick={handleAISent} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>

      {response && (
        <div className="scrolldownAreaGPT">
          <p>{response}</p>
        </div>
      )}

      {/* Cards Grid */}
      <div className="scrolldownArea">
        <GridLayout
          className="layout"
          layout={cards.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }))}
          cols={2}
          rowHeight={260}
          width={560}
          isResizable={false}
        >
          {cards.map((card) => (
            <div key={card.i}>
              <SensorCard data={card.readings} name={card.name} />
            </div>
          ))}
        </GridLayout>
      </div>

      {/* Add Device Inputs */}
      <div className="config-input-row">
        <div className="input-group">
          <label>Device Name</label>
          <input
            type="text"
            className="searchBar"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Latitude</label>
          <input
            type="text"
            className="searchBar"
            value={deviceLocationLat}
            onChange={(e) => setDeviceLocationLat(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Longitude</label>
          <input
            type="text"
            className="searchBar"
            value={deviceLocationLon}
            onChange={(e) => setDeviceLocationLon(e.target.value)}
          />
        </div>

        <button className="addDeviceButton" onClick={addCard}>
          Add Device
        </button>
      </div>
    </div>
  );
}
