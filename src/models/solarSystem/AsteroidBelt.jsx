import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const hash = (seed) => {
  const value = Math.sin(seed) * 43758.5453123;
  return value - Math.floor(value);
};

/* =======================
   Asteroid Belt (Main Belt Example)
   - Uses InstancedMesh for performance
======================= */
export function AsteroidBelt({
  innerRadius = 480, // between Mars and Jupiter (in your units)
  outerRadius = 700,
  beltWidth = 60,
  count = 600,
  minSize = 1.2,
  maxSize = 3.5,
  orbitSpeed = 0.0002,
  speedMultiplier = 1
}) {
  const meshRef = useRef();
  const groupRef = useRef();
  // Optionally, use a rocky texture or just a gray color
  // const texture = useTexture('/textures/asteroid.jpg');

  // Precompute asteroid transforms
  const asteroids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random values keep render output idempotent.
      const theta = hash(i * 17.13 + 0.1) * Math.PI * 2;
      const r = innerRadius + hash(i * 31.7 + 1.3) * (outerRadius - innerRadius);
      const y = (hash(i * 47.9 + 2.7) - 0.5) * beltWidth;
      // Position
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const scale = minSize + hash(i * 59.2 + 3.1) * (maxSize - minSize);
      const rot = [
        hash(i * 71.4 + 4.2) * Math.PI,
        hash(i * 83.6 + 5.8) * Math.PI,
        hash(i * 97.1 + 6.4) * Math.PI,
      ];
      arr.push({ position: [x, y, z], scale, rotation: rot });
    }
    return arr;
  }, [count, innerRadius, outerRadius, beltWidth, minSize, maxSize]);

  // Animate the belt's rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += orbitSpeed * speedMultiplier;
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;
    asteroids.forEach((ast, i) => {
      const m = new THREE.Matrix4();
      m.compose(
        new THREE.Vector3(...ast.position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...ast.rotation)),
        new THREE.Vector3(ast.scale, ast.scale, ast.scale)
      );
      meshRef.current.setMatrixAt(i, m);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [asteroids]);

  return (
    <group ref={groupRef}>
      <instancedMesh frustumCulled={false} ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#888888" roughness={1} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}
