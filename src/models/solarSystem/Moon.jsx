import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';

/* =======================
   Moon
======================= */
export function Moon({ size, texturePath, fallbackColor, orbitRadius, orbitSpeed, rotationSpeed, speedMultiplier = 1 }) {
  const moonRef = useRef();
  const orbitRef = useRef();

  const texture = useTexture(texturePath, undefined, () => {
    console.warn(`Failed to load moon texture: ${texturePath}`);
  });

  useFrame(() => {
    if (orbitRef.current) orbitRef.current.rotation.y += orbitSpeed * speedMultiplier;
    if (moonRef.current) moonRef.current.rotation.y += rotationSpeed * speedMultiplier;
  });

  const hasTexture = texture && texture.image;

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]}>
        <Sphere ref={moonRef} args={[size, 32, 32]} castShadow receiveShadow>
          <meshStandardMaterial
            map={hasTexture ? texture : null}
            color={hasTexture ? undefined : fallbackColor}
            roughness={0.9}
            metalness={0.05}
          />
        </Sphere>
      </group>
    </group>
  );
}
