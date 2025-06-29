import React, { useEffect, useState } from "react";
import "./ExercisesHistory.css";

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exercises/history/")
      .then((response) => {
        if (!response.ok) throw new Error("API non disponible");
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
            exercise_name: "Pompes",
            date: "2025-06-24",
            sets: 3,
            reps: 15,
          },
          {
            id: 2,
            exercise_name: "Squats",
            date: "2025-06-23",
            sets: 4,
            reps: 20,
          },
          {
            id: 3,
            exercise_name: "Gainage",
            date: "2025-06-22",
            sets: 3,
            reps: "-",
          },
          {
            id: 4,
            exercise_name: "Crunch",
            date: "2025-06-21",
            sets: 3,
            reps: 12,
          },
          {
            id: 5,
            exercise_name: "Dips",
            date: "2025-06-20",
            sets: 3,
            reps: 8,
          },
          {
            id: 6,
            exercise_name: "Extension dos",
            date: "2025-06-19",
            sets: 3,
            reps: 10,
          },
        ];
        setHistory(fakeData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement de l'historique…</p>;

  return (
    <div className="exercise-history">
      <h3>Historique des Exercices</h3>
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
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.exercise_name}</td>
                <td>{item.date}</td>
                <td>{item.sets}</td>
                <td>{item.reps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExerciseHistory;
