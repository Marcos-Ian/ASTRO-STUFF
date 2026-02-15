import planetsData from '../data/planets.json';
import { AsteroidBelt } from './solarSystem/AsteroidBelt';
import { Moon } from './solarSystem/Moon';
import { Planet } from './solarSystem/Planet';
import { SaturnRings } from './solarSystem/SaturnRings';
import { Sun } from './solarSystem/Sun';

/* =======================
   Solar System
======================= */
export function SolarSystem({ onPlanetClick, onPlanetRef, rotationSpeed = 1, ...props }) {
  // Less compression so Mars → Belt gap is clearer

  // Transform the planet data from JSON, applying the compressed orbit radius
  const planets = planetsData.planets;

  return (
    <group {...props}>
      <Sun speedMultiplier={rotationSpeed} />

      {/* Asteroid Belt: between Mars and Jupiter (main belt) */}
      <AsteroidBelt
        innerRadius={443.391}
        outerRadius={587.882}
        beltWidth={40}
        count={700}
        minSize={1.2}
        maxSize={3.5}
        orbitSpeed={0.00018}
        speedMultiplier={rotationSpeed}
      />

      {planets.map((planet) => {
        if (planet.name === 'Earth') {
          return (
            <Planet
              key="Earth"
              {...planet}
              onClick={onPlanetClick}
              planetName={planet.name}
              onPlanetRef={onPlanetRef}
              speedMultiplier={rotationSpeed}
              // Moon should follow Earth position/orbit, but not necessarily Earth's axial tilt
              children={
                <Moon
                  size={4.3}
                  texturePath="/textures/moon.jpg"
                  fallbackColor="#B0B0B0"
                  orbitRadius={40}
                  orbitSpeed={0.03}
                  rotationSpeed={0.01}
                  speedMultiplier={rotationSpeed}
                />
              }
            />
          );
        }

        if (planet.name === 'Saturn') {
          return (
            <Planet
              key="Saturn"
              {...planet}
              onClick={onPlanetClick}
              planetName={planet.name}
              onPlanetRef={onPlanetRef}
              speedMultiplier={rotationSpeed}
              // Rings should tilt with Saturn
              tiltChildren={<SaturnRings />}
            />
          );
        }

        return (
          <Planet
            key={planet.name}
            {...planet}
            onClick={onPlanetClick}
            planetName={planet.name}
            onPlanetRef={onPlanetRef}
            speedMultiplier={rotationSpeed}
          />
        );
      })}
    </group>
  );
}

export default SolarSystem;

export { AsteroidBelt, Moon, Planet, SaturnRings, Sun };
