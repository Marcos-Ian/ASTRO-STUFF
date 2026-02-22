import React from 'react';
import { PlanetSystem } from './planetSystem';
import { pulsarSystem } from '../data/planetSystems';

export default function PulsarSystem({
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
        system={pulsarSystem}
        speedMultiplier={speedMultiplier}
        onPlanetClick={(planet) => {
          if (onPlanetClick) onPlanetClick(planet, pulsarSystem);
        }}
        onPlanetRef={onPlanetRef}
        onStarClick={onStarClick}
      />
    </group>
  );
}
