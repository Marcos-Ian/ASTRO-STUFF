import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';
import { useSpin } from './useSpin';

export function Star({
  radius,
  color = '#ffffff',
  texture,
  intensity = 50000,
  distance = 0,
  decay = 2,
  rotationSpeed = 0,
  speedMultiplier = 1,
  glow,
}) {
  const starRef = useRef();
  const starTexture = useTexture(texture || '/textures/sun.jpg');

  useEffect(() => {
    if (!starTexture) return;
    starTexture.colorSpace = THREE.SRGBColorSpace;
    starTexture.anisotropy = 16;
    starTexture.minFilter = THREE.LinearMipmapLinearFilter;
    starTexture.magFilter = THREE.LinearFilter;
    starTexture.needsUpdate = true;
  }, [starTexture]);

  useSpin(starRef, { speed: rotationSpeed, speedMultiplier });

  return (
    <group>
      <pointLight intensity={intensity} decay={decay} distance={distance} color={color} />
      <mesh ref={starRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial map={starTexture} color={color} toneMapped />
      </mesh>
      {glow && (
        <mesh>
          <sphereGeometry args={[radius * (glow.scale ?? 1.03), 64, 64]} />
          <meshBasicMaterial
            color={glow.color ?? color}
            transparent
            opacity={glow.opacity ?? 0.25}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            toneMapped
          />
        </mesh>
      )}
    </group>
  );
}
