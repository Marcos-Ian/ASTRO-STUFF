import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Html, useTexture } from '@react-three/drei';
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
  onClick,
  starData,
}) {
  const starRef = useRef();
  const sourceStarTexture = useTexture(texture || '/textures/sun.jpg');
  const starTexture = useMemo(() => {
    if (!sourceStarTexture) return null;
    const nextTexture = sourceStarTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 16;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [sourceStarTexture]);

  useEffect(() => {
    return () => {
      if (starTexture) starTexture.dispose();
    };
  }, [starTexture]);

  useSpin(starRef, { speed: rotationSpeed, speedMultiplier });

  return (
    <group>
      <pointLight intensity={intensity} decay={decay} distance={distance} color={color} />
      <mesh
        ref={starRef}
        onClick={(e) => {
          if (!onClick) return;
          e.stopPropagation();
          onClick(starData);
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
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial map={starTexture} color={color} toneMapped />
      </mesh>
      {/* {name && (
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
      )} */}
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
