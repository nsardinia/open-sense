import "../styles/configurator.css"
import "../../node_modules/react-grid-layout/css/styles.css"
import { useEffect, useState } from "react";

import GridLayout from "react-grid-layout";

export default function Configurator() {

  const [layout, setLayout] = useState([
    { i: "0", x: 0, y: 0, w: 2, h: 2 },
  ]);

  // Card counter
  const [counter, setCounter] = useState(1);

  const addCard = () => {
    const newId = counter.toString();
    const newItem = { i: newId, x: 0, y: Infinity, w: 2, h: 2 }; // y=Infinity makes it go to the bottom
    setLayout([...layout, newItem]);
    setCounter(counter + 1);
  };  
  return (
    <div>    
      <span>Devices</span>

      <GridLayout
        className="layout"
        layout={layout}
        cols={4}
        rowHeight={100}
        width={350}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
        bounded={true}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            style={{
              background: "linear-gradient(145deg, #1e1e1e, #2c2c2c)",
              borderRadius: "12px",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
            }}
          >
            Card {item.i}
          </div>
        ))}
      </GridLayout>      

      <button className="addDeviceButton" onClick={addCard}>Add Device</button>
      

    </div>
  )
}
