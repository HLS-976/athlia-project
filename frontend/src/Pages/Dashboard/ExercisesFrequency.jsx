import React, { useState, useEffect } from "react";
import "./ExercisesFrequency.css";

const ExercisesFrequency = () => {
  const [frequency, setFrequency] = useState([]);
  const [range, setRange] = useState("week");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sessions/stats?range=${range}`)
      .then((res) => {
        if (!res.ok) throw new Error("API indisponible");
        return res.json();
      })
      .then((data) => {
        setFrequency(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          { label: "Lun", count: 2 },
          { label: "Mar", count: 1 },
          { label: "Mer", count: 3 },
          { label: "Jeu", count: 0 },
          { label: "Ven", count: 2 },
          { label: "Sam", count: 1 },
          { label: "Dim", count: 0 },
        ];
        setFrequency(fakeData);
        setLoading(false);
      });
  }, [range]);

  return (
    <div className="workout-frequency">
      <h3>Fréquence des séances</h3>
      <div className="range-buttons">
        <button onClick={() => setRange("day")}>Jour</button>
        <button onClick={() => setRange("week")}>Semaine</button>
        <button onClick={() => setRange("month")}>Mois</button>
      </div>
      {loading ? (
        <p>Chargement…</p>
      ) : (
        <ul>
          {frequency.map((item, index) => (
            <li key={index}>
              {item.label} : {item.count} séance(s)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExercisesFrequency;
