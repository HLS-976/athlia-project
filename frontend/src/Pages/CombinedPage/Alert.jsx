import React, { useEffect } from "react";
import "./Alert.css";

/**
 * Alert component that checks the user's sport profile.
 * Displays an alert if the profile is not completed.
 *
 * @param {object} props
 * @param {object} props.user - The current user (must have an id)
 * @param {boolean} props.show - Whether to display the alert
 * @param {function} props.setShow - Function to control the alert visibility
 */
const SportProfileAlert = ({ user, show, setShow }) => {
  useEffect(() => {
    if (!user) return;

    // Only show alert if user just logged in
    const justLoggedIn = localStorage.getItem("justAuthenticated") === "true";
    if (!justLoggedIn) return;

    const fetchSportProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/sport-profiles/${user.id}/`
        );

        if (!response.ok) {
          console.log("No sport profile found for user:", user.id);
          throw new Error("No profile found");
        }

        const profile = await response.json();

        if (!profile || Object.keys(profile).length === 0) {
          setShow(true);
        } else {
          console.log("Sport profile found:", profile);
        }
      } catch (error) {
        console.error(error);
        setShow(true);
      } finally {
        localStorage.removeItem("justAuthenticated"); // Prevents being stuck
      }
    };

    fetchSportProfile();
  }, [user, setShow]);

  if (!show) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-modal">
        <h2>Modifie ton profil sportif</h2>
        <p>
          Tu n'as pas encore complété ton profil. Fais-le pour profiter d'une
          meilleure expérience !
        </p>
        <button
          onClick={() => {
            setShow(false);
            localStorage.removeItem("justAuthenticated"); // IMPORTANT !
          }}
          className="alert-button"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SportProfileAlert;
