import React, { useState, useEffect } from "react";
import "./MusclesUsage.css";

const MuscleUsageChart = () => {
  const [muscleData, setMuscleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/muscles/usage/")
      .then((res) => {
        if (!res.ok) throw new Error("Non accessible");
        return res.json();
      })
      .then((data) => {
        setMuscleData(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          { name: "Pectoraux", count: 15, icon: "💪" },
          { name: "Abdominaux", count: 12, icon: "🔥" },
          { name: "Biceps", count: 10, icon: "💪" },
          { name: "Dorsaux", count: 8, icon: "🏋️" },
          { name: "Jambes", count: 6, icon: "🦵" },
          { name: "Épaules", count: 5, icon: "💪" },
          { name: "Fessiers", count: 4, icon: "🍑" },
        ];
        setMuscleData(fakeData);
        setLoading(false);
      });
  }, []);

  const getMaxCount = () => {
    return Math.max(...muscleData.map(item => item.count));
  };

  if (loading) return <p>Chargement des muscles…</p>;
  if (muscleData.length === 0) return <p>Aucune donnée musculaire.</p>;

  const maxCount = getMaxCount();

  return (
    <div className="muscles-usage">
      <h3>Muscles les Plus Sollicités</h3>
      <div className="muscles-grid">
        {muscleData.map((item, index) => (
          <div key={index} className="muscle-item">
            <div className="muscle-name">
              <span className="muscle-icon">{item.icon}</span>
              {item.name}
            </div>
            <div className="muscle-usage-bar">
              <div 
                className="muscle-usage-fill"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              ></div>
            </div>
            <div className="muscle-percentage">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MuscleUsageChart;
