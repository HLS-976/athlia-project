import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SkeletonModel from "../../components/SkeletonModel";

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
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            color: "#ff0000",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "20px 40px",
            borderRadius: "20px",
            backdropFilter: "blur(5px)",
          }}
        >
          Erreur de chargement: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      {/* icone rotation */}
      <button
        onClick={() => setAutoRotate(!autoRotate)}
        style={{
          position: "absolute",
          bottom: "30px",
          right: "30px",
          zIndex: 10,
          background: autoRotate ? "#2460f2" : "rgba(255, 255, 255, 0.95)",
          color: autoRotate ? "white" : "#2460f2",
          border: "2px solid #2460f2",
          borderRadius: "12px",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          transition: "all 0.3s ease",
          boxShadow: "0 6px 20px rgba(36, 96, 242, 0.2)",
          backdropFilter: "blur(10px)",
        }}
        title={autoRotate ? "Arrêter la rotation automatique" : "Faire tourner automatiquement le squelette"}
      >
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            transform: autoRotate ? "rotate(360deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease"
          }}
        >
          <path d="M23 4v6h-6"/>
          <path d="M1 20v-6h6"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
      </button>

      <Canvas
        camera={{ position: [0, 0, 400], fov: 75 }}
        shadows
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
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
