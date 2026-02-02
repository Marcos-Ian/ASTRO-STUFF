import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
      // Random angle
      const theta = Math.random() * Math.PI * 2;
      // Random radius within belt
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      // Random vertical offset for thickness
      const y = (Math.random() - 0.5) * beltWidth;
      // Position
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // Random scale
      const scale = minSize + Math.random() * (maxSize - minSize);
      // Random rotation
      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
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
