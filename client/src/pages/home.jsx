import React, { useState } from 'react';
import { Menu, X, Cpu, Network, Globe, Github, FileText } from 'lucide-react';
import './home.css'
import HamburgerNav from '../components/navbar.jsx';


export default function LandingPage() {
return (
    <>
    <div className="landing-page">
        <HamburgerNav />

        {/* Hero Section */}
        <section className="hero-section">
        <div className="hero-background">
            <div className="hero-gif-overlay"></div>
            <div className="hero-gradient"></div>
            <div className="animated-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            </div>
            <div className="grid-overlay"></div>
        </div>

        <div className="hero-content">
            <h1 className="hero-title">Open Sense</h1>
            <p className="hero-subtitle">sensing made simple</p>
            <p className="hero-description">
            Join the global network of environmental sensors. Build, deploy, and contribute to open-source IoT monitoring that spans from cities to the most remote corners of the earth.
            </p>
            <div className="hero-buttons">
            <a href="/dashboard" className="btn btn-primary">Get Started</a>
            <a href="/about" className="btn btn-secondary">Learn More</a>
            </div>
        </div>

        <div className="gradient-transition"></div>
        </section>

        {/* About Section */}
        <section className="section">
        <div className="container">
            <h2 className="section-title">What is Open Sense?</h2>
            <p className="section-text">
            Open Sense is a community-driven IoT platform that democratizes environmental monitoring. We're building a distributed network of sensors that collect real-time data on air quality, temperature, humidity, and more—powered by people like you.
            </p>
            <p className="section-text">
            Whether you're in a bustling city or a remote rural area, your contribution helps create a comprehensive picture of our planet's health. Every sensor adds another data point to our collective understanding.
            </p>
        </div>
        </section>

        {/* How It Works */}
        <section className="section how-it-works">
        <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="cards-grid">
            <div className="card">
                <div className="card-icon">
                <Cpu size={32} color="white" />
                </div>
                <h3 className="card-title">1. Build Your Sensor</h3>
                <p className="card-text">
                Use our open-source hardware designs and 3D-printable cases to assemble your IoT sensor with affordable, readily available components.
                </p>
            </div>

            <div className="card">
                <div className="card-icon">
                <Network size={32} color="white" />
                </div>
                <h3 className="card-title">2. Deploy & Connect</h3>
                <p className="card-text">
                Install your sensor at home or in your community. Connect it to our network using our simple setup process and start collecting data immediately.
                </p>
            </div>

            <div className="card">
                <div className="card-icon">
                <Globe size={32} color="white" />
                </div>
                <h3 className="card-title">3. Share & Discover</h3>
                <p className="card-text">
                Your data joins a global network. Access insights from sensors worldwide and contribute to open environmental research and awareness.
                </p>
            </div>
            </div>
        </div>
        </section>

        {/* Get Started */}
        <section className="section get-started">
        <div className="container">
            <h2 className="section-title">Get Started Today</h2>
            
            <div className="resources-grid">
            <div className="resource-card">
                <div className="resource-header">
                <Github className="resource-icon" size={32} />
                <div>
                    <h3 className="resource-title">3D Printed Casing</h3>
                    <p className="resource-text">
                    Download our open-source 3D printer files for weather-resistant sensor casings. Designed for durability and easy assembly.
                    </p>
                    <a href="https://github.com/nsardinia/open-sensee" className="resource-link">
                    View on GitHub →
                    </a>
                </div>
                </div>
            </div>

            <div className="resource-card">
                <div className="resource-header">
                <FileText className="resource-icon" size={32} />
                <div>
                    <h3 className="resource-title">Build Instructions</h3>
                    <p className="resource-text">
                    Step-by-step guide with detailed instructions, component lists, and assembly diagrams. Perfect for beginners and experts alike.
                    </p>
                    <a href="/docs/build-guide" className="resource-link">
                    Read Documentation →
                    </a>
                </div>
                </div>
            </div>
            </div>

            <div className="contribute-box">
            <h3 className="contribute-title">Contribute to Open Source</h3>
            <p className="contribute-text">
                Open Sense thrives on community contributions. Whether you're a hardware enthusiast, software developer, data scientist, or environmental advocate, there's a place for you in our project.
            </p>
            <div className="tags-grid">
                <div className="tag">Hardware Design</div>
                <div className="tag">Software Development</div>
                <div className="tag">Data Analysis</div>
            </div>
            <a href="/contribute" className="btn btn-primary">Join the Community</a>
            </div>
        </div>
        </section>

        {/* Footer */}
        <footer className="footer">
        <p className="footer-text">Open Sense - Building a sustainable future, one sensor at a time</p>
        <p className="footer-subtext">Open Source | Community Driven | Globally Connected</p>
        </footer>
    </div>
    </>
);
}