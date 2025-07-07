import { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Dashboard/Header";
import { fetchWithAuth } from "../../components/AccessToken";

function ProfilePage() {
  const [sportProfile, setSportProfile] = useState({
    id: null,
    age: "",
    goals: "",
    level_user: "",
    constraints: [],
  });
  const [constraints, setConstraints] = useState([]);
  const [showConstraints, setShowConstraints] = useState(false);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });

  // Pour la modification du mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Charger les contraintes physiques d'abord
        const constraintsRes = await fetchWithAuth(
          "http://localhost:8000/api/constraints/",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const constraintsData = await constraintsRes.json();
        console.log("Réponse constraints :", constraintsData);

        // Si la réponse est de la forme { results: [...] }
        let constraintsArray = [];
        if (Array.isArray(constraintsData)) {
          constraintsArray = constraintsData;
        } else if (Array.isArray(constraintsData.results)) {
          constraintsArray = constraintsData.results;
        } else {
          console.warn("Format inattendu pour /api/constraints/");
        }

        constraintsArray.sort((a, b) => a.name.localeCompare(b.name));
        setConstraints(constraintsArray);

        // 2. Charger le profil sportif ensuite (optionnel)
        const profileRes = await fetchWithAuth(
          "http://localhost:8000/api/sport-profiles/",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const profiles = await profileRes.json();
        let myProfile = null;
        if (Array.isArray(profiles)) {
          myProfile = profiles.find(
            (p) => p.user === user.id || p.user_username === user.user_name
          );
        } else if (profiles && profiles.user === user.id) {
          myProfile = profiles;
        }

        if (!myProfile || !myProfile.id) {
          console.warn("Aucun profil sportif trouvé !");
          setSportProfile({
            id: null,
            age: "",
            goals: "",
            level_user: "",
            constraints: [],
          });
        } else {
          setSportProfile({
            id: myProfile.id || null,
            age: myProfile.age || "",
            goals: myProfile.goals || "",
            level_user: myProfile.level_user || "",
            constraints: Array.isArray(myProfile.display_constraints)
              ? myProfile.display_constraints.map((c) => c.id)
              : [],
          });
          console.log("User data:", user);
          console.log("Profil sportif :", myProfile);
          console.log(
            "Contraintes utilisateur :",
            myProfile.display_constraints
          );
        }
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    }

    fetchData();
  }, [user]);

  const handleConstraintToggle = (id) => {
    const updated = sportProfile.constraints.includes(id)
      ? sportProfile.constraints.filter((c) => c !== id)
      : [...sportProfile.constraints, id];
    setSportProfile({ ...sportProfile, constraints: updated });
  };

  const handleSportSubmit = async () => {
    try {
      const method = sportProfile.id ? "PUT" : "POST";
      const url = sportProfile.id
        ? `http://localhost:8000/api/sport-profiles/${sportProfile.id}/`
        : "http://localhost:8000/api/sport-profiles/";

      const body = {
        age: sportProfile.age,
        goals: sportProfile.goals,
        level_user: sportProfile.level_user,
        constraints: sportProfile.constraints,
        ...(method === "POST" && { user: user.id }),
      };

      const response = await fetchWithAuth(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert(
          method === "POST"
            ? "Profil sportif créé !"
            : "Profil sportif mis à jour !"
        );
        // (optionnel) : tu peux rappeler fetchData() ici si tu veux rafraîchir l'affichage
      } else {
        alert("Erreur lors de la sauvegarde du profil sportif.");
      }
    } catch (error) {
      console.error("Erreur sport submit :", error);
    }
  };

  // Gestion du changement de mot de passe (nécessite un endpoint côté back)
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    try {
      const response = await fetchWithAuth(
        "http://localhost:8000/api/change-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );
      if (response.ok) {
        setPasswordMsg("Mot de passe modifié avec succès !");
        setOldPassword("");
        setNewPassword("");
      } else {
        const data = await response.json();
        setPasswordMsg(
          data.detail || "Erreur lors du changement de mot de passe."
        );
      }
    } catch (error) {
      setPasswordMsg("Erreur lors du changement de mot de passe.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div id="profile-page">
        <div id="profile-title">
          <h1>Mon Profil</h1>
        </div>
        <div id="profile-user">
          <div id="firstname">
            <strong>Prénom:</strong> {user.first_name || ""}
          </div>
          <div id="lastname">
            <strong>Nom:</strong> {user.last_name || ""}
          </div>
          <div id="username">
            <strong>Nom d'utilisateur:</strong>{" "}
            {user.user_name || user.username || ""}
          </div>
          <div id="email">
            <strong>Email:</strong> {user.email || ""}
          </div>
        </div>
        <form id="password-change" onSubmit={handlePasswordChange}>
          <label id="old-password">
            Ancien mot de passe:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label id="new-password">
            Nouveau mot de passe:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button id="submit-password" type="submit">
            Modifier le mot de passe
          </button>
          {passwordMsg && <p>{passwordMsg}</p>}
        </form>
        
        <div id="sport-profile-title">
          <h1>Mon Profil Sportif</h1>
        </div>
        
        {/* Formulaire d'édition du profil sportif */}
        <div id="sport-profile-edit">
          <label id="age">
            Âge :
            <input
              type="number"
              value={sportProfile.age}
              onChange={(e) =>
                setSportProfile({ ...sportProfile, age: e.target.value })
              }
            />
          </label>
          <br />
          <label id="goals">
            Objectifs :
            <input
              type="text"
              value={sportProfile.goals}
              onChange={(e) =>
                setSportProfile({ ...sportProfile, goals: e.target.value })
              }
            />
          </label>
          <br />
          <label id="level_user">
            Niveau :
            <select
              value={sportProfile.level_user}
              onChange={(e) =>
                setSportProfile({ ...sportProfile, level_user: e.target.value })
              }
            >
              <option value="">-- Choisir un niveau --</option>
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </label>
          <br />
          <br />
          <div>
            <button
              id="constraints"
              type="button"
              onClick={() => setShowConstraints(!showConstraints)}
            >
              Contraintes physiques {showConstraints ? "▲" : "▼"}
            </button>

            {showConstraints && (
              <div style={{ padding: "10px" }}>
                {constraints.map((c) => (
                  <label
                    key={c.id}
                    style={{ display: "block", marginBottom: "5px" }}
                  >
                    <input
                      type="checkbox"
                      checked={sportProfile.constraints.includes(c.id)}
                      onChange={() => handleConstraintToggle(c.id)}
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            )}
          </div>
          <br />
          <button
            id="update-sport-profile"
            type="button"
            onClick={handleSportSubmit}
          >
            Mettre à jour le profil sportif
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
