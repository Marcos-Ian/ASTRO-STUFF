import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* =======================
   Sun (FIXED so texture actually shows)
   Core uses MeshBasicMaterial so it won't get blown out by lighting.
   Glow is handled by additive corona shells + a more reasonable pointLight.
======================= */
export function Sun({ speedMultiplier = 1 }) {
  const sunRef = useRef();
  const coronaRef = useRef();
  const glowRef = useRef();

  const sourceSunTexture = useTexture('/textures/sun.jpg', undefined, () => {
    console.warn('Failed to load sun texture: /textures/sun.jpg');
  });
  const sunTexture = useMemo(() => {
    if (!sourceSunTexture) return null;
    const nextTexture = sourceSunTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 16;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [sourceSunTexture]);

  useEffect(() => {
    return () => {
      if (sunTexture) sunTexture.dispose();
    };
  }, [sunTexture]);

  useFrame(({ clock }) => {
    if (sunRef.current) sunRef.current.rotation.y += 0.0008 * speedMultiplier;

    // Subtle breathing glow so it feels alive (doesn't affect texture visibility)
    const t = clock.getElapsedTime();
    const pulseA = 0.42 + Math.sin(t * 2.0) * 0.05;
    const pulseB = 0.20 + Math.sin(t * 1.3 + 1.2) * 0.03;

    if (coronaRef.current) coronaRef.current.opacity = pulseA;
    if (glowRef.current) glowRef.current.opacity = pulseB;
  });

  return (
    <group>
      <pointLight intensity={550000} decay={2} distance={0} color="#FFF2CC" />

      {/* Core (shows texture clearly; ignores lights so it won't turn into a flat yellow ball) */}
      <Sphere ref={sunRef} args={[50, 64, 64]}>
        <meshBasicMaterial map={sunTexture} color="#ffffff" toneMapped={false} />
      </Sphere>

      {/* Corona */}
      <Sphere args={[51.8, 64, 64]}>
        <meshBasicMaterial
          ref={coronaRef}
          color="#ee8c03"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>
    </group>
  );
}
