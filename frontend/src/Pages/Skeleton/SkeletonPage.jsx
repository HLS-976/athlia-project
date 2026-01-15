import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SkeletonModel from "../../components/SkeletonModel";
import "./SkeletonPage.css";

function SkeletonPage({
  selectedZones = [],
  onZoneClick = null,
  onZoneDeselect = null,
}) {
  const skeletonModelRef = useRef();
  const [error, setError] = useState(null);
  const [autoRotate, setAutoRotate] = useState(false);

  if (error) {
    return (
      <div className="skeleton-page-error">
        <div className="skeleton-page-error-message">
          Erreur de chargement: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="skeleton-page-container">
      {/* icone rotation */}
      <button
        onClick={() => setAutoRotate(!autoRotate)}
        className={`skeleton-page-rotate-button ${autoRotate ? 'active' : ''}`}
        title={autoRotate ? "Arrêter la rotation automatique" : "Faire tourner automatiquement le squelette"}
      >
        <svg 
          className={`skeleton-page-rotate-icon ${autoRotate ? 'rotating' : ''}`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M23 4v6h-6"/>
          <path d="M1 20v-6h6"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
      </button>

      <Canvas
        camera={{ position: [0, 0, 400], fov: 75 }}
        shadows
        className="skeleton-page-canvas"
      >
        {/* Éclairage ambiant - plus fort */}
        <ambientLight intensity={0.8} color={0xffffff} />

        {/* Lumière directionnelle principale - plus forte */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={2.0}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          color={0xffffff}
        />

        {/* Lumière de remplissage - plus forte */}
        <directionalLight
          position={[-5, 5, -5]}
          intensity={1.0}
          color={0xffffff}
        />

        {/* Lumière d'accentuation - plus forte */}
        <pointLight position={[0, 10, 0]} intensity={1.0} color={0xffffff} />

        {/* Lumière pour la vue de derrière - plus forte */}
        <directionalLight
          position={[-10, 5, -10]}
          intensity={1.5}
          color={0xffffff}
        />

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={200}
          maxDistance={200}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableRotate
          rotateSpeed={0.5}
          enablePan={false}
          target={[0, 0, 0]}
          autoRotate={autoRotate}
          autoRotateSpeed={2.0}
        />

        <SkeletonModel
          ref={skeletonModelRef}
          selectedZones={selectedZones}
          onZoneClick={onZoneClick}
          onZoneDeselect={onZoneDeselect}
        />
      </Canvas>
    </div>
  );
}

export default SkeletonPage;
