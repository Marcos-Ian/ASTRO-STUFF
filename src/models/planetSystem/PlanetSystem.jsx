import React from 'react';
import { Orbit } from './Orbit';
import { Planet } from './Planet';
import { Star } from './Star';

export function PlanetSystem({
  system,
  position = [0, 0, 0],
  scale = 1,
  speedMultiplier = 1,
  onPlanetClick,
  onPlanetRef,
}) {
  if (!system) return null;

  return (
    <group position={position} scale={scale}>
      {system.stars?.map((star) => {
        const starContent = (
          <Star
            name={star.name}
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
              semiMajorAxis={star.orbit.semiMajorAxis}
              eccentricity={star.orbit.eccentricity}
              speed={star.orbit.speed}
              period={star.orbit.period}
              phase={star.orbit.phase}
              inclination={star.orbit.inclination}
              argumentOfPeriapsis={star.orbit.argumentOfPeriapsis}
              longitudeOfAscendingNode={star.orbit.longitudeOfAscendingNode}
              flatten
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
          semiMajorAxis={planet.orbit?.semiMajorAxis}
          eccentricity={planet.orbit?.eccentricity}
          speed={planet.orbit?.speed ?? 0}
          period={planet.orbit?.period}
          phase={planet.orbit?.phase}
          inclination={planet.orbit?.inclination ?? 0}
          argumentOfPeriapsis={planet.orbit?.argumentOfPeriapsis}
          longitudeOfAscendingNode={planet.orbit?.longitudeOfAscendingNode}
          flatten
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
            onClick={onPlanetClick}
            planetData={planet}
            onPlanetRef={onPlanetRef}
            planetId={planet.id}
          />
        </Orbit>
      ))}
    </group>
  );
}
