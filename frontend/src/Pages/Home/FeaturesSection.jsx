import { Link } from "react-router-dom";
import "./FeaturesSection.css";

// Section qui présente les fonctionnalités principales d'Athlia
const FeaturesSection = () => {
  return (
    <section id="features-section">
      <div className="features-container">
        <h2 className="features-title">Fonctionnalités Détaillées</h2>
        
        <div className="features-content">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <div className="feature-info">
              <h3>Tableau de Bord Personnel</h3>
              <p>
                Accédez à votre espace personnel pour suivre vos progrès sportifs avec 
                des statistiques détaillées et des informations personnalisées.
              </p>
              <ul className="feature-benefits">
                <li>Historique de vos exercices</li>
                <li>Fréquence d'utilisation par exercice</li>
                <li>Suivi de progression personnalisé</li>
                <li>Utilisation des muscles par zone</li>
                <li>Conseils et recommandations</li>
              </ul>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <div className="feature-info">
              <h3>Exercices Personnalisés</h3>
              <p>
                Découvrez une bibliothèque d'exercices adaptés à vos besoins. 
                Filtrez par zone musculaire et contraintes physiques pour trouver 
                les exercices qui vous conviennent.
              </p>
              <ul className="feature-benefits">
                <li>Filtrage par zone musculaire (pectoraux, bras, épaules, etc.)</li>
                <li>Sélection selon vos contraintes physiques</li>
                <li>Bibliothèque d'exercices variés</li>
                <li>Système de sélection/désélection d'exercices</li>
                <li>Interface intuitive et responsive</li>
              </ul>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <div className="feature-info">
              <h3>Squelette 3D Interactif</h3>
              <p>
                Utilisez notre squelette 3D interactif pour sélectionner visuellement 
                les zones musculaires que vous souhaitez travailler. Une interface 
                moderne et intuitive pour personnaliser vos entraînements.
              </p>
              <ul className="feature-benefits">
                <li>Squelette 3D interactif avec rotation</li>
                <li>Sélection précise des zones musculaires</li>
                <li>Filtrage automatique des exercices par zone</li>
                <li>Contrôles de rotation automatique</li>
                <li>Interface responsive et moderne</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="signup-section">
          <div className="card signup-card">
            <p style={{
              fontWeight: 700,
              fontSize: '1.15em',
              letterSpacing: '-0.5px',
              color: '#e0f2fe'
            }}>
              Prêt à découvrir tout ce qu'Athlia peut t'apporter&nbsp;?<br/>
              <span style={{color: '#60a5fa', fontWeight: 500}}>
                Rejoins-nous et commence à transformer ta routine dès aujourd'hui&nbsp;!
              </span>
            </p>
            <Link to="/signup">
              <button className="cta-button" style={{
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '-0.5px',
                background: 'linear-gradient(90deg, #2460f2 0%, #4ade80 100%)',
                color: '#fff',
                boxShadow: '0 0 24px #2460f2aa'
              }}>
                Je découvre Athlia&nbsp;✨
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 