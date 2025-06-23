import Header from "./Header";
import { Link } from "react-router-dom";
import CardsFeatures from "./CardsFeatures";
import "./HomePage.css";

/**
 * HomePage component
 *
 * This component displays the main landing page of the application.
 *
 * - The returned JSX contains:
 *   - The header bar at the top.
 *   - A main section with the title and presentation text.
 *   - Two main buttons: "Get Started" (links to login) and "Explore Features".
 *   - A section with feature cards (CardsFeatures component).
 */
const tittle = "Transform your body with Athlia";
const presentation =
  "Discover personalized sports exercises, track your progress, and reach your goals with a clean and motivating platform designed for athletes and beginners alike even with your injuries";

const HomePage = () => {
  return (
    <main>
      {/* Top header bar */}
      <header>
        <Header />
      </header>
      <div id="Home-Contenaire">
        <div id="HomePage">
          <div id="home">
            {/* Main title and presentation */}
            <h1 id="tittle">{tittle}</h1>
            <p id="presentation">{presentation}</p>
            {/* Main action buttons */}
            <div id="Home-Button">
              {/* Get Started button (links to login) */}
              <Link to="/login">
                <button id="Get-Started">Get Started</button>
              </Link>
              {/* Explore Features button */}
              <button id="Explore-Features">Explore Features</button>
            </div>
          </div>
          {/* Feature cards section */}
          <CardsFeatures />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
