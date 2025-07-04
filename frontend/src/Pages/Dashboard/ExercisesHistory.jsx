import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../components/AccessToken.jsx";
import "./ExercisesHistory.css";

const ExerciseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseHistory = async () => {
      try {
        const response = await fetchWithAuth(
          "http://localhost:8000/api/entries/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Exercise history fetched successfully:", data);

          // Transformer les données pour correspondre au format attendu
          const formattedHistory = data.map((entry) => {
            // Créer la date correctement - plus de vérifications
            let formattedDate = "Date inconnue";

            if (entry.created_at) {
              try {
                const entryDate = new Date(entry.created_at);
                // Vérifier que la date est valide
                if (!isNaN(entryDate.getTime())) {
                  formattedDate = entryDate.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  });
                }
              } catch (error) {
                console.error("Erreur lors du formatage de la date:", error);
              }
            }

            console.log(
              "Entry created_at:",
              entry.created_at,
              "Formatted date:",
              formattedDate
            );

            return {
              id: entry.id,
              exercise_name:
                entry.exercise_name ||
                entry.exercise_detail?.name ||
                entry.exercise?.name ||
                "Exercice inconnu",
              date: formattedDate,
              sets: entry.sets || "-",
              reps: entry.reps || "-",
              duration: entry.duration_minutes || "-",
              notes: entry.notes || "",
              created_at: entry.created_at, // Garder pour le tri
            };
          });

          // Trier par date décroissante (plus récent en premier)
          formattedHistory.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          setHistory(formattedHistory);
          setError(null);
        } else {
          console.error("Failed to fetch exercise history:", response.status);
          setError("Erreur lors de la récupération de l'historique");
        }
      } catch (error) {
        console.error("Error fetching exercise history:", error);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseHistory();
  }, []);

  if (loading) return <p>Chargement de l'historique…</p>;

  if (error) {
    return (
      <div className="exercise-history">
        <h3>Historique des Exercices</h3>
        <p className="error-message">❌ {error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="exercise-history">
      <h3>Historique des Exercices</h3>
      {history.length === 0 ? (
        <p>Aucun exercice enregistré. Commencez par ajouter un exercice !</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Exercice</th>
              <th>Date</th>
              <th>Séries</th>
              <th>Répétitions</th>
              <th>Durée (min)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.exercise_name}</td>
                <td>{item.date}</td>
                <td>{item.sets}</td>
                <td>{item.reps}</td>
                <td>{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExerciseHistory;
