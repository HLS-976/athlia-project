import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Login from "./Pages/Login/LoginPage";
import SignUpPage from "./Pages/Sign_Up/SignUpPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard/DashBoard";
import ExercisesPage from "./Pages/Exercises/ExercisesPage";
import SkeletonPage from "./Pages/Skeleton/SkeletonPage";
import CombinedPage from "./Pages/CombinedPage/CombinedPage";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import ProfilePage from "./Pages/Profile/Profile";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./Pages/TermsOfService/TermsOfService";

function AppContent() {
  const location = useLocation();
  
  // pages avec propre header
  const pagesWithoutGlobalHeader = ['/dashboard', '/combined', '/exercises', '/skeleton', '/profile'];
  const shouldShowGlobalHeader = !pagesWithoutGlobalHeader.includes(location.pathname);

  return (
    <div id="App">
      {/* <ScrollEffects /> */}
      {shouldShowGlobalHeader && <Header />}
      <div className="background-anim">
          {/* Décorations globales */}
          <div className="parallax-layer"></div>
          <div className="parallax-layer"></div>
          <div className="morphing-shapes">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="morphing-shape"></div>
            ))}
          </div>
          <div className="energy-pulse"></div>
          <div className="light-trails">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="light-trail"></div>
            ))}
          </div>
          <div className="interactive-particles">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="interactive-particle"></div>
            ))}
          </div>
          <div className="tech-glow"></div>
          <div className="floating-particles">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/exercises"
                element={
                  <PrivateRoute>
                    <ExercisesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/skeleton"
                element={
                  <PrivateRoute>
                    <SkeletonPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/combined"
                element={
                  <PrivateRoute>
                    <CombinedPage />
                  </PrivateRoute>
                }
              />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;