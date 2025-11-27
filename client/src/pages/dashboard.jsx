import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig"; // Assuming firebaseConfig is in the root
import Heatmap from "../components/heatmap";
import HamburgerNav from '../components/navbar.jsx';
import "../styles/styles.css";
import AlertsPanel from "../components/alertspanel";
import SensorCard from "../components/sensorcard.jsx";
import Configurator from "../components/configurator.jsx";

// This is your original dashboard logic
function DashboardPage() {
  const [sensorData, setSensorData] = useState(null);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const latestRef = ref(db, "latest");
    const unsubscribe = onValue(latestRef, (snapshot) => {
        const val = snapshot.val();
        console.log("Received data:", val);
        setSensorData(val);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
        <HamburgerNav />
        <Heatmap sensorData={sensorData} />
        <div className="dashboard-title">OpenSense Dashboard</div>
        
        <button onClick={() => setShowConfig(true)} className="open-config-btn"> Configure </button>

        <AlertsPanel sensorData={sensorData} />

        {showConfig && (
          <div className="config-overlay" onClick={() => setShowConfig(false)}>
             <div className="config-window" onClick={e => e.stopPropagation()}>
                <Configurator />
             </div>
          </div>
        )}        
    </div>
  );
}

export default DashboardPage;
