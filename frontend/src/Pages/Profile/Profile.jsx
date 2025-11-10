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

  // États pour l'édition du profil utilisateur
  const [editableUser, setEditableUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
  });

  // Pour la modification du mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Pour la suppression de compte
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteMsg, setDeleteMsg] = useState("");

  // Pour les messages de mise à jour
  const [updateMsg, setUpdateMsg] = useState("");

  // État pour l'ouverture/fermeture du dropdown des contraintes
  const [isConstraintsOpen, setIsConstraintsOpen] = useState(false);

  // Ajout d'un état pour le dropdown des niveaux
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  useEffect(() => {
    // Initialiser les champs éditables avec les données utilisateur
    setEditableUser({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      user_name: user.user_name || user.username || "",
      email: user.email || "",
    });

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

  // Fonction unique pour mettre à jour profil + mot de passe
  const handleCompleteUpdate = async (e) => {
    e.preventDefault();
    setUpdateMsg("");

    let successMessages = [];
    let errorMessages = [];

    try {
      // 1. Mise à jour du profil utilisateur
      const profileResponse = await fetchWithAuth(
        `http://localhost:8000/api/user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableUser),
        }
      );

      if (profileResponse.ok) {
        const updatedUser = await profileResponse.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        successMessages.push("Profil utilisateur mis à jour");
      } else {
        const data = await profileResponse.json();
        let errorMessage = "Erreur lors de la mise à jour du profil";

        if (data.email) {
          errorMessage = data.email[0];
        } else if (data.user_name) {
          errorMessage = data.user_name[0];
        } else if (data.detail) {
          errorMessage = data.detail;
        }

        errorMessages.push(errorMessage);
      }

      // 2. Modification du mot de passe (seulement si les champs sont remplis)
      if (oldPassword && newPassword) {
        // Vérifications du mot de passe
        if (oldPassword === newPassword) {
          errorMessages.push(
            "Le nouveau mot de passe doit être différent de l'ancien"
          );
        } else if (newPassword.length < 8) {
          errorMessages.push(
            "Le nouveau mot de passe doit contenir au moins 8 caractères"
          );
        } else if (newPassword !== confirmPassword) {
          errorMessages.push(
            "La confirmation du mot de passe ne correspond pas"
          );
        } else {
          const passwordResponse = await fetchWithAuth(
            "http://localhost:8000/auth/password/change/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                old_password: oldPassword,
                new_password1: newPassword,
                new_password2: newPassword,
              }),
            }
          );

          if (passwordResponse.ok) {
            successMessages.push("Mot de passe modifié");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          } else {
            const data = await passwordResponse.json();
            let errorMessage = "Erreur lors du changement de mot de passe";

            if (data.old_password) {
              errorMessage = data.old_password[0];
            } else if (data.new_password1) {
              errorMessage = data.new_password1[0];
            } else if (data.new_password2) {
              errorMessage = data.new_password2[0];
            } else if (data.detail) {
              errorMessage = data.detail;
            } else if (data.non_field_errors) {
              errorMessage = data.non_field_errors[0];
            }

            errorMessages.push(errorMessage);
          }
        }
      } else if (
        (oldPassword && !newPassword) ||
        (!oldPassword && newPassword) ||
        (!oldPassword && !newPassword && confirmPassword)
      ) {
        errorMessages.push(
          "Pour changer le mot de passe, veuillez remplir l'ancien et le nouveau mot de passe"
        );
      }

      // Affichage des messages
      if (successMessages.length > 0 && errorMessages.length === 0) {
        setUpdateMsg(`✅ ${successMessages.join(" et ")} avec succès !`);
      } else if (successMessages.length > 0 && errorMessages.length > 0) {
        setUpdateMsg(
          `✅ ${successMessages.join(
            " et "
          )} avec succès ! ❌ ${errorMessages.join(", ")}`
        );
      } else if (errorMessages.length > 0) {
        setUpdateMsg(`❌ ${errorMessages.join(", ")}`);
      } else {
        setUpdateMsg("✅ Informations sauvegardées avec succès !");
      }
    } catch (error) {
      setUpdateMsg("❌ Erreur de connexion au serveur.");
      console.error("Erreur mise à jour complète:", error);
    }
  };

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
      } else {
        alert("Erreur lors de la sauvegarde du profil sportif.");
      }
    } catch (error) {
      console.error("Erreur sport submit :", error);
    }
  };

  // Gestion de la suppression de compte
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteMsg("");

    if (!deletePassword) {
      setDeleteMsg("Veuillez saisir votre mot de passe.");
      return;
    }

    try {
      const response = await fetchWithAuth(
        "http://127.0.0.1:8000/api/delete-account/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: deletePassword,
          }),
        }
      );

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        alert("✅ Compte supprimé avec succès. Vous allez être redirigé.");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        let errorMessage = "Erreur lors de la suppression du compte.";

        if (data.password) {
          errorMessage = data.password[0];
        } else if (data.detail) {
          errorMessage = data.detail;
        } else if (data.error) {
          errorMessage = data.error;
        }

        setDeleteMsg(`${errorMessage}`);
      }
    } catch (error) {
      setDeleteMsg("Erreur de connexion au serveur.");
      console.error("Erreur suppression compte:", error);
    }
  };

  // Fermer les dropdowns quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-constraints-select")) {
        setIsConstraintsOpen(false);
      }
      if (!event.target.closest(".custom-level-select")) {
        setIsLevelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header />
      <div id="profile-page">
        <div id="profile-title">
          <h1>Mon Profil</h1>
        </div>
        <div id="profile-user">
          <form onSubmit={handleCompleteUpdate}>
            <div className="profile-field">
              <label>
                <strong>Prénom:</strong>
              </label>
              <input
                type="text"
                value={editableUser.first_name}
                onChange={(e) =>
                  setEditableUser({
                    ...editableUser,
                    first_name: e.target.value,
                  })
                }
                placeholder="Votre prénom"
              />
            </div>

            <div className="profile-field">
              <label>
                <strong>Nom:</strong>
              </label>
              <input
                type="text"
                value={editableUser.last_name}
                onChange={(e) =>
                  setEditableUser({
                    ...editableUser,
                    last_name: e.target.value,
                  })
                }
                placeholder="Votre nom"
              />
            </div>

            <div className="profile-field">
              <label>
                <strong>Nom d'utilisateur:</strong>
              </label>
              <input
                type="text"
                value={editableUser.user_name}
                onChange={(e) =>
                  setEditableUser({
                    ...editableUser,
                    user_name: e.target.value,
                  })
                }
                placeholder="Votre nom d'utilisateur"
              />
            </div>

            <div className="profile-field">
              <label>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                value={editableUser.email}
                onChange={(e) =>
                  setEditableUser({
                    ...editableUser,
                    email: e.target.value,
                  })
                }
                placeholder="Votre email"
              />
            </div>

            <div className="profile-field">
              <label>
                <strong>Ancien mot de passe:</strong>
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Laissez vide si pas de changement"
              />
            </div>

            <div className="profile-field">
              <label>
                <strong>Nouveau mot de passe:</strong>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Laissez vide si pas de changement"
              />
            </div>

            <div className="profile-field">
              <label>
                <strong>Confirmer mot de passe:</strong>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Laissez vide si pas de changement"
              />
            </div>

            <button type="submit" className="profile-button">
              Sauvegarder toutes les modifications
            </button>
            {updateMsg && <p className="update-message">{updateMsg}</p>}
          </form>

          {/* Section suppression de compte */}
          <div className="delete-section">
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="profile-button delete-button"
              >
                Supprimer mon compte
              </button>
            ) : (
              <form onSubmit={handleDeleteAccount}>
                <p className="delete-warning">
                  ⚠️ Cette action est irréversible ! Tous vos données seront
                  définitivement supprimées.
                </p>
                <div className="profile-field">
                  <label>
                    <strong>Confirmez avec votre mot de passe:</strong>
                  </label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>
                <div className="button-group">
                  <button
                    type="submit"
                    className="profile-button delete-button"
                  >
                    Confirmer la suppression
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeletePassword("");
                      setDeleteMsg("");
                    }}
                    className="profile-button cancel-button"
                  >
                    Annuler
                  </button>
                </div>
                {deleteMsg && <p className="update-message">{deleteMsg}</p>}
              </form>
            )}
          </div>
        </div>

        <div id="sport-profile-title">
          <h1>Mon Profil Sportif</h1>
        </div>

        {/* Formulaire d'édition du profil sportif */}
        <div id="sport-profile-edit">
          <label>Âge :</label>
          <input
            type="number"
            value={sportProfile.age}
            onChange={(e) =>
              setSportProfile({ ...sportProfile, age: e.target.value })
            }
          />

          <label>Objectifs :</label>
          <input
            type="text"
            value={sportProfile.goals}
            onChange={(e) =>
              setSportProfile({ ...sportProfile, goals: e.target.value })
            }
          />

          <label>Niveau :</label>
          <div className={`custom-level-select ${isLevelOpen ? "open" : ""}`}>
            <div
              className="level-display"
              onClick={() => setIsLevelOpen(!isLevelOpen)}
            >
              <span className="level-text">
                {sportProfile.level_user === ""
                  ? "-- Choisir un niveau --"
                  : sportProfile.level_user === "beginner"
                  ? "Débutant"
                  : sportProfile.level_user === "intermediate"
                  ? "Intermédiaire"
                  : sportProfile.level_user === "advanced"
                  ? "Avancé"
                  : sportProfile.level_user}
              </span>
              <span className="dropdown-arrow">{isLevelOpen ? "▲" : "▼"}</span>
            </div>

            {isLevelOpen && (
              <div className="level-dropdown">
                <div
                  className={`level-option ${
                    sportProfile.level_user === "" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSportProfile({ ...sportProfile, level_user: "" });
                    setIsLevelOpen(false);
                  }}
                >
                  <span className="level-name">-- Choisir un niveau --</span>
                  {sportProfile.level_user === "" && (
                    <span className="check-mark">✓</span>
                  )}
                </div>
                <div
                  className={`level-option ${
                    sportProfile.level_user === "beginner" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSportProfile({
                      ...sportProfile,
                      level_user: "beginner",
                    });
                    setIsLevelOpen(false);
                  }}
                >
                  <span className="level-name">Débutant</span>
                  {sportProfile.level_user === "beginner" && (
                    <span className="check-mark">✓</span>
                  )}
                </div>
                <div
                  className={`level-option ${
                    sportProfile.level_user === "intermediate" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSportProfile({
                      ...sportProfile,
                      level_user: "intermediate",
                    });
                    setIsLevelOpen(false);
                  }}
                >
                  <span className="level-name">Intermédiaire</span>
                  {sportProfile.level_user === "intermediate" && (
                    <span className="check-mark">✓</span>
                  )}
                </div>
                <div
                  className={`level-option ${
                    sportProfile.level_user === "advanced" ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSportProfile({
                      ...sportProfile,
                      level_user: "advanced",
                    });
                    setIsLevelOpen(false);
                  }}
                >
                  <span className="level-name">Avancé</span>
                  {sportProfile.level_user === "advanced" && (
                    <span className="check-mark">✓</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <label>Contraintes physiques :</label>
          <div className="custom-constraints-select">
            <div
              className="constraints-display"
              onClick={() => setIsConstraintsOpen(!isConstraintsOpen)}
            >
              <span className="constraints-text">
                {sportProfile.constraints.length === 0
                  ? "-- Sélectionner des contraintes --"
                  : `${sportProfile.constraints.length} contrainte(s) sélectionnée(s)`}
              </span>
              <span className="dropdown-arrow">
                {isConstraintsOpen ? "▲" : "▼"}
              </span>
            </div>

            {isConstraintsOpen && (
              <div className="constraints-dropdown">
                {constraints.map((constraint) => (
                  <div
                    key={constraint.id}
                    className={`constraint-option ${
                      sportProfile.constraints.includes(constraint.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleConstraintToggle(constraint.id)}
                  >
                    <span className="constraint-name">{constraint.name}</span>
                    {sportProfile.constraints.includes(constraint.id) && (
                      <span className="check-mark">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSportSubmit}
            className="profile-button"
          >
            Mettre à jour le profil sportif
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
