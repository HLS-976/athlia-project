import React, { useEffect, useState } from "react";
import "./ProgressTracker.css";

const ProgressTracker = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress/summary")
      .then((res) => {
        if (!res.ok) throw new Error("Pas dispo");
        return res.json();
      })
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = {
          current: 6,
          previous: 4,
          unit: "séances",
        };
        setProgress(fakeData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement…</p>;
  if (!progress) return <p>Données non disponibles.</p>;

  const { current, previous, unit } = progress;
  const difference = current - previous;
  const percent =
    previous === 0 ? 100 : Math.round((difference / previous) * 100);
  const isImproving = difference > 0;

  return (
    <div className="progression">
      <h3>Progression</h3>
      <p>
        Période actuelle : {current} {unit}
      </p>
      <p>
        Période précédente : {previous} {unit}
      </p>
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar"
          style={{
            width: `${Math.min(Math.abs(percent), 100)}%`,
            backgroundColor: isImproving ? "#4caf50" : "#f44336",
          }}
        >
          {percent}% {isImproving ? "📈" : difference < 0 ? "📉" : "➡️"}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
