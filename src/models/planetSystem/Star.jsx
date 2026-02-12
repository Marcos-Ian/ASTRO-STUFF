import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Html, useTexture } from '@react-three/drei';
import { useSpin } from './useSpin';

export function Star({
  name,
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
      {name && (
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
            {name}
          </div>
        </Html>
      )}
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
