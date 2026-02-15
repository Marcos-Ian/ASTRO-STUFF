import React from 'react';
import { PlanetSystem } from './planetSystem';
import { kepler90System } from '../data/planetSystems';

export default function Kepler90System({
  position = [0, 0, 0],
  scale = 1,
  speedMultiplier = 1,
  onPlanetClick,
  onPlanetRef,
  onStarClick,
}) {
  return (
    <group position={position} scale={scale}>
      <PlanetSystem
        system={kepler90System}
        speedMultiplier={speedMultiplier}
        onPlanetClick={(planet) => {
          if (onPlanetClick) onPlanetClick(planet, kepler90System);
        }}
        onPlanetRef={onPlanetRef}
        onStarClick={onStarClick}
      />
    </group>
  );
}
