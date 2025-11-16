import React, { useState, useEffect } from "react";
import "./TermsOfService.css";

const TermsOfService = () => {
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
    <div className="terms-of-service">
      <div className="terms-container">
        <h1>Conditions d'Utilisation</h1>
        <p className="last-updated">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <section>
          <h2>1. Acceptation des conditions</h2>
          <p>
            En utilisant Athlia, vous acceptez d'être lié par ces conditions d'utilisation. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>
          <p className="beta-notice" style={{
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            padding: '15px',
            borderRadius: '8px',
            marginTop: '15px'
          }}>
            <strong>🚀 Version Beta :</strong> Athlia est actuellement en phase de développement. 
            Le service peut subir des modifications, des interruptions ou des changements de fonctionnalités 
            sans préavis. En utilisant cette version Beta, vous acceptez ces conditions particulières.
          </p>
        </section>

        <section>
          <h2>2. Description du service</h2>
          <p>
            Athlia est une plateforme de fitness qui propose :
          </p>
          <ul>
            <li>Un tableau de bord personnel avec historique d'exercices</li>
            <li>Des exercices personnalisés selon vos contraintes physiques</li>
            <li>Un squelette 3D interactif pour visualiser les exercices</li>
            <li>Des recommandations adaptées à vos objectifs</li>
          </ul>
        </section>

        <section>
          <h2>3. Inscription et compte utilisateur</h2>
          
          <h3>3.1 Création de compte</h3>
          <p>
            Pour utiliser Athlia, vous devez créer un compte en fournissant des informations 
            exactes et à jour. Vous êtes responsable de maintenir la confidentialité de vos 
            identifiants de connexion.
          </p>

          <h3>3.2 Responsabilités du compte</h3>
          <ul>
            <li>Vous êtes responsable de toutes les activités sous votre compte</li>
            <li>Vous devez nous informer immédiatement de toute utilisation non autorisée</li>
            <li>Vous ne pouvez pas partager votre compte avec d'autres personnes</li>
            <li>Vous devez utiliser des informations exactes lors de l'inscription</li>
          </ul>
          
          <p className="info-note">
            <strong>Note :</strong> Athlia est une plateforme individuelle sans fonctionnalités 
            de messagerie ou d'interaction entre utilisateurs. Votre utilisation reste privée 
            et personnelle.
          </p>
        </section>

        <section>
          <h2>4. Utilisation acceptable</h2>
          <p>Vous vous engagez à utiliser Athlia uniquement pour des fins légales et appropriées :</p>
          
          <h3>4.1 Utilisations autorisées</h3>
          <ul>
            <li>Accéder à votre tableau de bord personnel</li>
            <li>Consulter et effectuer des exercices recommandés</li>
            <li>Utiliser le squelette 3D pour visualiser les mouvements</li>
            <li>Suivre vos progrès et statistiques</li>
          </ul>

          <h3>4.2 Utilisations interdites</h3>
          <ul>
            <li>Tenter de contourner les mesures de sécurité ou d'accéder à des zones restreintes</li>
            <li>Transmettre des virus, malwares ou tout code malveillant</li>
            <li>Effectuer du reverse engineering ou tenter de copier le code source</li>
            <li>Utiliser des outils automatisés (bots, scrapers) pour extraire des données</li>
            <li>Violer les droits de propriété intellectuelle d'Athlia</li>
          </ul>
        </section>

        <section>
          <h2>5. Contenu et propriété intellectuelle</h2>
          
          <h3>5.1 Nos droits</h3>
          <p>
            Athlia et son contenu (exercices, interface, squelette 3D) sont protégés par 
            les droits de propriété intellectuelle. Nous conservons tous les droits sur 
            notre plateforme et son contenu.
          </p>

          <h3>5.2 Votre contenu</h3>
          <p>
            Vous conservez vos droits sur le contenu que vous ajoutez à votre profil. 
            En utilisant Athlia, vous nous accordez une licence limitée pour utiliser 
            ce contenu dans le cadre de nos services.
          </p>
        </section>

        <section>
          <h2>6. Limitation de responsabilité</h2>
          
          <p className="warning-note">
            <strong>⚠️ Disclaimer médical important :</strong> Athlia est un outil de suivi d'exercices 
            et ne remplace en aucun cas les conseils médicaux professionnels. Avant de commencer tout 
            programme d'exercices, consultez un médecin ou un professionnel de santé qualifié, 
            particulièrement si vous avez des problèmes de santé, des blessures ou des contraintes physiques.
          </p>
          
          <h3>6.1 Limitation générale</h3>
          <p>
            Dans toute la mesure permise par la loi française, Athlia ne sera pas responsable des 
            dommages directs, indirects, accessoires, consécutifs ou punitifs résultant de :
          </p>
          <ul>
            <li>L'utilisation ou l'impossibilité d'utiliser le service</li>
            <li>Les blessures physiques résultant de l'exécution d'exercices</li>
            <li>Les erreurs, bugs ou interruptions du service (version Beta)</li>
            <li>La perte de données ou la corruption de fichiers</li>
          </ul>
        </section>

        <section>
          <h2>7. Disponibilité du service</h2>
          <p>
            Nous nous efforçons de maintenir Athlia disponible 24h/24 et 7j/7, mais nous 
            ne garantissons pas une disponibilité continue. Nous pouvons interrompre le 
            service pour maintenance ou améliorations.
          </p>
        </section>

        <section>
          <h2>8. Modifications du service et des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier, suspendre ou arrêter Athlia à tout moment, 
            en particulier durant la phase Beta. Nous vous informerons des changements importants 
            via une notification sur le site. La date de dernière mise à jour est toujours visible 
            en haut de ce document.
          </p>
          <p>
            En continuant à utiliser Athlia après des modifications, vous acceptez automatiquement 
            les nouvelles conditions. Si vous n'acceptez pas les modifications, vous devez cesser 
            d'utiliser le service.
          </p>
        </section>

        <section>
          <h2>9. Résiliation</h2>
          
          <h3>9.1 Résiliation par vous</h3>
          <p>
            Vous pouvez supprimer votre compte à tout moment directement depuis votre profil utilisateur. 
            La suppression de votre compte entraînera la suppression définitive de toutes vos données 
            personnelles, exercices et statistiques.
          </p>
          
          <h3>9.2 Résiliation par Athlia</h3>
          <p>
            Nous nous réservons le droit de suspendre ou résilier votre accès à tout moment si vous :
          </p>
          <ul>
            <li>Violez ces conditions d'utilisation</li>
            <li>Utilisez le service de manière frauduleuse ou abusive</li>
            <li>Mettez en danger la sécurité ou la stabilité de la plateforme</li>
          </ul>
        </section>

        <section>
          <h2>10. Droit applicable</h2>
          <p>
            Ces conditions d'utilisation sont régies par le droit français. 
            Tout litige sera soumis à la compétence des tribunaux français.
          </p>
        </section>

        <section>
          <h2>11. Contact et questions</h2>
          <p>
            Pour toute question concernant ces conditions d'utilisation, pour signaler 
            un problème ou pour toute demande d'information, contactez-nous :
          </p>
          <ul>
            <li><strong>Formulaire de contact :</strong> Disponible sur la page d'accueil du site</li>
            <li><strong>Questions juridiques :</strong> Utilisez le formulaire de contact en précisant "Question juridique"</li>
          </ul>
          
          <p className="info-note">
            <strong>Note :</strong> Nous nous efforçons de répondre à toutes les demandes dans 
            un délai raisonnable. Pour les questions urgentes liées à la sécurité de votre compte, 
            précisez-le dans votre message.
          </p>
        </section>

        <div className="terms-footer">
          <p>
            <strong>Accord complet :</strong> Ces conditions d'utilisation constituent l'accord complet 
            entre vous et Athlia concernant l'utilisation de notre service. Elles remplacent tous 
            les accords antérieurs ou contemporains, écrits ou oraux. En cas de conflit entre 
            ces conditions et d'autres documents, ces conditions prévalent.
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

export default TermsOfService; 