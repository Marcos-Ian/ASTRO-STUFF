import React from 'react';
import { PlanetSystem } from './planetSystem';
import { kepler10System } from '../data/planetSystems';

export default function Kepler10System({
  position = [0, 0, 0],
  scale = 1,
  speedMultiplier = 1,
  onPlanetClick,
  onPlanetRef,
}) {
  return (
    <group position={position} scale={scale}>
      <PlanetSystem
        system={kepler10System}
        speedMultiplier={speedMultiplier}
        onPlanetClick={(planet) => {
          if (onPlanetClick) onPlanetClick(planet, kepler10System);
        }}
        onPlanetRef={onPlanetRef}
      />
    </group>
  );
}
