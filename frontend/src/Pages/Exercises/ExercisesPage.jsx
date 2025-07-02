import { useEffect, useState } from "react";
import Header from "./Header";
import ExercicesCards from "./ExercisesCards";
import "./ExercisesPage.css";
import { fetchWithAuth } from "../../components/AccessToken";

/**
 * ExercisesPage component
 *
 * Affiche la liste des exercices filtrés par zones sélectionnées.
 * Les alertes liées au profil sportif sont désormais gérées à l'extérieur.
 */
const ExercisesPage = ({
  selectedZones = [],
  onExerciseSelect = null,
  isExerciseSelected = null,
  showHeader = true,
  user = null,
}) => {
  // État pour les contraintes et la contrainte sélectionnée
  const [constraints, setConstraints] = useState([]);
  const [selectedConstraint, setSelectedConstraint] = useState("");

  // Récupérer les contraintes depuis le backend au montage
  useEffect(() => {
    const fetchConstraints = async () => {
      try {
        const res = await fetchWithAuth(
          "http://localhost:8000/api/constraints/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setConstraints(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Erreur lors du chargement des contraintes :", err);
      }
    };
    fetchConstraints();
  }, [user]);

  // --- 3. Render ---
  return (
    <main>
      {showHeader && (
        <header>
          <Header />
        </header>
      )}

      {/* Filtre déroulant des contraintes */}
      <div style={{ margin: "1rem 0", textAlign: "center" }}>
        <label>
          Filtrer par contrainte&nbsp;
          <select
            value={selectedConstraint}
            onChange={(e) => setSelectedConstraint(e.target.value)}
            style={{ padding: "0.4rem", borderRadius: "6px" }}
          >
            <option value="">Aucune</option>
            {constraints.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="Exercises">
        <ExercicesCards
          selectedZones={selectedZones}
          onExerciseSelect={onExerciseSelect}
          isExerciseSelected={isExerciseSelected}
          selectedConstraint={selectedConstraint}
        />
      </div>
    </main>
  );
};

export default ExercisesPage;
