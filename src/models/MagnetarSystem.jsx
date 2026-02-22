import React from 'react';
import { PlanetSystem } from './planetSystem';
import { magnetarSystem } from '../data/planetSystems';

export default function MagnetarSystem({
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
        system={magnetarSystem}
        speedMultiplier={speedMultiplier}
        onPlanetClick={(planet) => {
          if (onPlanetClick) onPlanetClick(planet, magnetarSystem);
        }}
        onPlanetRef={onPlanetRef}
        onStarClick={onStarClick}
      />
    </group>
  );
}
