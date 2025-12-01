import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../firebaseConfig";
import "../styles/togglealarm.css";

export default function ToggleAlarm() {
  const [alarmOn, setAlarmOn] = useState(false);

  useEffect(() => {
    const alarmRef = ref(db, "latest/alarm");
    return onValue(alarmRef, (snap) => setAlarmOn(snap.val()));
  }, []);

  const toggleAlarm = () => {
    const alarmRef = ref(db, "latest/alarm");
    set(alarmRef, !alarmOn);
  };

  return (
    <button 
      className={`floating-btn ${alarmOn ? "on" : "off"}`}
      onClick={toggleAlarm}
    >
      Alarm {alarmOn ? "ON" : "OFF"}
    </button>
  );
}
