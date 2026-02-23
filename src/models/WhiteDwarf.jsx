import React, { useEffect, useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WhiteDwarf({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  speedMultiplier = 1,
  rotationSpeed = 0.8,
  onClick,
}) {
  const groupRef = useRef(null);
  const sourceTexture = useTexture('/textures/whitedwarf.png');
  const texture = useMemo(() => {
    if (!sourceTexture) return null;
    const nextTexture = sourceTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 16;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [sourceTexture]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
      document.body.style.cursor = 'default';
    };
  }, [texture]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += rotationSpeed * speedMultiplier * delta;
  });

  const handleClick = (event) => {
    event.stopPropagation();
    if (onClick) onClick();
  };

  const handlePointerOver = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event) => {
    event.stopPropagation();
    document.body.style.cursor = 'default';
  };

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <pointLight intensity={42000} color="#e2f2ff" decay={2} />
      <mesh>
        <sphereGeometry args={[24, 64, 64]} />
        <meshStandardMaterial
          map={texture || sourceTexture}
          color="#f8fbff"
          emissive="#dbeafe"
          emissiveIntensity={0.65}
          roughness={0.35}
          metalness={0.05}
          toneMapped
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[27, 64, 64]} />
        <meshBasicMaterial
          color="#bfdbfe"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
