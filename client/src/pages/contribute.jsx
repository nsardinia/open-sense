import React from "react";
import HamburgerNav from "../components/navbar.jsx";
import "../styles/contribute.css";

export default function Contribute() {
  return (
    <div className="contribute-page">
      <HamburgerNav />

      {/* Hero Background */}
      <div className="contribute-hero">
        <div className="contribute-bg-gif"></div>
        <div className="contribute-bg-gradient"></div>
        <div className="contribute-grid-overlay"></div>

        <div className="contribute-content">
          <h1 className="contribute-title">Contribute to OpenSense</h1>
          <p className="contribute-subtitle">
            Help us build open-source environmental sensing tools for communities everywhere.
          </p>

          {/* GitHub Box */}
          <div className="contribute-box">
            <h2 className="contribute-box-title">Get Started on GitHub</h2>
            <p className="contribute-box-text">
              OpenSense is fully open-source. Whether you want to help with the interface,
              the real-time sensor engine, or data visualization, your contributions help
              improve environmental transparency for everyone.
            </p>

            <a
              href="https://github.com/nsardinia/open-sense"
              className="contribute-btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the GitHub Repository →
            </a>
          </div>

          {/* Contribution Tags */}
          <h2 className="contribute-section-title">Ways You Can Contribute</h2>

          <div className="contribute-tags-grid">
            <div className="contribute-tag">UI/UX Improvements</div>
            <div className="contribute-tag">Sensor Data Processing</div>
            <div className="contribute-tag">Firebase Integration</div>
            <div className="contribute-tag">Map Visualization</div>
            <div className="contribute-tag">Documentation</div>
            <div className="contribute-tag">New Device Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
