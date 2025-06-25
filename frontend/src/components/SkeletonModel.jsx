import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const DEFAULT_COLOR = new THREE.Color(0xD4A574);
const HOVER_COLOR = new THREE.Color(0x00BCD4);
const selectedMeshes = new Map();

const zonesData = {
    'Jambes': { color: new THREE.Color(0xE91E63) },
    'Fessiers': { color: new THREE.Color(0xE91E63) },
    'Abdos': { color: new THREE.Color(0xE91E63) },
    'Dos': { color: new THREE.Color(0xE91E63) },
    'Pectoraux': { color: new THREE.Color(0xE91E63) },
    'Epaules': { color: new THREE.Color(0xE91E63) },
    'Bras': { color: new THREE.Color(0xE91E63) },
    'Non classé': { color: new THREE.Color(0x607D8B) },
}

const SkeletonModel = forwardRef((props, ref) => {
    const modelGroupRef = useRef();
    const [gltf, setGltf] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredMesh, setHoveredMesh] = useState(null);
    const [, setSelectionCount] = useState(0);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(
            '/SKELETON.glb',
            (gltf) => {
                // position modèle
                const modelBox = new THREE.Box3().setFromObject(gltf.scene);
                const modelCenter = modelBox.getCenter(new THREE.Vector3());
                gltf.scene.position.sub(modelCenter);
                
                // taille modèle
                const modelSize = modelBox.getSize(new THREE.Vector3());
                const maxDimension = Math.max(modelSize.x, modelSize.y, modelSize.z);
                const scale = 200 / maxDimension;
                gltf.scene.scale.set(scale, scale, scale);
                
                // Rotation
                gltf.scene.rotation.y = Math.PI;

                //  matériaux et zones pour chaque mesh
                gltf.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({
                            color: DEFAULT_COLOR,
                            metalness: 0.0,
                            roughness: 0.5,
                            transparent: false,
                            opacity: 1.0,
                            envMapIntensity: 0.15,
                        });

                        child.userData.originalColor = new THREE.Color().copy(DEFAULT_COLOR);
                        child.userData.name = child.name;

                        const objectZone = Object.keys(zonesData).find(zoneKey => 
                            child.name.toLowerCase().includes(zoneKey.toLowerCase())
                        );
                        
                        const excludedParts = ['Pelvis', 'Cou', 'Tete'];
                        const isExcluded = excludedParts.some(part => 
                            child.name.toLowerCase().includes(part.toLowerCase())
                        );

                        if (objectZone && !isExcluded) {
                            child.userData.zone = objectZone;
                        } else {
                            child.userData.zone = 'Non classé';
                        }
                    }
                });

                setGltf(gltf);
                setLoading(false);
            },
            (progress) => {
                console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Error loading GLTF:', error);
                setError(error);
                setLoading(false);
            }
        );
    }, []);

    const handleClick = (event) => {
        event.stopPropagation();

        const clickedObject = event.object;
        const zoneName = clickedObject.userData.zone;

        if (zoneName && zoneName !== 'Non classé') {
            if (selectedMeshes.has(clickedObject.uuid)) {
                clickedObject.material.color.set(clickedObject.userData.originalColor);
                selectedMeshes.delete(clickedObject.uuid);
                console.log(`❌ Désélectionné: ${clickedObject.name} (${zoneName})`);
            } else {
                const targetColor = zonesData[zoneName].color;
                clickedObject.material.color.set(targetColor);
                selectedMeshes.set(clickedObject.uuid, {
                    mesh: clickedObject,
                    name: clickedObject.name,
                    zone: zoneName
                });
                console.log(`✅ Sélectionné: ${clickedObject.name} (${zoneName})`);
            }

            setSelectionCount(prev => prev + 1);
            
            // nombre total de zones sélectionnées
            console.log(`📊 Total zones sélectionnées: ${selectedMeshes.size}`);
        } else {
            console.log(`❌ Clic ignoré sur : ${clickedObject.name} (Zone: ${zoneName || 'Non reconnue/exclue'})`);
        }
    };

    const handlePointerOver = (event) => {
        event.stopPropagation();
        const intersected = event.object;
        const zoneName = intersected.userData.zone;

        if (selectedMeshes.has(intersected.uuid) || zoneName === 'Non classé' || !zoneName) {
            return;
        }
        if (hoveredMesh !== intersected) {
            if (hoveredMesh && !selectedMeshes.has(hoveredMesh.uuid)) {
                hoveredMesh.material.color.set(hoveredMesh.userData.originalColor);
            }

            setHoveredMesh(intersected);
            intersected.material.color.set(HOVER_COLOR);
        }
    };

    const handlePointerOut = (event) => {
        event.stopPropagation();
        const exited = event.object;
        if (hoveredMesh && hoveredMesh.uuid === exited.uuid && !selectedMeshes.has(exited.uuid)) {
            exited.material.color.set(exited.userData.originalColor);
            setHoveredMesh(null);
        }
    };

    useImperativeHandle(ref, () => ({
        resetColors: () => {
            modelGroupRef.current.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.set(DEFAULT_COLOR);
                    child.userData.originalColor = new THREE.Color().copy(DEFAULT_COLOR);
                }
            });
            selectedMeshes.clear();
            setHoveredMesh(null);
            setSelectionCount(prev => prev + 1);
            console.log('Reset colors');
        },
        logAllObjects: () => {
            console.log('=== TOUS LES OBJETS DU MODÈLE ===');
            modelGroupRef.current.traverse((child) => {
                if (child.isMesh) {
                    console.log(`Nom: ${child.name} | Zone: ${child.userData.zone || 'Non définie'}`);
                }
            });
        },
        getSelectedZones: () => {
            const selectedZones = Array.from(selectedMeshes.keys()).map(uuid => selectedMeshes.get(uuid).name);
            console.log('=== ZONES SÉLECTIONNÉES ===');
            if (selectedZones.length === 0) {
                console.log('Aucune zone sélectionnée');
            } else {
                selectedZones.forEach((zone, index) => {
                    console.log(`${index + 1}. ${zone}`);
                });
            }
            return selectedZones;
        }
    }));

    // Si en cours de chargement ou erreur, ne rien rendre dans le Canvas
    if (loading || error || !gltf || !gltf.scene) {
        return null;
    }

    return (
        <primitive
            object={gltf.scene}
            ref={modelGroupRef}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        />
    );
});

export default SkeletonModel;