import React, { useEffect, useState } from "react";
import Header from "./Header";
import ExercicesCards from "./ExercisesCards";
import "./ExercisesPage.css";

const ExercisesPage = ({
  selectedZones = [],
  onExerciseSelect = null,
  isExerciseSelected = null,
  showHeader = true,
}) {
  const [showAlert, setShowAlert] = useState(false);

  // --- 1. Helper function to check sessionStorage ---
  function alreadyShown() {
    return sessionStorage.getItem("alertSportProfile") === "true";
  }

  // --- 2. Check whether to show alert ---
  useEffect(() => {
    if (user && !user.hasCompletedSportProfile && !alreadyShown()) {
      setShowAlert(true);
      sessionStorage.setItem("alertSportProfile", "true");
    }
  }, [user]);

  // --- 3. Render component ---
  return (
    <main>
      {showHeader && (
        <header>
          <Header />
        </header>
      )}

      {showAlert && (
        <div id="alert-popup">
          <div id="popup-icon" className="alert-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 0a12 12 0 100 24A12 12 0 0012 0zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>

          <span id="alert-message">
            Don’t forget to complete your sport profile for a better experience!
          </span>

          <div id="close-icon">
            <svg
              id="close-svg"
              onClick={() => setShowAlert(false)}
              viewBox="0 0 24 24"
            >
              <path id="close-path" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
        </div>
      )}

      <div id="Exercises">
        <ExercicsesCards

          selectedZones={selectedZones}
          onExerciseSelect={onExerciseSelect}
          isExerciseSelected={isExerciseSelected}
        />
      </div>
    </main>
  );
}

export default ExercisesPage;
