import { useState, useEffect, useRef } from "react";
import "../styles/alertspanel.css";

/* 
  get a readable location name from lat + long
  ex: "Marston Science Library" instead of just numbers
*/
async function getLocationFromCoords(lat, lng) {
  try {
    const res = await fetch(
      `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=o1YucdjzVonMBIYtE4G5`
    );

    const data = await res.json();

    if (data.features && data.features.length > 0) {
      return data.features[0].text; // main place name
    }

    return "your area";
  } catch (err) {
    console.error("location error:", err);
    return "your area";
  }
}

/*
  each rule has:
  - key = which sensor value to watch
  - threshold = when it becomes unsafe
  - type = color for the alert
  - message = when unsafe
  - resolved = when it becomes safe again
*/
const alertRules = [
  {
    key: "sound",
    type: "danger",
    threshold: 90,
    message: "Unsafe noise levels detected",
    resolved: "Noise levels are back to normal",
  },
  {
    key: "pm",
    type: "warning",
    threshold: 120,
    message: "High particulate matter detected",
    resolved: "Air quality has stabilized",
  },
  {
    key: "gas",
    type: "danger",
    threshold: 1800,
    message: "Dangerous gas levels detected",
    resolved: "Gas levels are now safe",
  },
  {
    key: "temp",
    type: "warning",
    threshold: 95,
    message: "Extreme temperature detected",
    resolved: "Temperature is back to normal",
  },
  {
    key: "humidity",
    type: "warning",
    threshold: 85,
    message: "Unusually high humidity detected",
    resolved: "Humidity levels are now safe",
  },
];

export default function AlertsPanel({ sensorData }) {
  // load alerts from local storage on start
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem("openSenseAlerts");
    return saved ? JSON.parse(saved) : [];
  });

  // track which alerts are currently active so they dont spam
  const activeKeys = useRef(new Set());

  // save alerts every time they change
  useEffect(() => {
    localStorage.setItem("openSenseAlerts", JSON.stringify(alerts));
  }, [alerts]);

  // check sensors every time new data comes in
  useEffect(() => {
    if (!sensorData) return;

    async function checkAlerts() {
      const timestamp = new Date().toLocaleTimeString();

      // get readable location for this sensor
      const location = await getLocationFromCoords(
        sensorData.latitude,
        sensorData.longitude
      );

      alertRules.forEach((rule) => {
        const value = sensorData[rule.key];
        if (value == null) return;

        const isUnsafe = value > rule.threshold;
        const wasUnsafe = activeKeys.current.has(rule.key);

        // condition becomes unsafe
        if (isUnsafe && !wasUnsafe) {
          activeKeys.current.add(rule.key);

          setAlerts((prev) =>
            [
              {
                id: `${Date.now()}-${rule.key}`,
                type: rule.type,
                message: `${rule.message} near ${location}`,
                time: timestamp,
                key: rule.key,
              },
              ...prev,
            ].slice(0, 6)
          );
        }

        // condition becomes safe
        if (!isUnsafe && wasUnsafe) {
          activeKeys.current.delete(rule.key);

          // remove the unsafe alert
          setAlerts((prev) => prev.filter((a) => a.key !== rule.key));

          // add resolved message
          const resolvedId = `${Date.now()}-resolved-${rule.key}`;

          setAlerts((prev) =>
            [
              {
                id: resolvedId,
                type: "resolved",
                message: `${rule.resolved} near ${location}`,
                time: timestamp,
                key: `${rule.key}-resolved`,
              },
              ...prev,
            ].slice(0, 6)
          );

          // auto dismiss after 8 seconds
          setTimeout(() => {
            setAlerts((prev) => prev.filter((a) => a.id !== resolvedId));
          }, 8000);
        }
      });
    }

    checkAlerts();
  }, [sensorData]);

  // manual dismiss 
  const dismissAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="alerts-container">
      {alerts.map((alert) => (
        <div key={alert.id} className={`alert-card ${alert.type}`}>
          <div>
            <strong>{alert.message}</strong>
            <p className="alert-time">last update: {alert.time}</p>
          </div>

          <button
            className="alert-close"
            onClick={() => dismissAlert(alert.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
