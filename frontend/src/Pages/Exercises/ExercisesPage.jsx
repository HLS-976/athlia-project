import { useEffect } from "react";
import Header from "./Header";
import ExercicesCards from "./ExercisesCards";
import "./ExercisesPage.css";

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
  // --- 2. Fetch sport profile on mount (plus d'alerte ici) ---
  useEffect(() => {
    // Tu peux garder ici une logique de fetch si besoin, mais sans setShowAlert
    // Exemple : charger des données utilisateur ou autre
  }, [user]);

  // --- 3. Render ---
  return (
    <main>
      {showHeader && (
        <header>
          <Header />
        </header>
      )}

      <div className="Exercises">
        <ExercicesCards
          selectedZones={selectedZones}
          onExerciseSelect={onExerciseSelect}
          isExerciseSelected={isExerciseSelected}
        />
      </div>
    </main>
  );
};

export default ExercisesPage;
