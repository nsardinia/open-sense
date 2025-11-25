import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home.jsx";
import DashboardPage from "./pages/dashboard.jsx";
// import any other pages to create (like About, Docs, etc.)

function App() {
  // App no longer holds dashboard state/logic, just the router
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/dashboard" element={<DashboardPage />} /> 

      <Route path="/about" element={<div>About Page Content</div>} />
      <Route path="/docs" element={<div>Documentation Page Content</div>} />
      <Route path="/community" element={<div>Community Page Content</div>} />
      <Route path="/contribute" element={<div>Contribute Page Content</div>} />
      <Route path="/event" element={<div>Event Page Content</div>} />
    </Routes>
  );
}

export default App;