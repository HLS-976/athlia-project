import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
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
        </section>

        <section>
          <h2>2. Informations que nous collectons</h2>
          
          <h3>2.1 Informations que vous nous fournissez</h3>
          <ul>
            <li>Informations de compte (nom, email, mot de passe)</li>
            <li>Profil utilisateur (âge, sexe, objectifs fitness)</li>
            <li>Contraintes physiques et médicales</li>
            <li>Historique d'exercices et préférences</li>
          </ul>

          <h3>2.2 Informations collectées automatiquement</h3>
          <ul>
            <li>Données de navigation (pages visitées, temps passé)</li>
            <li>Informations techniques (navigateur, appareil, adresse IP)</li>
            <li>Cookies et technologies similaires</li>
          </ul>
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
            <li>Avec nos prestataires de services (hébergement, analytics)</li>
            <li>Pour protéger nos droits et la sécurité des utilisateurs</li>
          </ul>
        </section>

        <section>
          <h2>5. Sécurité des données</h2>
          <p>
            Nous mettons en place des mesures de sécurité appropriées pour protéger 
            vos informations personnelles contre l'accès non autorisé, la modification, 
            la divulgation ou la destruction.
          </p>
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
          <h2>8. Cookies</h2>
          <p>
            Nous utilisons des cookies pour améliorer votre expérience. 
            Vous pouvez gérer vos préférences de cookies via notre bannière de consentement.
          </p>
        </section>

        <section>
          <h2>9. Modifications de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
            Nous vous informerons de tout changement important via email ou notification sur le site.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou pour 
            exercer vos droits, contactez-nous via le formulaire.
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
    </div>
  );
};

export default PrivacyPolicy; 