import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Html, MeshWobbleMaterial, useTexture } from '@react-three/drei';
import { useSpin } from './useSpin';
import { Orbit } from './Orbit';

const DEFAULT_SEGMENTS = 64;

export function Planet({
  radius,
  color = '#ffffff',
  texture,
  rotationSpeed = 0,
  axialTilt = 0,
  speedMultiplier = 1,
  material,
  rings,
  atmosphere,
  glow,
  moons,
  onClick,
  planetData,
  onPlanetRef,
  planetId,
}) {
  const planetRef = useRef();
  const planetGroupRef = useRef();
  const sourcePlanetTexture = useTexture(texture || '/textures/earth.jpg');
  const planetTexture = useMemo(() => {
    if (!sourcePlanetTexture) return null;
    const nextTexture = sourcePlanetTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 16;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.wrapS = THREE.RepeatWrapping;
    nextTexture.wrapT = THREE.ClampToEdgeWrapping;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [sourcePlanetTexture]);

  useEffect(() => {
    return () => {
      if (planetTexture) planetTexture.dispose();
    };
  }, [planetTexture]);

  useSpin(planetRef, { speed: rotationSpeed, speedMultiplier });

  useEffect(() => {
    if (onPlanetRef && planetId) {
      onPlanetRef(planetId, planetGroupRef.current);
    }
    return () => {
      if (onPlanetRef && planetId) onPlanetRef(planetId, null);
    };
  }, [onPlanetRef, planetId]);

  const sourceRingTexture = useTexture(rings?.texture || '/textures/saturn_rings.png');
  const ringTexture = useMemo(() => {
    if (!rings?.texture || !sourceRingTexture) return null;
    const nextTexture = sourceRingTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 8;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [rings?.texture, sourceRingTexture]);

  useEffect(() => {
    return () => {
      if (ringTexture) ringTexture.dispose();
    };
  }, [ringTexture]);

  const ringGeometry = useMemo(() => {
    if (!rings) return null;
    return new THREE.RingGeometry(rings.innerRadius, rings.outerRadius, rings.segments ?? 64);
  }, [rings]);

  return (
    <group ref={planetGroupRef} rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}>
      <mesh
        ref={planetRef}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(planetData);
        }}
        onPointerOver={(e) => {
          if (!onClick) return;
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          if (!onClick) return;
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[radius, DEFAULT_SEGMENTS, DEFAULT_SEGMENTS]} />
        {material?.type === 'wobble' ? (
          <MeshWobbleMaterial
            map={planetTexture}
            color={color}
            factor={material.factor ?? 0.2}
            speed={material.speed ?? 1}
            opacity={material.opacity ?? 1}
            envMapIntensity={material.envMapIntensity ?? 1}
            clearcoat={material.clearcoat ?? 0}
            clearcoatRoughness={material.clearcoatRoughness ?? 0.5}
          />
        ) : (
          <meshStandardMaterial
            map={planetTexture}
            color={color}
            roughness={material?.roughness ?? 0.6}
            metalness={material?.metalness ?? 0.1}
          />
        )}
      </mesh>

      {/* {planetData?.name && (
        <Html
          position={[0, -(radius + 10), 0]}
          center
          distanceFactor={30}
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -1,
          }}
        >
          <div
            style={{
              color: 'white',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '400px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            {planetData.name}
          </div>
        </Html>
      )} */}

      {atmosphere && (
        <mesh>
          <sphereGeometry args={[radius * (atmosphere.scale ?? 1.02), DEFAULT_SEGMENTS, DEFAULT_SEGMENTS]} />
          <meshStandardMaterial
            color={atmosphere.color ?? '#8ab4f8'}
            transparent
            opacity={atmosphere.opacity ?? 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {glow && (
        <mesh>
          <sphereGeometry args={[radius * (glow.scale ?? 1.05), DEFAULT_SEGMENTS, DEFAULT_SEGMENTS]} />
          <meshBasicMaterial
            color={glow.color ?? '#60a5fa'}
            transparent
            opacity={glow.opacity ?? 0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {rings && ringGeometry && (
        <mesh rotation={[Math.PI / 2, 0, 0]} geometry={ringGeometry}>
          <meshStandardMaterial
            map={ringTexture}
            color={rings.color ?? '#d1c3a1'}
            transparent
            opacity={rings.opacity ?? 0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {moons?.length
        ? moons.map((moon) => (
            <Orbit
              key={moon.id}
              radius={moon.orbit?.radius ?? 0}
              semiMajorAxis={moon.orbit?.semiMajorAxis}
              eccentricity={moon.orbit?.eccentricity}
              speed={moon.orbit?.speed ?? 0}
              period={moon.orbit?.period}
              phase={moon.orbit?.phase}
              inclination={moon.orbit?.inclination ?? 0}
              argumentOfPeriapsis={moon.orbit?.argumentOfPeriapsis}
              longitudeOfAscendingNode={moon.orbit?.longitudeOfAscendingNode}
              flatten
              speedMultiplier={speedMultiplier}
            >
              <Planet
                radius={moon.radius}
                color={moon.color}
                texture={moon.texture}
                rotationSpeed={moon.rotationSpeed}
                axialTilt={moon.axialTilt}
                speedMultiplier={speedMultiplier}
                material={moon.material}
                rings={moon.rings}
                atmosphere={moon.atmosphere}
                glow={moon.glow}
                moons={moon.moons}
                onClick={onClick}
                planetData={moon}
              />
            </Orbit>
          ))
        : null}
    </group>
  );
}
