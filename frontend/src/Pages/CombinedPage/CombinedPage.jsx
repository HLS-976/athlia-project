import React, { useState } from "react";
import SkeletonPage from "../Skeleton/SkeletonPage";
import ExercisesPage from "../Exercises/ExercisesPage";
import Header from "../Dashboard/Header";
import SportProfileAlert from "../Login/Alert";
import "./CombinedPage.css";

const CombinedPage = () => {
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const user = { id: 1 };

  const handleZoneClick = (zoneName) => {
    setSelectedZones((prevZones) => [...prevZones, zoneName]);
  };

  const handleZoneDeselect = (zoneName) => {
    setSelectedZones((prevZones) =>
      prevZones.filter((zone) => zone !== zoneName)
    );
  };

  const handleExerciseSelect = (exercise) => {
    setSelectedExercises((prev) => {
      const isAlreadySelected = prev.some((ex) => ex.id === exercise.id);
      if (isAlreadySelected) {
        // Désélectionner
        return prev.filter((ex) => ex.id !== exercise.id);
      } else {
        // Sélectionner
        return [...prev, exercise];
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
              {selectedZones.length > 0 ? (
                <>
                  <h2>
                    {`Exercices pour ${selectedZones.length === 1 ? selectedZones[0] : "les zones sélectionnées"}`}
                  </h2>
                  <p>{`${selectedZones.length} zone(s) sélectionnée(s)`}</p>
                </>
              ) : (
                <>
                  <h2 className="exos-main-title">Tous les exercices disponibles</h2>
                  <p className="exos-main-sub">Cliquez sur une ou plusieurs zones du squelette pour filtrer les exercices</p>
                </>
              )}
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
