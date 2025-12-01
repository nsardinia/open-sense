import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebaseConfig"; 
import Heatmap from "../components/heatmap";
import HamburgerNav from '../components/navbar.jsx';
import "../styles/styles.css";
import AlertsPanel from "../components/alertspanel";
import SensorCard from "../components/sensorcard.jsx";
import Configurator from "../components/configurator.jsx";


function DashboardPage() {
  const [sensorData, setSensorData] = useState(null);
  const [newNodeDataDemo, setNewNodeDataDemo] = useState(null);
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

  
  //Hardcoding to avoid the demo effect
  useEffect(() => {
    const latestRef = ref(db, "sensor_readings/New Node/readings");
    const unsubscribe = onValue(latestRef, (snapshot) => {
        const val = snapshot.val();
        console.log("Received data:", val);
        setNewNodeDataDemo(val);
    });
    return () => unsubscribe();
  }, []);


  // update demoNodes based on firebase data
  useEffect(() => {
    if (!sensorData) return;

    setDemoNodes((prev) =>
      prev.map((node) =>
        node.id === "marston"
          ? { ...node, readings: sensorData }
          : node
      )
    );
  }, [sensorData]);

  useEffect(() => {
    if (!newNodeDataDemo) return;

    setDemoNodes((prev) =>
      prev.map((node) =>
        node.id === "New Node"
          ? { ...node, readings:  newNodeDataDemo}
          : node
      )
    );
  }, [newNodeDataDemo]);


  const [demoNodes, setDemoNodes] = useState([
    {
      id: "marston",
      lat: 29.647993,
      lng: -82.343939,
      readings: {
        pm: 120,
        gas: 900,
        sound: 78,
        temp: 83,
        humidity: 55,
      },
    },
    {
      id: "dungeon",
      lat: 29.648378,
      lng: -82.344561,
      readings: {
        pm: 190,
        gas: 1600,
        sound: 97,
        temp: 92,
        humidity: 72,
      },
    },
    {
      id: "malachowsky",
      lat: 29.644067,
      lng: -82.347768,
      readings: {
        pm: 75,
        gas: 500,
        sound: 62,
        temp: 79,
        humidity: 44,
      },
    },
  ])


    return (
    <div className="dashboard-container">
        <HamburgerNav />
        <Heatmap sensorData={sensorData} devices={demoNodes}/>
        <div className="dashboard-title">OpenSense Dashboard</div>
        
        <button onClick={() => setShowConfig(true)} className="open-config-btn"> Configure </button>

        <AlertsPanel sensorData={sensorData} />

        {showConfig && (
          <div className="config-overlay" onClick={() => setShowConfig(false)}>
             <div className="config-window" onClick={e => e.stopPropagation()}>
                <Configurator devices={demoNodes} onDemoNodesChange={(updatedDemoNodes) => setDemoNodes(updatedDemoNodes)}/>
             </div>
          </div>
        )}        
    </div>
  );
}

export default DashboardPage;
