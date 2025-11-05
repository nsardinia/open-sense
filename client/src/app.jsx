// App.jsx --> this is your main app component.
// for now, it just renders a placeholder so i can confirm setup works.

import React from "react";
import Heatmap from "./components/heatmap";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#000000ff" }}>OpenSense Dashboard</h1>
      <Heatmap />
    </div>
  );
}

export default App;

