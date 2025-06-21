import "./CardsFeatures.css";

/**
 * CardsFeatures component
 *
 * This component displays feature cards on the home page.
 *
 * - The returned JSX contains a section with three cards:
 *   - Progress Tracking: Shows stats and visuals to monitor improvements.
 *   - Personalized Programs: Customized exercise plans for each user.
 *   - 3D Mannequin: Lets users select body parts to work on using a 3D model.
 */
function CardsFeatures() {
  return (
    <section id="cards-features">
      {/* Progress Tracking card */}
      <div id="card">
        <h3>Progress Tracking</h3>
        <p>
          Monitor your improvements and stay motivated with detailed stats and
          visuals.
        </p>
      </div>
      {/* Personalized Programs card */}
      <div id="card">
        <h3>Personalized Programs</h3>
        <p>
          Customized exercise plans suited to your level and goals, updated as
          you progress.
        </p>
      </div>
      {/* 3D Mannequin card */}
      <div id="card">
        <h3>3D Mannequin</h3>
        <p>Use a 3D model to choose the part you want to work.</p>
      </div>
    </section>
  );
}

export default CardsFeatures;
