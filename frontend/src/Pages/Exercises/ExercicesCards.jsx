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

const ExercicesCards = ({
  selectedZones = [],
  onExerciseSelect = null,
  isExerciseSelected = null,
}) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/exercises", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setExercises(data);
        } else {
          console.error("Failed to fetch exercises");
        }
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  // Filtre exo par zone
  const filteredExercises =
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

  return (
    <section id="cards-features">
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {filteredExercises.map((ex, idx) => {
          const Icon = iconByExerciseName(ex.name);
          const selected = isExerciseSelected
            ? isExerciseSelected(ex.name)
            : false;
          return (
            <div
              key={idx}
              className={`card ${selected ? "exercise-card-selected" : ""}`}
              style={{ minWidth: "220px" }}
              onClick={() => onExerciseSelect && onExerciseSelect(ex)}
            >
              <Icon size={32} style={{ color: "#007bff" }} />
              <h3>{ex.name}</h3>
              <p>{ex.description}</p>
              {selected && (
                <div className="exercise-status">
                  <span className="status-text">Ajouté à l'historique</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExercicesCards;
