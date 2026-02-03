const RSUN_IN_AU = 0.00465047;

const STAR_RADIUS = 50 * 0.788;
const PLANET_RADIUS = 50 * 0.114;
const ORBIT_IN_STAR_RADII = 0.031 / (0.788 * RSUN_IN_AU);
const DISTANCE_SCALE = 0.25;

export const glassJupiterSystem = {
  id: 'hd-189733',
  name: 'HD 189733',
  stars: [
    {
      id: 'hd-189733-a',
      radius: STAR_RADIUS,
      color: '#ffb347',
      texture: '/textures/sun.jpg',
      intensity: 120000,
      rotationSpeed: 0.0008,
      glow: { scale: 1.03, opacity: 0.25 },
    },
  ],
  planets: [
    {
      id: 'hd-189733-b',
      radius: PLANET_RADIUS,
      texture: '/textures/HD189733b.png',
      rotationSpeed: 0.04,
      orbit: {
        radius: STAR_RADIUS * ORBIT_IN_STAR_RADII * DISTANCE_SCALE,
        speed: 0.08,
      },
      material: {
        type: 'wobble',
        factor: 0.2,
        speed: 1,
        opacity: 0.95,
        envMapIntensity: 1.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      },
      glow: {
        color: '#60a5fa',
        opacity: 0.18,
      },
    },
  ],
};

export const trappistSystem = {
  id: 'trappist-1',
  name: 'TRAPPIST-1',
  stars: [
    {
      id: 'trappist-1-a',
      radius: 18,
      color: '#ffb090',
      texture: '/textures/sun.jpg',
      intensity: 45000,
      rotationSpeed: 0.0012,
      glow: { scale: 1.08, opacity: 0.35 },
    },
  ],
  planets: [
    {
      id: 'trappist-1b',
      radius: 4,
      texture: '/textures/earth.jpg',
      orbit: { radius: 80, speed: 0.6 },
      rotationSpeed: 0.08,
    },
    {
      id: 'trappist-1c',
      radius: 4.2,
      texture: '/textures/mars.jpg',
      orbit: { radius: 110, speed: 0.5 },
      rotationSpeed: 0.07,
      atmosphere: { color: '#f97316', opacity: 0.2, scale: 1.03 },
    },
    {
      id: 'trappist-1e',
      radius: 5,
      texture: '/textures/earth.jpg',
      orbit: { radius: 150, speed: 0.42 },
      rotationSpeed: 0.05,
      moons: [
        {
          id: 'trappist-1e-moon',
          radius: 1.2,
          texture: '/textures/moon.jpg',
          orbit: { radius: 10, speed: 1.8, inclination: 5 },
        },
      ],
    },
  ],
};

export const keplerBinarySystem = {
  id: 'kepler-binary',
  name: 'Kepler-47',
  stars: [
    {
      id: 'kepler-47-a',
      radius: 28,
      color: '#ffd9a0',
      texture: '/textures/sun.jpg',
      intensity: 80000,
      rotationSpeed: 0.0006,
      orbit: { radius: 25, speed: 0.4, inclination: 5 },
      glow: { scale: 1.06, opacity: 0.25 },
    },
    {
      id: 'kepler-47-b',
      radius: 20,
      color: '#ffe6b3',
      texture: '/textures/sun.jpg',
      intensity: 60000,
      rotationSpeed: 0.0009,
      orbit: { radius: 25, speed: 0.4, inclination: 5 },
      glow: { scale: 1.04, opacity: 0.2 },
    },
  ],
  planets: [
    {
      id: 'kepler-47c',
      radius: 6.5,
      texture: '/textures/jupiter.jpg',
      orbit: { radius: 170, speed: 0.3 },
      rotationSpeed: 0.03,
      rings: { innerRadius: 8, outerRadius: 12, opacity: 0.6 },
    },
  ],
};
