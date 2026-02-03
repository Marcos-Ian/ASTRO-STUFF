import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshWobbleMaterial, useTexture } from '@react-three/drei';
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
}) {
  const planetRef = useRef();
  const planetTexture = useTexture(texture || '/textures/earth.jpg');

  useEffect(() => {
    if (!planetTexture) return;
    planetTexture.colorSpace = THREE.SRGBColorSpace;
    planetTexture.anisotropy = 16;
    planetTexture.minFilter = THREE.LinearMipmapLinearFilter;
    planetTexture.magFilter = THREE.LinearFilter;
    planetTexture.wrapS = THREE.RepeatWrapping;
    planetTexture.wrapT = THREE.ClampToEdgeWrapping;
    planetTexture.needsUpdate = true;
  }, [planetTexture]);

  useSpin(planetRef, { speed: rotationSpeed, speedMultiplier });

  const ringTexture = useTexture(rings?.texture || '/textures/saturn_rings.png');
  useEffect(() => {
    if (!rings || !ringTexture) return;
    ringTexture.colorSpace = THREE.SRGBColorSpace;
    ringTexture.anisotropy = 8;
    ringTexture.minFilter = THREE.LinearMipmapLinearFilter;
    ringTexture.magFilter = THREE.LinearFilter;
    ringTexture.needsUpdate = true;
  }, [rings, ringTexture]);

  const ringGeometry = useMemo(() => {
    if (!rings) return null;
    return new THREE.RingGeometry(rings.innerRadius, rings.outerRadius, rings.segments ?? 64);
  }, [rings]);

  return (
    <group rotation={[THREE.MathUtils.degToRad(axialTilt), 0, 0]}>
      <mesh ref={planetRef} castShadow receiveShadow>
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
            map={rings.texture ? ringTexture : null}
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
              speed={moon.orbit?.speed ?? 0}
              inclination={moon.orbit?.inclination ?? 0}
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
              />
            </Orbit>
          ))
        : null}
    </group>
  );
}
