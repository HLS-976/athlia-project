import React from "react";
import { Link } from "react-router-dom";
import CardsFeatures from "./CardsFeatures";
import FeaturesSection from "./FeaturesSection";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import Header from "./Header";
import { useEffect, useState, useRef } from "react";
import "./HomePage.css";

/**
 * HomePage Component
 * 
 * This component renders the main homepage with:
 * - The header bar at the top.
 * - A hero section with video background and overlay text.
 * - A main button: "Get Started" (links to login).
 */

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
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
    }, 100); // Réduit de 1000ms à 100ms

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const title = "Transformez votre corps avec Athlia";
  const presentation = "Découvrez une approche révolutionnaire de la remise en forme, combinant technologie de pointe et expertise scientifique pour des résultats exceptionnels.";

  return (
    <main>
      {/* Header */}
      <Header />
      
      <div id="hero-section" ref={heroRef}>
        <div className="video-background">
          <video autoPlay muted loop playsInline>
            <source src="/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
        
        {/* Content overlay with scroll animation */}
        <div className={`hero-content ${isScrolled ? 'scroll-hidden' : ''}`}>
          <div className="content-container">
            <h1 id="hero-title">
              <span className="title-line">{title}</span>
            </h1>
            
            <p id="hero-presentation">
              {presentation}
            </p>
            
            <div id="hero-button">
              <Link to="/login">
                <button id="hero-get-started">
                  <span>Commencer</span>
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
        <div id="HomePage" className={hasScrolled ? 'scroll-triggered' : ''}>
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