import React, { useRef } from 'react';
import * as THREE from 'three';
import { useSpin } from './useSpin';

export function Orbit({
  radius = 0,
  speed = 0,
  inclination = 0,
  speedMultiplier = 1,
  children,
}) {
  const orbitRef = useRef();

  useSpin(orbitRef, { speed, speedMultiplier });

  return (
    <group ref={orbitRef}>
      <group position={[radius, 0, 0]} rotation={[THREE.MathUtils.degToRad(inclination), 0, 0]}>
        {children}
      </group>
    </group>
  );
}
