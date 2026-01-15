import React, { useEffect, useState } from "react";
import "./ExercisesHistory.css";

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exercises/history/")
      .then((response) => {
        if (!response.ok) throw new Error("API non dispo");
        return response.json();
      })
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => {
        const fakeData = [
          {
            id: 1,
            exercise_name: "Squat",
            date: "2025-06-24",
            sets: 3,
            reps: 10,
            weight: 90,
          },
          {
            id: 2,
            exercise_name: "Développé couché",
            date: "2025-06-23",
            sets: 4,
            reps: 8,
            weight: 70,
          },
        ];
        setHistory(fakeData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement de l’historique…</p>;

  return (
    <div className="exercise-history">
      {history.length === 0 ? (
        <p>Aucun exercice enregistré.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Exercice</th>
              <th>Date</th>
              <th>Séries</th>
              <th>Répétitions</th>
              <th>Poids (kg)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.exercise_name}</td>
                <td>{item.date}</td>
                <td>{item.sets}</td>
                <td>{item.reps}</td>
                <td>{item.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExerciseHistory;
