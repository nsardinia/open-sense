# 🌍 OpenSense — Open-Source Environmental Sensing Platform

OpenSense is a community-driven platform for building, deploying, and visualizing environmental IoT sensor networks.
Our mission is to make real-time environmental data accessible, open, and easy to contribute to.

This project includes:

A React + Vite web dashboard

Firebase Realtime Database integration

Interactive 3D map visualization using MapTiler

A Configurable sensor UI with drag-and-drop cards

Real-time alerts and an audio alarm system

An AI Assistant for querying environmental data

Open-source hardware + software pathways for community contributions

# 🚀 Features
🗺️ Real-Time Environmental Dashboard

Displays live readings (PM, gas, sound, temperature, humidity)

3D interactive map with geolocated nodes

Heatmap visualization of air quality and noise levels

# 🔧 Configurator Modal

Add new demo devices by name and coordinates

Drag-and-drop sensor cards

Built with react-grid-layout

Clean glass-UI styling

# 🔔 Alerts & Alarm System

Automatic detection of unsafe noise levels

Alert cards appear on map

Optional Alarm ON/OFF toggle

# 🤖 AI Assistant

Uses OpenAI API

Lets users “Ask about environmental patterns, risks, or insights…”

Can summarize trends across all sensor nodes

# 🔥 Firebase Integration

Live updates from Realtime Database

Reads and writes alarm state + sensor values

Easy to extend for real hardware

# 🛠️ Tech Stack

Frontend:

React

Vite

CSS / custom glass-UI styling

React Grid Layout

Lucide Icons

Backend / Cloud:

Firebase Realtime Database

OpenAI API

Map / Visualization:

MapTiler API

Custom heatmap renderer

# 📦 Installation
git clone https://github.com/your-org/opensense.git
cd opensense
npm install
npm run dev

# 🔑 Environment Variables

Create a .env file:

VITE_MAPTILER_KEY=your_key_here
VITE_FIREBASE_API_KEY=your_key_here
VITE_OPENAI_API_KEY=your_key_here

# 📡 Firebase Structure
latest/
   pm:
   gas:
   sound:
   temp:
   humidity:
   alarm:

sensor_readings/
   <nodeName>/
      readings/

# 📁 Project Structure
src/
 ├── components/
 │     ├── heatmap.jsx
 │     ├── sensorcard.jsx
 │     ├── navbar.jsx
 │     ├── alertspanel.jsx
 │     ├── configurator.jsx
 │     └── togglealarm.jsx
 ├── pages/
 │     ├── dashboard.jsx
 │     ├── contribute.jsx
 │     └── home.jsx
 ├── styles/
 │     ├── styles.css
 │     ├── configurator.css
 │     ├── togglealarm.css
 │     └── home.css
 └── firebaseConfig.js

# 🤝 Contributing

We welcome contributions from:

UI/UX designers

Developers (React, Firebase, IoT)

Data scientists

Hardware engineers

Makers/hobbyists

To contribute:

Fork the repo

Create a new branch

Commit your changes

Open a Pull Request

Our team will review + merge
