import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../components/AccessToken.jsx";
import "./ExercisesHistoryCard.css";

export default function ExercisesHistoryCard({ exercise, isSelected }) {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Synchroniser l'expansion avec la sélection de la carte
  useEffect(() => {
    console.log(
      "ExercisesHistoryCard useEffect - isSelected:",
      isSelected,
      "exercise:",
      exercise?.name
    );
    if (!isSelected) {
      setSubmitMessage("");
    }
  }, [isSelected, exercise]); // Ajoutez 'exercise' ici

  // Fonction simplifiée pour envoyer au backend
  const sendExerciseToBackend = async (formData) => {
    try {
      console.log("=== ENVOI AU BACKEND ===");
      console.log("FormData envoyée:", formData);

      const response = await fetchWithAuth(
        "http://localhost:8000/api/entries/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Exercice envoyé avec succès :", data);
        return { success: true, data };
      } else {
        console.error("Erreur backend:", data);
        throw new Error(
          data.detail || `Erreur ${response.status}: ${JSON.stringify(data)}`
        );
      }
    } catch (error) {
      console.error("Erreur API POST:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitMessage("");

      // Envoyer sans session
      const formData = {
        exercise: exercise.id,
        // session: null, // Pas de session
        sets: sets ? parseInt(sets) : null,
        reps: reps ? parseInt(reps) : null,
        duration_minutes: duration ? parseInt(duration) : null,
        notes: notes || "",
      };

      await sendExerciseToBackend(formData);
      setSubmitMessage("✅ Exercice ajouté à l'historique avec succès !");
      setSets("");
      setReps("");
      setDuration("");
      setNotes("");

      setTimeout(() => {
        setSubmitMessage("");
      }, 3000);
    } catch (error) {
      console.error("Erreur complète:", error);
      setSubmitMessage("❌ Erreur lors de l'ajout à l'historique");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ne rien rendre si pas sélectionné
  if (!isSelected) {
    return null;
  }

  return (
    <div className="exercise-history-card">
      <div
        className="exercise-history-form"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <label>Séries :</label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ex: 3"
          />
        </div>

        <div>
          <label>Répétitions :</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ex: 10"
          />
        </div>

        <div>
          <label>Durée (minutes) :</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ex: 5"
          />
        </div>

        <div>
          <label>Notes :</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Notes personnelles..."
            rows="3"
          />
        </div>

        {submitMessage && (
          <div
            className={`submit-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit();
          }}
          disabled={isSubmitting}
          className={`submit-button ${isSubmitting ? "submitting" : ""}`}
        >
          {isSubmitting ? "Ajout en cours..." : "Ajouter à l'historique"}
        </button>
      </div>
    </div>
  );
}
