import "../styles/sensorcard.css"

export default function SensorCard({ name="Live Sensor Node", data }) {
  if (!data) return null

  return (
    <div className="sensor-card">
      <div className="sensor-title">{name}</div>

      <div className="sensor-grid">

        <div className="sensor-row">
          <span className="label">PM</span>
          <span className="value">{data.pm ?? "N/A"}</span>
        </div>

        <div className="sensor-row">
          <span className="label">Gas</span>
          <span className="value">{data.gas ?? "N/A"}</span>
        </div>

        <div className="sensor-row">
          <span className="label">Sound</span>
          <span className="value">{data.sound ?? "N/A"}</span>
        </div>

        <div className="sensor-row">
          <span className="label">Temp</span>
          <span className="value">{data.temp ?? "N/A"}</span>
        </div>

        <div className="sensor-row">
          <span className="label">Humidity</span>
          <span className="value">{data.humidity ?? "N/A"}</span>
        </div>

      </div>
    </div>
  )
}
