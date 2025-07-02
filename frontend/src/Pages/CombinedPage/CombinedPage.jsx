import React, { useState } from "react";
import SkeletonPage from "../Skeleton/SkeletonPage";
import ExercisesPage from "../Exercises/ExercisesPage";
import Header from "../Exercises/Header";
import SportProfileAlert from "../Login/Alert";
import "./CombinedPage.css";

const CombinedPage = () => {
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const user = { id: 1 };

  const handleZoneClick = (zoneName) => {
    setSelectedZones((prevZones) => {
      const newZones = [...prevZones, zoneName];
      return newZones;
    });
  };

  const handleZoneDeselect = (zoneName) => {
    setSelectedZones((prevZones) => {
      const newZones = prevZones.filter((zone) => zone !== zoneName);
      return newZones;
    });
  };

  const handleExerciseSelect = (exercise) => {
    console.log("Exercice sélectionné:", exercise);

    // Ajouter l'exercice dashboard
    const exerciseWithTimestamp = {
      ...exercise,
      selectedAt: new Date().toISOString(),
      zones: selectedZones,
    };

    setExerciseHistory((prev) => [...prev, exerciseWithTimestamp]);

    // Ajouter exo selectionné
    setSelectedExercises((prev) => {
      const isAlreadySelected = prev.find((ex) => ex.name === exercise.name);
      if (isAlreadySelected) {
        return prev.filter((ex) => ex.name !== exercise.name);
      } else {
        return [...prev, exerciseWithTimestamp];
      }
    });
  };

  const handleShowAllExercises = () => {
    setSelectedZones([]);
  };

  const handleClearAllSelections = () => {
    setSelectedZones([]);
  };

  const isExerciseSelected = (exerciseName) => {
    return selectedExercises.some((ex) => ex.name === exerciseName);
  };

  return (
    <div>
      {user && (
        <SportProfileAlert
          user={user}
          show={showAlert}
          setShow={setShowAlert}
        />
      )}
      <div className="combined-page">
        <div className="combined-header">
          <Header />
        </div>

        <div className="combined-content">
          {/* Section squelette - côté gauche */}
          <div className="skeleton-section">
            {selectedZones.length > 0 && (
              <div className="skeleton-info">
                <div className="selected-zones-list">
                  <p>Zones sélectionnées:</p>
                  <ul>
                    {selectedZones.map((zone, index) => (
                      <li key={index}>
                        <strong>{zone}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="skeleton-controls">
                  <button
                    onClick={handleShowAllExercises}
                    className="show-all-btn"
                  >
                    Voir tous les exercices
                  </button>
                  <button
                    onClick={handleClearAllSelections}
                    className="clear-all-btn"
                  >
                    Effacer sélections
                  </button>
                </div>
              </div>
            )}
            <SkeletonPage
              selectedZones={selectedZones}
              onZoneClick={handleZoneClick}
              onZoneDeselect={handleZoneDeselect}
            />
          </div>

          {/* Section exercices - côté droit */}
          <div className="exercises-section">
            <div className="exercises-header">
              <h2>
                {selectedZones.length > 0
                  ? `Exercices pour ${
                      selectedZones.length === 1
                        ? selectedZones[0]
                        : "les zones sélectionnées"
                    }`
                  : "Tous les exercices disponibles"}
              </h2>
              <p>
                {selectedZones.length > 0
                  ? `${selectedZones.length} zone(s) sélectionnée(s)`
                  : "Cliquez sur une ou plusieurs zones du squelette pour filtrer les exercices"}
              </p>
            </div>

            <ExercisesPage
              selectedZones={selectedZones}
              onExerciseSelect={handleExerciseSelect}
              isExerciseSelected={isExerciseSelected}
              showHeader={false}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedPage;
