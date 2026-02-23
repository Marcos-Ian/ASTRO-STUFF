import React, { useEffect, useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import blackHoleModel from '../assets/3d/blackhole.glb';

export default function BlackHole({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  speedMultiplier = 1,
  rotationSpeed = 5,
  onClick,
}) {
  const groupRef = useRef(null);
  const { scene } = useGLTF(blackHoleModel);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += rotationSpeed * speedMultiplier * delta;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) onClick();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'default';
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(blackHoleModel);
