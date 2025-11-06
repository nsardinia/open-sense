// import Heatmap from "./components/heatmap";
// import LatestFeed from "./components/latestFeed";
// import "./styles/styles.css";

// function App() {
//   return (
//     <div className="dashboard-container">
//       <LatestFeed />
//       <Heatmap />
//       <div className="dashboard-title">OpenSense Dashboard</div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebaseConfig";
import Heatmap from "./components/heatmap";
import "./styles/styles.css";

function App() {
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
      <Heatmap sensorData={sensorData} />
      <div className="dashboard-title">OpenSense Dashboard</div>
    </div>
  );
}

export default App;
