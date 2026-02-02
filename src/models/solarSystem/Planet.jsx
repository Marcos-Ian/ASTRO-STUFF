import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* =======================
   Planet (now supports children)
   - children: follows planet orbit + position
   - tiltChildren: follows orbit + position + axial tilt
======================= */
export function Planet({
  size,
  texturePath,
  fallbackColor,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  emissive,
  axialTilt,
  children,
  tiltChildren,
  onClick,
  planetName,
  onPlanetRef,
  speedMultiplier = 1
}) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const positionGroupRef = useRef();

  const texture = useTexture(texturePath, undefined, () => {
    console.warn(`Failed to load texture: ${texturePath}`);
  });

  useFrame(() => {
    if (orbitRef.current && orbitSpeed) orbitRef.current.rotation.y += orbitSpeed * speedMultiplier;
    if (planetRef.current && rotationSpeed) planetRef.current.rotation.y += rotationSpeed * speedMultiplier;
  });

  const tiltRad = THREE.MathUtils.degToRad(axialTilt ?? 0);
  const hasTexture = texture && texture.image;

  useEffect(() => {
    if (onPlanetRef && planetName) {
      onPlanetRef(planetName, positionGroupRef.current);
    }
    return () => {
      if (onPlanetRef && planetName) onPlanetRef(planetName, null);
    };
  }, [onPlanetRef, planetName]);

  return (
    <group ref={orbitRef}>
      {/* This group is what moves around the sun */}
      <group position={[orbitRadius, 0, 0]} ref={positionGroupRef}>
        {/* Planet axial tilt group */}
        <group rotation={[tiltRad, 0, 0]}>
          <Sphere
            ref={planetRef}
            args={[size, 64, 64]}
            castShadow
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              console.log('Planet clicked:', planetName);
              if (onClick && planetName) {
                onClick(planetName);
              }
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'default';
            }}
          >
            <meshStandardMaterial
              map={hasTexture ? texture : null}
              color={hasTexture ? undefined : fallbackColor}
              emissive={emissive || '#000000'}
              emissiveIntensity={emissive ? 0.2 : 0}
              roughness={0.95}
              metalness={0}
            />
          </Sphere>

          {/* Stuff that should tilt with the planet (rings) */}
          {tiltChildren}
        </group>

        {/* Label - positioned below planet, outside tilt group */}
        <Html
          position={[0, -(size + 10), 0]}
          center
          distanceFactor={30}
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -1, // Negative z-index to ensure it's behind info panel
          }}
        >
          <div
            style={{
              color: 'white',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '450px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            {planetName}
          </div>
        </Html>

        {/* Stuff that should follow the planet position but NOT axial tilt (moons) */}
        {children}
      </group>
    </group>
  );
}
