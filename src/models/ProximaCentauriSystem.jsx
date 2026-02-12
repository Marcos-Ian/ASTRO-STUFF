import React, { useMemo } from 'react';
import { Orbit, Planet, Star } from './planetSystem';
import { proximaCentauriSystem } from '../data/planetSystems';

export default function ProximaCentauriSystem({
  position = [0, 0, 0],
  scale = 1,
  speedMultiplier = 1,
  onPlanetClick,
  onPlanetRef,
  onStarClick,
}) {
  const { stars = [], planets = [] } = proximaCentauriSystem;

  const starById = useMemo(() => {
    const map = new Map();
    stars.forEach((star) => map.set(star.id, star));
    return map;
  }, [stars]);

  const alphaA = starById.get('alpha-centauri-a');
  const alphaB = starById.get('alpha-centauri-b');
  const proxima = starById.get('proxima-centauri');

  const handlePlanetClick = (planet) => {
    if (onPlanetClick) onPlanetClick(planet, proximaCentauriSystem);
  };

  const handleStarClick = (star) => {
    if (onStarClick) onStarClick(star, proximaCentauriSystem);
  };

  const renderStar = (star) => (
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
      onClick={onStarClick ? handleStarClick : null}
      starData={star}
    />
  );

  const renderOrbit = (body, orbit) => {
    if (!orbit) return <group>{body}</group>;
    return (
      <Orbit
        radius={orbit.radius}
        semiMajorAxis={orbit.semiMajorAxis}
        eccentricity={orbit.eccentricity}
        speed={orbit.speed}
        period={orbit.period}
        phase={orbit.phase}
        inclination={orbit.inclination}
        argumentOfPeriapsis={orbit.argumentOfPeriapsis}
        longitudeOfAscendingNode={orbit.longitudeOfAscendingNode}
        flatten
        speedMultiplier={speedMultiplier}
      >
        {body}
      </Orbit>
    );
  };

  const proximaContent = proxima ? (
    <group>
      {renderStar(proxima)}
      {planets.map((planet) => (
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
            onClick={handlePlanetClick}
            planetData={planet}
            onPlanetRef={onPlanetRef}
            planetId={planet.id}
          />
        </Orbit>
      ))}
    </group>
  ) : null;

  return (
    <group position={position} scale={scale}>
      {alphaA && renderOrbit(renderStar(alphaA), alphaA.orbit)}
      {alphaB && renderOrbit(renderStar(alphaB), alphaB.orbit)}
      {proximaContent && renderOrbit(proximaContent, proxima?.orbit)}
    </group>
  );
}
