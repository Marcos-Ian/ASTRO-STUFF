import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { PlanetSystem } from './planetSystem';
import { glassJupiterSystem } from '../data/planetSystems';

export default function GlassJupiter({ position = [0, 0, 0], scale = 1, speedMultiplier = 1 }) {
  return (
    <group position={position} scale={scale}>
      <PlanetSystem system={glassJupiterSystem} speedMultiplier={speedMultiplier} />
      <OrbitControls enablePan={false} enableZoom={false} />
    </group>
  );
}
