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

  const getCountClass = (count) => {
    if (count >= 3) return "high";
    if (count >= 1) return "medium";
    return "low";
  };

  return (
    <div className="exercise-frequency">
      <h3>Fréquence des Séances</h3>
      <div className="frequency-chart">
        {loading ? (
          <p>Chargement…</p>
        ) : (
          <>
            {frequency.map((item, index) => (
              <div key={index} className="frequency-item">
                <span className="frequency-day">{item.label}</span>
                <span className={`frequency-count ${getCountClass(item.count)}`}>
                  {item.count}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ExercisesFrequency;
