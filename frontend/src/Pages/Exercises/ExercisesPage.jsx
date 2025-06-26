import Header from "./Header";
import { useEffect, useState } from "react";

import "./ExercisesPage.css";
import ExercicesCards from "./ExercisesCards";

function ExercisesPage({ user }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("alertSportProfile");

    if (user && !user.hasCompletedSportProfile && !alreadyShown) {
      setShowAlert(true);
      sessionStorage.setItem("alertSportProfile", "true");
    }
  }, [user]);

  return (
    <main>
      <header>
        <Header />
      </header>
      {showAlert && (
        <div id="alert-popup">
          <div id="popup-icon alert-icon">
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
        <ExercicesCards />
      </div>
    </main>
  );
}

export default ExercisesPage;
