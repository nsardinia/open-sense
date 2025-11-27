import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebaseConfig"; // Assuming firebaseConfig is in the root
import Heatmap from "../components/heatmap";
import HamburgerNav from '../components/navbar.jsx';
import "../styles/styles.css";
import AlertsPanel from "../components/alertspanel";
import SensorCard from "../components/sensorcard.jsx";

// This is your original dashboard logic
function DashboardPage() {
  const [sensorData, setSensorData] = useState(null);

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
        
        <AlertsPanel sensorData={sensorData} />
        
    </div>
  );
}

export default DashboardPage;