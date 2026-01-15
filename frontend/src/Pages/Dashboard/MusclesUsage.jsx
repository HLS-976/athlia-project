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
          { name: "Pectoraux", count: 12 },
          { name: "Dorsaux", count: 9 },
          { name: "Biceps", count: 7 },
          { name: "Abdominaux", count: 6 },
        ];
        setMuscleData(fakeData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des muscles…</p>;
  if (muscleData.length === 0) return <p>Aucune donnée musculaire.</p>;

  return (
    <div className="muscle-usage">
      <h3>Muscles les plus sollicités</h3>
      <ul>
        {muscleData.map((item, index) => (
          <li key={index}>
            {item.name} : {item.count} fois
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MuscleUsageChart;
