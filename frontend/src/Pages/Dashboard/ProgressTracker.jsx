import React, { useEffect, useState } from "react";
import "./ProgressTracker.css";

const ProgressTracker = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/progress/summary")
      .then((res) => {
        if (!res.ok) throw new Error("Non disponible");
        return res.json();
      })
      .then((data) => {
        setProgress(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          {
            id: 1,
            title: "Séances par Semaine",
            icon: "🏃‍♂️",
            current: 4,
            target: 5,
            status: "on-track"
          },
          {
            id: 2,
            title: "Pompes Totales",
            icon: "💪",
            current: 45,
            target: 60,
            unit: "pompes",
            status: "behind"
          },
          {
            id: 3,
            title: "Squats Complétés",
            icon: "🦵",
            current: 80,
            target: 100,
            unit: "squats",
            status: "ahead"
          },
          {
            id: 4,
            title: "Gainage Total",
            icon: "🔥",
            current: 6,
            target: 9,
            unit: "min",
            status: "on-track"
          }
        ];
        setProgress(fakeData);
        setLoading(false);
      });
  }, []);

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'on-track':
        return 'En Bonne Voie';
      case 'behind':
        return 'En Retard';
      case 'ahead':
        return 'En Avance';
      default:
        return 'En Cours';
    }
  };

  if (loading) return <p>Chargement…</p>;
  if (!progress || progress.length === 0) return <p>Données non disponibles.</p>;

  return (
    <div className="progress-tracker">
      <h3>Suivi des Objectifs</h3>
      <div className="progress-container">
        {progress.map((item) => (
          <div key={item.id} className="progress-item">
            <div className="progress-header">
              <div className="progress-title">
                <span className="progress-icon">{item.icon}</span>
                {item.title}
              </div>
              <div className="progress-percentage">
                {Math.round(getProgressPercentage(item.current, item.target))}%
              </div>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${getProgressPercentage(item.current, item.target)}%` }}
              ></div>
            </div>
            <div className="progress-details">
              <span className="progress-current">
                {item.current}{item.unit ? ` ${item.unit}` : ''}
              </span>
              <span className="progress-target">
                / {item.target}{item.unit ? ` ${item.unit}` : ''}
              </span>
              <span className={`progress-status ${item.status}`}>
                {getStatusText(item.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
