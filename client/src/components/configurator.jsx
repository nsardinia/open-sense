import "../styles/configurator.css";
import "../../node_modules/react-grid-layout/css/styles.css";
import { useState, useEffect } from "react";
import SensorCard from "../components/sensorcard.jsx";
import GridLayout from "react-grid-layout";
import axios from 'axios';
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebaseConfig"; 

export default function Configurator({ devices, onDemoNodesChange }) {

  const [deviceName, setDeviceName] = useState("");
  const [deviceLocationLat, setDeviceLocationLat] = useState("");
  const [deviceLocationLon, setDeviceLocationLon] = useState("");
  const [cards, setCards] = useState([]);
  const [counter, setCounter] = useState(1);

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleAlarm = async () => {
    const alarmRef = ref(db, "latest/alarm");

    onValue(
      alarmRef,
      (snapshot) => {
        const currentValue = snapshot.val();
        const newValue = !currentValue; 
        set(alarmRef, newValue);
      },
      {
        onlyOnce: true,
      }
    );
  }

  const handleAISent = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(prompt + JSON.stringify(devices));
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant. You will provide information and context surrounding the user's environmental data and questions." },
            { role: "user", content: prompt + JSON.stringify(devices)},
          ],
          max_tokens: 200,
        }),
      });

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (devices && devices.length > 0) {
      const initialCards = devices.map((device, index) => {
        const cols = 2;
        const x = index % cols;
        const y = Math.floor(index / cols);
        return {
          i: device.id,
          x,
          y,
          w: 1,
          h: 1,
          name: device.id,
          readings: device.readings,
        };
      });
      setCards(initialCards);
      setCounter(devices.length + 1);
    }
  }, [devices]);

  const getNextGridPosition = () => {
    const count = cards.length;
    const cols = 2;
    const x = count % cols;
    const y = Math.floor(count / cols);
    return { x, y };
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
      readings: { pm: 1000, gas: 0, sound: 0, temp: 0, humidity: 0 },
      lat: parseFloat(deviceLocationLat) || 0.0,
      lon: parseFloat(deviceLocationLon) || 0.0,
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    setCounter(counter + 1);
    setDeviceName("");
    setDeviceLocationLon(0);
    setDeviceLocationLat(0);

    if (onDemoNodesChange) {
      const newDevice = {
        id: newCard.id,
        lat: newCard.lat, 
        lng: newCard.lon,
        readings: newCard.readings,
      };
      onDemoNodesChange([...devices, newDevice]);
    }
  };  

  return (
    <div>
      <div>
        <div className="configHeader">
        <input
          type="text"
          className="searchBar"
          placeholder="Ask about the data . . ."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="addDeviceButton" onClick={handleAISent} disabled={loading}>
          {loading ? "Thinking . . ." : "Send"}
        </button>
        </div>

        {response && (
        <div className="scrolldownAreaGPT">
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <p>{response}</p>
        </div>
        </div>
        )}
      </div>

      <div className="scrolldownArea">
        <GridLayout
          className="layout"
          layout={cards.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }))}
          cols={2}
          rowHeight={260}
          width={560}
          onLayoutChange={(newLayout) => {
            setCards((prev) =>
              prev.map((card) => {
                const updated = newLayout.find((l) => l.i === card.i);
                return updated ? { ...card, ...updated } : card;
              })
            );
          }}
          bounded={true}
          isResizable={false}
        >
          {cards.map((card) => (
            <div key={card.i}>
              <SensorCard data={card.readings} name={card.name} />
            </div>
          ))}
        </GridLayout>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "50px",
        }}
      >
        <input
          type="text"
          placeholder="Device name"
          className="searchBar"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          className="searchBar"
          value={deviceLocationLat}
          onChange={(e) => setDeviceLocationLat(e.target.value)}
        />
       <input
          type="text"
          placeholder="Longitude"
          className="searchBar"
          value={deviceLocationLon}
          onChange={(e) => setDeviceLocationLon(e.target.value)}
        />
        <button className="addDeviceButton" onClick={addCard}> Add Device </button>
        <button onClick={() => toggleAlarm()} className="addDeviceButton"> Toggle Alarm</button>
      </div>
    </div>
  );
}

