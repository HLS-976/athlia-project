import ExercicesCards from "./ExercisesCards";
import "./ExercisesPage.css";

/**
 * ExercisesPage component
 *
 * Affiche la liste des exercices filtrés par zones sélectionnées.
 */
const ExercisesPage = ({
  selectedZones = [],
  onExerciseSelect = null,
  isExerciseSelected = null,
  showHeader = true,
}) => {
  return (
    <main>
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
