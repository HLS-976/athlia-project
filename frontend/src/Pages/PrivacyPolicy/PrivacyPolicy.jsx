import React, { useState, useEffect } from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="privacy-policy">
      <div className="privacy-container">
        <h1>Politique de Confidentialité</h1>
        <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Athlia ("nous", "notre", "nos") s'engage à protéger votre vie privée. 
            Cette politique de confidentialité explique comment nous collectons, utilisons 
            et protégeons vos informations personnelles lorsque vous utilisez notre plateforme de fitness.
          </p>
          <p className="beta-notice" style={{
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <strong>🚀 Version Beta :</strong> Athlia est actuellement en phase de développement Beta. 
            Cette politique reflète nos pratiques actuelles et peut être amenée à évoluer 
            au fur et à mesure de l'ajout de nouvelles fonctionnalités.
          </p>
        </section>

        <section>
          <h2>2. Informations que nous collectons</h2>
          
          <h3>2.1 Informations que vous nous fournissez</h3>
          <ul>
            <li>Informations de compte (nom, prénom, nom d'utilisateur, email, mot de passe)</li>
            <li>Profil sportif (âge, niveau d'expérience, objectifs fitness)</li>
            <li>Contraintes physiques et limitations médicales</li>
            <li>Historique d'exercices (séries, répétitions, durée, notes personnelles)</li>
          </ul>

          <h3>2.2 Stockage local</h3>
          <ul>
            <li>Tokens d'authentification JWT stockés dans le navigateur (localStorage)</li>
            <li>Préférences d'affichage et paramètres de session</li>
          </ul>
          
          <p className="info-note">
            <strong>Note :</strong> Nous n'utilisons pas de cookies de tracking ou de technologies 
            de suivi tiers. Les données sont stockées localement dans votre navigateur 
            pour assurer le fonctionnement de l'application.
          </p>
        </section>

        <section>
          <h2>3. Utilisation des informations</h2>
          <p>Nous utilisons vos informations pour :</p>
          <ul>
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience d'entraînement</li>
            <li>Générer des recommandations d'exercices adaptées</li>
            <li>Assurer la sécurité de votre compte</li>
            <li>Communiquer avec vous concernant nos services</li>
          </ul>
        </section>

        <section>
          <h2>4. Partage des informations</h2>
          <p>
            Nous ne vendons, n'échangeons ni ne louons vos informations personnelles 
            à des tiers. Nous pouvons partager vos informations uniquement dans les cas suivants :
          </p>
          <ul>
            <li>Avec votre consentement explicite</li>
            <li>Pour respecter des obligations légales</li>
            <li>Avec nos prestataires de services d'hébergement (serveur et base de données)</li>
            <li>Pour protéger nos droits et la sécurité des utilisateurs</li>
          </ul>
          
          <p className="info-note">
            <strong>Note :</strong> Actuellement, nous n'utilisons aucun service d'analytics 
            ou de tracking tiers. Vos données restent entre vous et notre plateforme.
          </p>
        </section>

        <section>
          <h2>5. Sécurité des données</h2>
          <p>
            Nous mettons en place des mesures de sécurité appropriées pour protéger 
            vos informations personnelles contre l'accès non autorisé, la modification, 
            la divulgation ou la destruction :
          </p>
          <ul>
            <li>Authentification par tokens JWT (JSON Web Tokens)</li>
            <li>Chiffrement des mots de passe avec algorithmes de hachage sécurisés</li>
            <li>Connexion sécurisée à la base de données (SSL/TLS)</li>
            <li>Validation et protection contre les injections SQL</li>
            <li>Protection CORS pour limiter les accès non autorisés</li>
          </ul>
        </section>

        <section>
          <h2>6. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD, vous avez les droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> Demander une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
            <li><strong>Droit de limitation :</strong> Limiter le traitement de vos données</li>
          </ul>
        </section>

        <section>
          <h2>7. Conservation des données</h2>
          <p>
            Nous conservons vos informations personnelles aussi longtemps que nécessaire 
            pour fournir nos services et respecter nos obligations légales. 
            Vous pouvez demander la suppression de votre compte à tout moment.
          </p>
        </section>

        <section>
          <h2>8. Technologies de stockage</h2>
          <p>
            Athlia utilise le <strong>localStorage</strong> de votre navigateur (et non des cookies) 
            pour stocker les informations nécessaires au fonctionnement de l'application :
          </p>
          <ul>
            <li><strong>Tokens d'authentification :</strong> Pour maintenir votre connexion sécurisée</li>
            <li><strong>Informations de profil :</strong> Pour éviter des requêtes répétées au serveur</li>
            <li><strong>Préférences utilisateur :</strong> Pour mémoriser vos choix d'affichage</li>
          </ul>
          <p>
            Ces données sont stockées localement dans votre navigateur et ne sont pas accessibles 
            à d'autres sites web. Vous pouvez les supprimer à tout moment en vidant le cache 
            de votre navigateur ou en vous déconnectant de l'application.
          </p>
        </section>

        <section>
          <h2>9. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
            Nous vous informerons de tout changement important via une notification sur le site. 
            La date de dernière mise à jour est toujours affichée en haut de cette page.
          </p>
        </section>

        <section>
          <h2>10. Contact et exercice de vos droits</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité, pour 
            exercer vos droits RGPD (accès, rectification, suppression, etc.), ou pour 
            toute demande relative à vos données personnelles, contactez-nous :
          </p>
          <ul>
            <li><strong>Via notre formulaire de contact</strong> disponible sur la page d'accueil</li>
            <li><strong>Suppression de compte :</strong> Directement depuis votre profil utilisateur</li>
          </ul>
          <p>
            Nous nous engageons à répondre à vos demandes dans un délai maximal de 30 jours 
            conformément au RGPD.
          </p>
        </section>

        <div className="privacy-footer">
          <p>
            <strong>Note :</strong> Cette politique s'applique uniquement à Athlia. 
            Si vous accédez à des liens vers des sites tiers, 
            veuillez consulter leurs politiques de confidentialité respectives.
          </p>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <div 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        role="button"
        aria-label="Retour en haut"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 