import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// HD 189733 system scale (relative to Solar System units)
const STAR_RADIUS = 50 * 0.788; // ~39.4
const PLANET_RADIUS = 50 * 0.114; // ~5.7
const RSUN_IN_AU = 0.00465047;

// how many star-radii away the orbit is:
const ORBIT_IN_STAR_RADII = 0.031 / (0.788 * RSUN_IN_AU); // ≈ 8.46

const DISTANCE_SCALE = 0.25; // try 0.15–0.4
const ORBIT_RADIUS = STAR_RADIUS * ORBIT_IN_STAR_RADII * DISTANCE_SCALE;

const PLANET_AXIAL_TILT = 0; // Unknown, set to 0
const PLANET_ROTATION_SPEED = 0.04;
const ORBIT_SPEED = 0.08;

function HD189733Star({ position = [0, 0, 0], scale = 1, speedMultiplier = 1 }) {
  const starRef = useRef();
  const sunTexture = useTexture('/textures/sun.jpg');

  useEffect(() => {
    if (!sunTexture) return;
    sunTexture.colorSpace = THREE.SRGBColorSpace;
    sunTexture.anisotropy = 16;
    sunTexture.minFilter = THREE.LinearMipmapLinearFilter;
    sunTexture.magFilter = THREE.LinearFilter;
    sunTexture.needsUpdate = true;
  }, [sunTexture]);

  useFrame(() => {
    if (starRef.current) starRef.current.rotation.y += 0.0008 * speedMultiplier;
  });

  return (
    <group position={position} scale={scale}>
      <pointLight intensity={120000} decay={2} distance={0} color="#ffb347" />
      <Sphere ref={starRef} args={[STAR_RADIUS, 64, 64]}>
        <meshBasicMaterial map={sunTexture} color="#ffb347" toneMapped={true} />
      </Sphere>

      {/* Faint corona */}
      <Sphere args={[STAR_RADIUS * 1.03, 64, 64]}>
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          toneMapped={true}
        />
      </Sphere>
    </group>
  );
}

export default function GlassJupiter({ position = [0, 0, 0], scale = 1, speedMultiplier = 1 }) {
  const orbitRef = useRef();
  const planetRef = useRef();

  // ✅ HD 189733 b texture (same folder as sun.jpg)
  const hd189733bTexture = useTexture('/textures/HD189733b.png');

  useEffect(() => {
    if (!hd189733bTexture) return;
    hd189733bTexture.colorSpace = THREE.SRGBColorSpace;
    hd189733bTexture.anisotropy = 16;
    hd189733bTexture.minFilter = THREE.LinearMipmapLinearFilter;
    hd189733bTexture.magFilter = THREE.LinearFilter;
    hd189733bTexture.wrapS = THREE.RepeatWrapping;
    hd189733bTexture.wrapT = THREE.ClampToEdgeWrapping;
    hd189733bTexture.needsUpdate = true;
  }, [hd189733bTexture]);

  useFrame(() => {
    if (orbitRef.current) orbitRef.current.rotation.y += ORBIT_SPEED * speedMultiplier;
    if (planetRef.current) planetRef.current.rotation.y += PLANET_ROTATION_SPEED * speedMultiplier;
  });

  return (
    <group position={position} scale={scale}>
      <HD189733Star position={[0, 0, 0]} scale={1} speedMultiplier={speedMultiplier} />

      <group ref={orbitRef}>
        <group position={[ORBIT_RADIUS, 0, 0]}>
          <group rotation={[THREE.MathUtils.degToRad(PLANET_AXIAL_TILT), 0, 0]}>
            <mesh ref={planetRef} castShadow receiveShadow>
              <sphereGeometry args={[PLANET_RADIUS, 64, 64]} />
              <MeshWobbleMaterial
                map={hd189733bTexture}   // ✅ texture applied
                color="#ffffff"          // keep texture colors accurate
                factor={0.2}
                speed={1}
                opacity={0.95}
                envMapIntensity={1.2}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>

            {/* Faint glow */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <meshBasicMaterial color="#60a5fa" transparent opacity={0.18} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      </group>

      <OrbitControls enablePan={false} enableZoom={false} />
    </group>
  );
}
