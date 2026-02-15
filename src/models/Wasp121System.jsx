import React from 'react';
import { PlanetSystem } from './planetSystem';
import { wasp121System } from '../data/planetSystems';

export default function Wasp121System({
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
        system={wasp121System}
        speedMultiplier={speedMultiplier}
        onPlanetClick={(planet) => {
          if (onPlanetClick) onPlanetClick(planet, wasp121System);
        }}
        onPlanetRef={onPlanetRef}
        onStarClick={onStarClick}
      />
    </group>
  );
}
