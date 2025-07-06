import "./AboutSection.css";


// Section qui présente la mission et innovation d'Athlia 
const AboutSection = () => {
  return (
    <section id="about-section">
      <div className="about-container">
        <h2 className="about-title">À propos d'Athlia</h2>
        
        <div className="about-content">
          <div className="about-card">
            <h3>Notre Mission</h3>
            <p>
              Rendre le fitness accessible à tous, même avec des contraintes physiques. 
              Athlia adapte automatiquement les exercices selon vos blessures, votre niveau 
              et vos objectifs pour un entraînement sûr et efficace.
            </p>
          </div>
          
          <div className="about-card">
            <h3>Notre Innovation</h3>
            <p>
              Notre squelette 3D interactif révolutionne la sélection d'exercices. 
              Cliquez sur les zones musculaires que vous voulez travailler et découvrez 
              instantanément les exercices adaptés à vos contraintes physiques.
            </p>
          </div>
          
          <div className="about-card">
            <h3>Personnalisation Avancée</h3>
            <p>
              Créez votre profil sportif avec vos objectifs, votre niveau et vos contraintes. 
              Athlia filtre automatiquement les exercices pour vous proposer uniquement 
              ceux qui vous conviennent vraiment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 