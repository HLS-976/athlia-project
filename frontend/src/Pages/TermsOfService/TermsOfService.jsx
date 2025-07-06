import React from "react";
import "./TermsOfService.css";

const TermsOfService = () => {
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
            <li>Vous devez avoir au moins 13 ans pour créer un compte</li>
          </ul>
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
            <li>Utiliser le service à des fins commerciales non autorisées</li>
            <li>Tenter de contourner les mesures de sécurité</li>
            <li>Transmettre des virus ou du code malveillant</li>
            <li>Harceler ou intimider d'autres utilisateurs</li>
            <li>Violer les droits de propriété intellectuelle</li>
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
          <p>
            <strong>Disclaimer médical :</strong> Athlia ne remplace pas les conseils médicaux. 
            Consultez un professionnel de santé avant de commencer un programme d'exercices, 
            surtout si vous avez des problèmes de santé.
          </p>
          
          <p>
            <strong>Limitation de responsabilité :</strong> Dans toute la mesure permise par la loi, 
            Athlia ne sera pas responsable des dommages indirects, accessoires ou consécutifs 
            résultant de l'utilisation de notre service.
          </p>
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
          <h2>8. Modifications du service</h2>
          <p>
            Nous nous réservons le droit de modifier, suspendre ou arrêter Athlia à tout moment. 
            Nous vous informerons des changements importants via email ou notification sur le site.
          </p>
        </section>

        <section>
          <h2>9. Résiliation</h2>
          <p>
            Vous pouvez supprimer votre compte à tout moment. Nous pouvons également 
            suspendre ou résilier votre accès si vous violez ces conditions d'utilisation.
          </p>
        </section>

        <section>
          <h2>10. Droit applicable</h2>
          <p>
            Ces conditions d'utilisation sont régies par le droit français. 
            Tout litige sera soumis à la compétence des tribunaux français.
          </p>
        </section>

        <section>
          <h2>11. Contact</h2>
          <p>
            Pour toute question concernant ces conditions d'utilisation, contactez-nous :
          </p>
          <ul>
            <li>Email : legal@athlia.com</li>
            <li>Via notre formulaire de contact</li>
          </ul>
        </section>

        <div className="terms-footer">
          <p>
            <strong>Note :</strong> Ces conditions d'utilisation constituent l'accord complet 
            entre vous et Athlia concernant l'utilisation de notre service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 