import React from 'react';
import { PlanetSystem } from './planetSystem';
import { hr8799System } from '../data/planetSystems';

export default function Hr8799System({
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
        system={hr8799System}
        speedMultiplier={speedMultiplier}
        onPlanetClick={(planet) => {
          if (onPlanetClick) onPlanetClick(planet, hr8799System);
        }}
        onPlanetRef={onPlanetRef}
        onStarClick={onStarClick}
      />
    </group>
  );
}
