export const glassJupiterSystem = {
  id: 'hd-189733',
  name: 'HD 189733',
  stars: [
    {
      id: 'hd-189733-a',
      name: 'HD 189733 A',
      type: 'K-type Star',
      facts: ['Host star of the hot Jupiter HD 189733 b.'],
      radius: 78.8,
      color: '#ffb347',
      texture: '/textures/sun.jpg',
      intensity: 120000,
      rotationSpeed: 0.8,
      glow: { scale: 1.03, opacity: 0.25 },
    },
  ],
  planets: [
    {
      id: 'hd-189733-b',
      name: 'HD 189733 b',
      type: 'Hot Jupiter',
      radius: 11.432,
      texture: '/textures/HD189733b.png',
      rotationSpeed: 1.2,
      description:
        'A close-orbiting gas giant known for intense winds and a deep blue haze. It is one of the most studied hot Jupiters.',
      facts: [
        'Orbits extremely close to its host star (≈0.031 AU), completing an orbit in roughly 2.2 Earth days — a classic hot Jupiter.',
        'Powerful atmospheric circulation drives very high wind speeds and strong day–night temperature contrasts.',
        'A deep blue tint and high-altitude haze have been observed, possibly caused by scattering from silicate or mineral particles.',
        'Likely tidally locked, producing a permanent hot dayside and a much cooler nightside with extreme temperature gradients.',
        'A transiting planet that has been extensively studied with spectroscopy, revealing details about its atmospheric composition and dynamics.',
      ],
      orbit: {
        au: 0.031,
        // increased to account for doubled star and planet visual sizes
        radius: 200,
        speed: 10,
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
      name: 'TRAPPIST-1',
      type: 'Red Dwarf',
      facts: ['Ultra-cool red dwarf hosting a compact system of Earth-sized planets.'],
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
      name: 'TRAPPIST-1 b',
      type: 'Rocky',
      radius: 4,
      texture: '/textures/earth.jpg',
      orbit: { au: 0.0115, radius: 36.18, speed: 0.6 },
      rotationSpeed: 0.08,
      description:
        'The innermost TRAPPIST-1 planet, likely too hot for liquid water with a tight, fast orbit.',
    },
    {
      id: 'trappist-1c',
      name: 'TRAPPIST-1 c',
      type: 'Rocky',
      radius: 4.2,
      texture: '/textures/mars.jpg',
      orbit: { au: 0.0158, radius: 37.968, speed: 0.5 },
      rotationSpeed: 0.07,
      atmosphere: { color: '#f97316', opacity: 0.2, scale: 1.03 },
      description:
        'A rocky world receiving strong stellar radiation, possibly with a thin or transient atmosphere.',
    },
    {
      id: 'trappist-1e',
      name: 'TRAPPIST-1 e',
      type: 'Rocky',
      radius: 5,
      texture: '/textures/earth.jpg',
      orbit: { au: 0.0293, radius: 43.059, speed: 0.42 },
      rotationSpeed: 0.05,
      description:
        'Often highlighted as one of the most potentially temperate TRAPPIST-1 planets, near the habitable zone.',
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
      name: 'Kepler-47 A',
      type: 'Sun-like Star',
      facts: ['Primary star in a close binary that hosts circumbinary planets.'],
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
      name: 'Kepler-47 B',
      type: 'Companion Star',
      facts: ['Smaller companion in the Kepler-47 binary system.'],
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
      name: 'Kepler-47 c',
      type: 'Gas Giant',
      radius: 6.5,
      texture: '/textures/jupiter.jpg',
      orbit: { au: 0.989, radius: 248.062, speed: 0.3 },
      rotationSpeed: 0.03,
      description:
        'A circumbinary gas giant orbiting a pair of stars, showcasing the diversity of multi-star systems.',
      rings: { innerRadius: 8, outerRadius: 12, opacity: 0.6 },
    },
  ],
};

const alphaCentauriMassA = 1.1;
const alphaCentauriMassB = 0.907;
const alphaCentauriTotalMass = alphaCentauriMassA + alphaCentauriMassB;
const alphaCentauriRelativeSemiMajorAxis = 1200;
const alphaCentauriEccentricity = 0.52;
const alphaCentauriMeanMotion = 0.02;
const alphaCentauriInclination = 8;
const alphaCentauriArgumentOfPeriapsis = 20;

const alphaCentauriOrbitA =
  alphaCentauriRelativeSemiMajorAxis * (alphaCentauriMassB / alphaCentauriTotalMass);
const alphaCentauriOrbitB =
  alphaCentauriRelativeSemiMajorAxis * (alphaCentauriMassA / alphaCentauriTotalMass);

export const proximaCentauriSystem = {
  id: 'proxima-centauri',
  name: 'Proxima Centauri',
  stars: [
    {
      id: 'proxima-centauri',
      name: 'Proxima Centauri',
      type: 'Red Dwarf',
      facts: ['Closest star to the Sun and a flare-active red dwarf.'],
      radius: 10,
      color: '#ff6b5a',
      texture: '/textures/sun.jpg',
      intensity: 20000,
      rotationSpeed: 0.0012,
      orbit: {
        semiMajorAxis: 1500,
        eccentricity: 0.15,
        speed: 0.004,
        inclination: -6,
        argumentOfPeriapsis: 110,
        phase: 90,
      },
      glow: { scale: 1.1, opacity: 0.4 },
    },
    {
      id: 'alpha-centauri-a',
      name: 'Alpha Centauri A',
      type: 'Sun-like Star',
      facts: ['Brighter, sun-like primary in the Alpha Centauri binary.'],
      radius: 80,
      color: '#ffe0b8',
      texture: '/textures/sun.jpg',
      intensity: 98000,
      rotationSpeed: 0.0006,
      orbit: {
        semiMajorAxis: alphaCentauriOrbitA,
        eccentricity: alphaCentauriEccentricity,
        speed: alphaCentauriMeanMotion,
        inclination: alphaCentauriInclination,
        argumentOfPeriapsis: alphaCentauriArgumentOfPeriapsis,
        phase: 0,
      },
      glow: { scale: 1.04, opacity: 0.22 },
    },
    {
      id: 'alpha-centauri-b',
      name: 'Alpha Centauri B',
      type: 'K-type Star',
      facts: ['Slightly cooler and smaller companion to Alpha Centauri A.'],
      radius: 60,
      color: '#ffd2a8',
      texture: '/textures/sun.jpg',
      intensity: 76000,
      rotationSpeed: 0.0008,
      orbit: {
        semiMajorAxis: alphaCentauriOrbitB,
        eccentricity: alphaCentauriEccentricity,
        speed: alphaCentauriMeanMotion,
        inclination: alphaCentauriInclination,
        argumentOfPeriapsis: alphaCentauriArgumentOfPeriapsis,
        phase: 180,
      },
      glow: { scale: 1.04, opacity: 0.2 },
    },
  ],
  planets: [
    {
      id: 'proxima-b',
      name: 'Proxima b',
      type: 'Rocky',
      radius: 4.2,
      texture: '/textures/earth.jpg',
      rotationSpeed: 0.55,
      description:
        'An Earth-mass planet in the temperate zone of Proxima Centauri, likely tidally locked.',
      facts: [
        'Orbits very close to its host star with a period of about 11 days.',
        'Receives stellar energy comparable to Earth depending on atmospheric assumptions.',
        'The host star is flare-active, which could impact atmospheric retention.',
      ],
      orbit: {
        au: 0.0485,
        radius: 72,
        speed: 1.1,
      },
      atmosphere: { color: '#7dd3fc', opacity: 0.12, scale: 1.03 },
      glow: { color: '#38bdf8', opacity: 0.18 },
    },
    {
      id: 'proxima-d',
      name: 'Proxima d',
      type: 'Rocky',
      radius: 2.8,
      texture: '/textures/mercury.jpg',
      rotationSpeed: 0.75,
      description: 'A compact inner planet candidate with a very short orbit.',
      facts: [
        'Likely completes an orbit in just a few days.',
        'Smaller than Proxima b, with a tighter orbit.',
      ],
      orbit: {
        au: 0.029,
        radius: 55,
        speed: 1.5,
      },
      material: {
        roughness: 0.8,
        metalness: 0.1,
      },
      glow: { color: '#f97316', opacity: 0.12 },
    },
    {
      id: 'proxima-c',
      name: 'Proxima c',
      type: 'Super-Earth',
      radius: 6.2,
      texture: '/textures/neptune.jpg',
      rotationSpeed: 0.35,
      description: 'A long-period candidate planet farther from Proxima Centauri.',
      facts: [
        'Possible multi-year orbital period.',
        'Much farther out than Proxima b, receiving far less energy.',
      ],
      orbit: {
        au: 1.5,
        radius: 380,
        speed: 0.14,
      },
      atmosphere: { color: '#60a5fa', opacity: 0.1, scale: 1.02 },
    },
  ],
};

export const kepler10System = {
  id: 'kepler-10',
  name: 'Kepler-10',
  stars: [
    {
      id: 'kepler-10-a',
      name: 'Kepler-10',
      type: 'Sun-like Star',
      facts: ['Host star of some of the earliest confirmed rocky exoplanets.'],
      radius: 55,
      color: '#ffd5a6',
      texture: '/textures/sun.jpg',
      intensity: 95000,
      rotationSpeed: 0.0016,
      glow: { scale: 1.05, opacity: 0.28 },
    },
  ],
  planets: [
    {
      id: 'kepler-10-b',
      name: 'Kepler-10 b',
      type: 'Rocky Super-Earth',
      radius: 4.4,
      texture: '/textures/mercury.jpg',
      rotationSpeed: 0.9,
      description:
        'A scorched rocky world on an ultra-tight orbit, with surface temperatures hot enough to melt rock.',
      facts: [
        'Completes an orbit in under a day, making it one of the fastest known rocky exoplanets.',
        'Likely tidally locked, with a permanent day side and night side.',
        'Receives extreme stellar radiation due to its very small orbital distance.',
        'Among the first confirmed rocky exoplanets discovered by Kepler.',
      ],
      orbit: {
        au: 0.0168,
        radius: 120,
        speed: 1.4,
      },
      material: {
        type: 'wobble',
        factor: 0.12,
        speed: 0.6,
        opacity: 0.96,
        envMapIntensity: 0.7,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
      },
      atmosphere: { color: '#f59e0b', opacity: 0.12, scale: 1.03 },
      glow: { color: '#f97316', opacity: 0.22 },
    },
    {
      id: 'kepler-10-c',
      name: 'Kepler-10 c',
      type: 'Super-Earth',
      radius: 5.6,
      texture: '/textures/venus.jpg',
      rotationSpeed: 0.5,
      description:
        'A larger sibling in the system, orbiting farther out with a cooler but still intense environment.',
      facts: [
        'A high-density world compared to gas giants, often discussed as a massive rocky planet.',
        'Orbits much farther from the star than Kepler-10 b.',
        'Represents the diversity of compact multi-planet systems.',
      ],
      orbit: {
        au: 0.24,
        radius: 190,
        speed: 0.6,
      },
      atmosphere: { color: '#facc15', opacity: 0.08, scale: 1.02 },
    },
  ],
};
