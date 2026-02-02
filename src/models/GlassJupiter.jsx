import React from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Simple 3D model for "Glass Jupiter" (HD 189733 b)
export default function GlassJupiter({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = React.useRef();

  // Optional: animate rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Planet body */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[38, 64, 64]} />
        <MeshWobbleMaterial
          color="#3b82f6"
          factor={0.2}
          speed={1}
          opacity={0.85}
          envMapIntensity={1.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Optionally, add a faint ring or glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.3, 64]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls enablePan={false} enableZoom={false} />
    </group>
  );
}
