import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SkeletonModel from '../../components/SkeletonModel';

function SkeletonPage({ 
  selectedZones = [], 
  onZoneClick = null, 
  onZoneDeselect = null 
}) {
    const skeletonModelRef = useRef();
    const [error, setError] = useState(null);

    if (error) {
        return (
            <div style={{ 
                position: 'relative', 
                width: '100vw', 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                backgroundColor: 'transparent'
            }}>
                <div style={{ 
                    fontSize: '24px', 
                    color: '#ff0000',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '20px 40px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(5px)'
                }}>
                    Erreur de chargement: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'transparent' }}>
            <Canvas
                camera={{ position: [0, 0, 400], fov: 75 }}
                shadows
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                {/* Éclairage ambiant - plus fort */}
                <ambientLight intensity={0.8} color={0xFFFFFF} />
                
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
                    color={0xFFFFFF}
                />
                
                {/* Lumière de remplissage - plus forte */}
                <directionalLight position={[-5, 5, -5]} intensity={1.0} color={0xE91E63} />
                
                {/* Lumière d'accentuation - plus forte */}
                <pointLight position={[0, 10, 0]} intensity={1.0} color={0xFFFFFF} />

                {/* Lumière pour la vue de derrière - plus forte */}
                <directionalLight position={[-10, 5, -10]} intensity={1.5} color={0xFFFFFF} />

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