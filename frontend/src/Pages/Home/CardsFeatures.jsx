import "./CardsFeatures.css";

// Affichage cards de fonctionnalités

function CardsFeatures() {
  return (
    <section id="cards-features">
      {/* Progress Tracking card */}
      <div className="card">
        <h3>Suivi des progrès</h3>
        <p>
          Suivez vos progrès et restez motivé avec des statistiques détaillées et des visualisations.
        </p>
      </div>
      {/* Personalized Programs card */}
      <div className="card">
        <h3>Programmes personnalisés</h3>
        <p>
          Créez des programmes personnalisés adaptés à votre niveau et à vos objectifs, mis à jour à mesure que vous progressez.
        </p>
      </div>
      {/* 3D Mannequin card */}
      <div className="card">
        <h3>Mannequin 3D</h3>
        <p>Utilisez un mannequin 3D pour choisir la partie que vous voulez travailler.</p>
      </div>
    </section>
  );
}

export default CardsFeatures;