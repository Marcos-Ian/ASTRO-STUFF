import planetsData from '../data/planets.json';
import { AsteroidBelt, Moon, Planet, SaturnRings, Sun } from './solarSystem';

/* =======================
   Solar System
======================= */
export function SolarSystem({ onPlanetClick, selectedPlanet, onPlanetRef, rotationSpeed = 1, ...props }) {
  const AU_TO_UNITS = 220;
  // Less compression so Mars → Belt gap is clearer
  const compressDistance = (au) => Math.pow(au, 0.80) * AU_TO_UNITS + 30;

  // Transform the planet data from JSON, applying the compressed orbit radius
  const planets = planetsData.planets.map((planet) => ({
    ...planet,
    orbitRadius: compressDistance(planet.orbitRadius)
  }));

  return (
    <group {...props}>
      <Sun speedMultiplier={rotationSpeed} />

      {/* Asteroid Belt: between Mars and Jupiter (main belt) */}
      <AsteroidBelt
        innerRadius={compressDistance(2.2)}
        outerRadius={compressDistance(3.2)}
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
