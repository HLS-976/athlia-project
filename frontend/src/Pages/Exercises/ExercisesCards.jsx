import { useEffect, useState } from "react";
import {
  GiShoulderArmor,
  GiAbdominalArmor,
  GiBiceps,
  GiBackPain,
  GiLeg,
  GiBootStomp,
  GiChestArmor,
  GiWeightLiftingUp,
  GiRunningShoe,
  GiHand,
  GiBodyBalance,
  GiJumpingRope,
  GiStrong,
} from "react-icons/gi";
import "./ExercisesCards.css";
import { fetchWithAuth } from "../../components/AccessToken.jsx";
import ExercisesHistoryCard from "./ExercisesHistoryCard.jsx";

const iconByExerciseName = (name) => {
  const lower = name.toLowerCase();

  if (lower.includes("épaule") || lower.includes("cercles d'épaule"))
    return GiShoulderArmor;
  if (lower.includes("crunch")) return GiAbdominalArmor;
  if (lower.includes("gainage")) return GiBodyBalance;
  if (lower.includes("dips")) return GiBiceps;
  if (lower.includes("extension") || lower.includes("superman"))
    return GiBackPain;
  if (lower.includes("fente")) return GiLeg;
  if (lower.includes("kick-back")) return GiBootStomp;
  if (lower.includes("pont")) return GiBootStomp;
  if (lower.includes("squat")) return GiLeg;
  if (lower.includes("marche")) return GiRunningShoe;
  if (lower.includes("mountain climber")) return GiRunningShoe;
  if (lower.includes("pompes claquées")) return GiChestArmor;
  if (lower.includes("pompes contre un mur")) return GiHand;
  if (lower.includes("pompes mains rapprochées")) return GiBiceps;
  if (lower.includes("pompes pike")) return GiShoulderArmor;
  if (lower.includes("pompes sur les genoux")) return GiHand;
  if (lower.includes("pompes triceps")) return GiBiceps;
  if (lower.includes("pompe")) return GiChestArmor;
  if (lower.includes("flexion des bras")) return GiStrong;
  if (lower.includes("dos")) return GiBackPain;
  if (lower.includes("fessier")) return GiBootStomp;
  if (lower.includes("jambes")) return GiLeg;

  return GiWeightLiftingUp; // fallback
};

const ExercisesCards = ({
  selectedZones = [],
  onExerciseSelect = null,
  isExerciseSelected = null,
  selectedConstraint = "",
}) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]); // État local

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetchWithAuth(
          "http://localhost:8000/api/exercises/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Exercises fetched successfully");
          setExercises(data);
        } else {
          const errorText = await response.text();
          console.error(
            "Failed to fetch exercises",
            response.status,
            errorText
          );
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  // Filtre exo par zone
  let filteredExercises =
    selectedZones.length > 0
      ? exercises.filter((exercise) => {
          // Utilise zone base de données
          const exerciseCategory = exercise.category?.name?.toLowerCase() || "";
          return selectedZones.some((zone) => {
            const zoneName = zone.toLowerCase();

            // correspondance entre les deux
            if (zoneName === "pectoraux" && exerciseCategory === "pectoraux")
              return true;
            if (zoneName === "bras" && exerciseCategory === "bras") return true;
            if (zoneName === "epaules" && exerciseCategory === "epaules")
              return true;
            if (zoneName === "abdos" && exerciseCategory === "abdos")
              return true;
            if (zoneName === "dos" && exerciseCategory === "dos") return true;
            if (zoneName === "jambes" && exerciseCategory === "jambes")
              return true;
            if (zoneName === "fessiers" && exerciseCategory === "fessiers")
              return true;

            return false;
          });
        })
      : exercises;

  // Filtrer par contrainte sélectionnée
  if (selectedConstraint) {
    filteredExercises = filteredExercises.filter((exercise) =>
      exercise.constraints?.some(
        (constraint) =>
          constraint.id?.toString() === selectedConstraint.toString()
      )
    );
  }

  // Fonction pour gérer la sélection d'un exercice
  const handleExerciseClick = (exercise) => {
    const isAlreadySelected = selectedExercises.some(
      (ex) => ex.id === exercise.id
    );

    if (isAlreadySelected) {
      // Désélectionner
      setSelectedExercises((prev) =>
        prev.filter((ex) => ex.id !== exercise.id)
      );
    } else {
      // Sélectionner
      setSelectedExercises((prev) => [...prev, exercise]);
    }

    // Appeler la fonction parent si elle existe
    if (onExerciseSelect) {
      onExerciseSelect(exercise);
    }
  };

  // Fonction pour vérifier si un exercice est sélectionné
  const isSelected = (exercise) => {
    // Utilise la fonction parent si elle existe, sinon l'état local
    if (isExerciseSelected) {
      return isExerciseSelected(exercise.name);
    }
    return selectedExercises.some((ex) => ex.id === exercise.id);
  };

  return (
    <section id="cards-features">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {filteredExercises.map((ex, idx) => {
          const Icon = iconByExerciseName(ex.name);
          const selected = isSelected(ex);

          return (
            <div
              key={idx}
              className={`card ${selected ? "exercise-card-selected" : ""}`}
              onClick={() => handleExerciseClick(ex)}
            >
              {/* Ajoute l'icône ici */}
              <div className="card-icon">
                <Icon size={32} style={{ color: "#2460f2" }} />
              </div>

              <h3>{ex.name}</h3>
              <p>{ex.description}</p>
              <div className="card-difficulty">
                <p>{ex.difficulty}</p>
              </div>
              {selected && (
                <div className="exercise-history-card">
                  <ExercisesHistoryCard exercise={ex} isSelected={selected} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExercisesCards;
