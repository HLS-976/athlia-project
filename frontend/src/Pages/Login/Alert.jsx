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

    async function fetchSportProfile() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const profileRes = await fetch(
          "http://localhost:8000/api/sport-profiles/",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const profiles = await profileRes.json();
        console.log("Fetched sport profiles:", profiles);

        if (!profiles || !Array.isArray(profiles) || profiles.length === 0) {
          console.log("No sport profile found for user:", user.id);
          setShow(true);
        } else {
          console.log("User data:", user);
          console.log("Profil sportif :", profiles);
          setShow(false);
        }
      } catch (error) {
        console.error(error);
        setShow(true);
      } finally {
        localStorage.removeItem("justAuthenticated");
      }
    }

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
            localStorage.removeItem("justAuthenticated");
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
