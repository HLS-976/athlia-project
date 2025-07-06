import "./Footer.css";

/**
 * Footer component
 *
 * This component displays the footer with copyright and useful links.
 *
 * - The returned JSX contains:
 *   - Copyright information
 *   - Useful links
 *   - Legal links
 *   - Development information
 */
function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Athlia</h4>
            <p>
              Transformez votre corps avec une plateforme fitness innovante 
              et personnalisée.
            </p>
          </div>
          
          <div className="footer-section">
            <h4>Liens Utiles</h4>
            <ul>
              <li><a href="/#about-section">À propos</a></li>
              <li><a href="/#features-section">Fonctionnalités</a></li>
              <li><a href="/#contact-section">Contact</a></li>
              <li><a href="/login">Connexion</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Légal</h4>
            <ul>
              <li><a href="/privacy">Politique de confidentialité</a></li>
              <li><a href="/terms">Conditions d'utilisation</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Développement</h4>
            <ul>
              <li><a href="https://github.com/Bree-Coding" target="_blank" rel="noopener noreferrer">Brenda - Front-End</a></li>
              <li><a href="https://github.com/HLS-976" target="_blank" rel="noopener noreferrer">Hilliass - Back-End</a></li>
              <li><a href="https://github.com/Knarta" target="_blank" rel="noopener noreferrer">Charlène - UI/UX</a></li>
              <li><span>Version Beta</span></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Athlia. Tous droits réservés.</p>
          <p>Développé avec ❤️ pour la communauté fitness</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;