import React from 'react';
import { Orbit } from './Orbit';
import { Planet } from './Planet';
import { Star } from './Star';

export function PlanetSystem({ system, position = [0, 0, 0], scale = 1, speedMultiplier = 1 }) {
  if (!system) return null;

  return (
    <group position={position} scale={scale}>
      {system.stars?.map((star) => {
        const starContent = (
          <Star
            radius={star.radius}
            color={star.color}
            texture={star.texture}
            intensity={star.intensity}
            distance={star.distance}
            decay={star.decay}
            rotationSpeed={star.rotationSpeed}
            speedMultiplier={speedMultiplier}
            glow={star.glow}
          />
        );

        if (star.orbit) {
          return (
            <Orbit
              key={star.id}
              radius={star.orbit.radius}
              speed={star.orbit.speed}
              inclination={star.orbit.inclination}
              speedMultiplier={speedMultiplier}
            >
              {starContent}
            </Orbit>
          );
        }

        return <group key={star.id}>{starContent}</group>;
      })}

      {system.planets?.map((planet) => (
        <Orbit
          key={planet.id}
          radius={planet.orbit?.radius ?? 0}
          speed={planet.orbit?.speed ?? 0}
          inclination={planet.orbit?.inclination ?? 0}
          speedMultiplier={speedMultiplier}
        >
          <Planet
            radius={planet.radius}
            color={planet.color}
            texture={planet.texture}
            rotationSpeed={planet.rotationSpeed}
            axialTilt={planet.axialTilt}
            speedMultiplier={speedMultiplier}
            material={planet.material}
            rings={planet.rings}
            atmosphere={planet.atmosphere}
            glow={planet.glow}
            moons={planet.moons}
          />
        </Orbit>
      ))}
    </group>
  );
}
