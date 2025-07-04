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

          const formattedHistory = data.map((entry) => {
            let formattedDate = "-";

            // Vérifier différents champs de date possibles
            const dateField =
              entry.created_at || entry.date_created || entry.timestamp;

            if (dateField) {
              try {
                const entryDate = new Date(dateField);
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
            } else {
              // Si aucune date n'est disponible, utiliser la date actuelle comme fallback
              formattedDate = new Date().toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              console.warn(
                "Aucune date trouvée pour l'entrée:",
                entry.id,
                "- utilisation de la date actuelle"
              );
            }

            console.log(
              "Entry created_at:",
              dateField,
              "Formatted date:",
              formattedDate
            );

            return {
              id: entry.id,
              exercise_name: entry.exercise_name || "Exercice inconnu",
              date: formattedDate,
              sets: entry.sets || "-",
              reps: entry.reps || "-",
              duration: entry.duration_minutes || "-",
              notes: entry.notes || "",
              created_at: dateField || new Date().toISOString(),
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
