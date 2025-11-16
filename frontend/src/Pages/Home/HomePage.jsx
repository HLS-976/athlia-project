import React from "react";
import { Link } from "react-router-dom";
import CardsFeatures from "./CardsFeatures";
import FeaturesSection from "./FeaturesSection";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import DashboardHeader from "../Dashboard/Header";
import "./HomePage.css";

/**
 * HomePage Component
 *
 * This component renders the main homepage with:
 * - The appropriate header based on login status
 * - A hero section with video background and overlay text.
 * - A main button: "Get Started" (links to login).
 */

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Vérifier l'état de connexion
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(loggedIn && token);
    };

    checkLoginStatus();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      // Gestion du scroll pour l'animation
      if (scrollPosition > heroHeight * 0.3) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Premier scroll détecté
      if (scrollPosition > 10) {
        setHasScrolled(true);
      }
    };

    // Déclencher les animations immédiatement
    const timer = setTimeout(() => {
      setHasScrolled(true);
    }, 100);

    window.addEventListener("scroll", handleScroll);

    // Écouter les changements de localStorage pour l'état de connexion
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
      clearTimeout(timer);
    };
  }, []);

  const title = "Transformez votre corps avec Athlia";
  const presentation =
    "Découvrez une approche révolutionnaire de la remise en forme, combinant technologie de pointe et expertise scientifique pour des résultats exceptionnels.";

  return (
    <main>
      {/* Afficher le header approprié selon l'état de connexion */}
      {isLoggedIn ? <DashboardHeader /> : <Header />}

      <div id="hero-section" ref={heroRef}>
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>

        {/* Content overlay with scroll animation */}
        <div className={`hero-content ${isScrolled ? "scroll-hidden" : ""}`}>
          <div className="content-container">
            <h1 id="hero-title">
              <span className="title-line">{title}</span>
            </h1>

            <p id="hero-presentation">{presentation}</p>

            <div id="hero-button">
              {/* Adapter le bouton selon l'état de connexion */}
              <Link to={isLoggedIn ? "/combined" : "/login"}>
                <button id="hero-get-started">
                  <span>{isLoggedIn ? "Mes Exercices" : "Commencer"}</span>
                  <span className="button-icon">→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
          <span>Découvrir</span>
        </div>
      </div>

      <div id="Home-Contenaire">
        <div id="HomePage" className={hasScrolled ? "scroll-triggered" : ""}>
          <CardsFeatures />
          <AboutSection />
          <FeaturesSection />
          <ContactSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
