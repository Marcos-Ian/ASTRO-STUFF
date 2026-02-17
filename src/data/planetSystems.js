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

const cancri55MassA = 0.905;
const cancri55MassB = 0.13;
const cancri55TotalMass = cancri55MassA + cancri55MassB;
const cancri55RelativeSemiMajorAxis = 1650;
const cancri55BinaryEccentricity = 0.35;
const cancri55BinaryPeriod = 14600;
const cancri55BinaryInclination = 6;
const cancri55BinaryArgumentOfPeriapsis = 42;
const cancri55BinaryLongitudeOfAscendingNode = 18;

const cancri55OrbitA = cancri55RelativeSemiMajorAxis * (cancri55MassB / cancri55TotalMass);
const cancri55OrbitB = cancri55RelativeSemiMajorAxis * (cancri55MassA / cancri55TotalMass);

export const cancri55System = {
  id: '55-cancri',
  name: '55 Cancri',
  stars: [
    {
      id: '55-cancri-a',
      name: '55 Cancri A',
      type: 'G-type Star',
      description:
        'A Sun-like primary that hosts five confirmed planets spanning ultra-short to long-period orbits.',
      facts: [
        'Located about 41 light-years from Earth in the constellation Cancer.',
        'The system includes an ultra-short-period super-Earth and several giant planets.',
      ],
      radius: 82,
      color: '#ffe1b8',
      texture: '/textures/sun.jpg',
      intensity: 115000,
      rotationSpeed: 0.0011,
      orbit: {
        semiMajorAxis: cancri55OrbitA,
        eccentricity: cancri55BinaryEccentricity,
        period: cancri55BinaryPeriod,
        speed: (Math.PI * 2) / cancri55BinaryPeriod,
        inclination: cancri55BinaryInclination,
        argumentOfPeriapsis: cancri55BinaryArgumentOfPeriapsis,
        longitudeOfAscendingNode: cancri55BinaryLongitudeOfAscendingNode,
        phase: 35,
      },
      glow: { scale: 1.05, opacity: 0.24 },
    },
    {
      id: '55-cancri-b-star',
      name: '55 Cancri B',
      type: 'M-dwarf Companion',
      description: 'A faint red dwarf companion in a very wide binary orbit around 55 Cancri A.',
      facts: [
        'Sits far from the planetary host star on a wide, multi-millennial orbit.',
        'Its gravity helps define the outer architecture of the full 55 Cancri system.',
      ],
      radius: 26,
      color: '#ff9f7a',
      texture: '/textures/sun.jpg',
      intensity: 32000,
      rotationSpeed: 0.0014,
      orbit: {
        semiMajorAxis: cancri55OrbitB,
        eccentricity: cancri55BinaryEccentricity,
        period: cancri55BinaryPeriod,
        speed: (Math.PI * 2) / cancri55BinaryPeriod,
        inclination: cancri55BinaryInclination,
        argumentOfPeriapsis: cancri55BinaryArgumentOfPeriapsis,
        longitudeOfAscendingNode: cancri55BinaryLongitudeOfAscendingNode,
        phase: 215,
      },
      glow: { scale: 1.08, opacity: 0.34 },
    },
  ],
  planets: [
    {
      id: '55-cancri-e',
      name: '55 Cancri e',
      type: 'Lava Super-Earth',
      tidallyLocked: true,
      radius: 6.2,
      texture: '/textures/55Cancri-e.png',
      rotationSpeed: 0.9,
      description:
        'This exoplanet is so dense that astronomers have hypothesized it to be composed of mostly carbon that has been compressed to diamond.',
      facts: [
        'Completes one orbit in about 0.74 Earth days at roughly 0.015 AU.',
        'Likely tidally locked, with a persistent dayside and nightside contrast.',
        'Infrared observations suggest extreme heat and possible volcanic resurfacing.',
      ],
      orbit: {
        au: 0.0154,
        semiMajorAxis: 120,
        radius: 120,
        eccentricity: 0.05,
        period: 0.7365,
        speed: 8.531,
        phase: 20,
        argumentOfPeriapsis: 58,
      },
      material: {
        type: 'wobble',
        factor: 0.16,
        speed: 0.8,
        opacity: 0.96,
        envMapIntensity: 0.9,
        clearcoat: 0.95,
        clearcoatRoughness: 0.12,
      },
      glow: { color: '#f97316', opacity: 0.02 },
    },
    {
      id: '55-cancri-b',
      name: '55 Cancri b',
      type: 'Hot Jupiter',
      radius: 20,
      texture: '/textures/kepler90g.png',
      rotationSpeed: 0.5,
      description:
        'The first giant planet found in this system, orbiting much closer to the star than Jupiter does to the Sun.',
      facts: [
        'Completes an orbit in about 14.65 Earth days.',
        'Orbits at roughly 0.113 AU and is significantly more irradiated than Jupiter.',
        'Its discovery helped establish 55 Cancri as a key multi-planet system.',
      ],
      orbit: {
        au: 0.1134,
        semiMajorAxis: 190,
        radius: 190,
        eccentricity: 0.01,
        period: 14.651,
        speed: 0.4288,
        phase: 130,
        argumentOfPeriapsis: 22,
      },
      atmosphere: { color: '#f59e0b', opacity: 0.09, scale: 1.03 },
      glow: { color: '#fbbf24', opacity: 0.02 },
    },
    {
      id: '55-cancri-c',
      name: '55 Cancri c',
      type: 'Gas Giant',
      radius: 13,
      texture: '/textures/neptune.jpg',
      rotationSpeed: 0.36,
      description:
        'A giant planet on a wider orbit that sits between the system\'s hot inner worlds and temperate outer region.',
      facts: [
        'Completes an orbit in about 44.4 Earth days.',
        'Orbits near 0.24 AU from 55 Cancri A.',
        'Shows a modest orbital eccentricity compared with the innermost planets.',
      ],
      orbit: {
        au: 0.2373,
        semiMajorAxis: 275,
        radius: 275,
        eccentricity: 0.08,
        period: 44.392,
        speed: 0.1415,
        phase: 235,
        argumentOfPeriapsis: 75,
      },
      atmosphere: { color: '#38bdf8', opacity: 0.08, scale: 1.03 },
    },
    {
      id: '55-cancri-f',
      name: '55 Cancri f',
      type: 'Warm Giant',
      radius: 15,
      texture: '/textures/uranus.jpg',
      rotationSpeed: 0.24,
      description:
        'A giant planet on a mid-range orbit often discussed near the host star\'s broader temperate region.',
      facts: [
        'Completes an orbit in about 260 Earth days.',
        'Orbits around 0.77 AU from 55 Cancri A.',
        'Its higher eccentricity creates stronger seasonal insolation swings than near-circular orbits.',
      ],
      orbit: {
        au: 0.7708,
        semiMajorAxis: 470,
        radius: 470,
        eccentricity: 0.32,
        period: 259.88,
        speed: 0.0242,
        phase: 305,
        argumentOfPeriapsis: 145,
      },
      atmosphere: { color: '#7dd3fc', opacity: 0.1, scale: 1.03 },
      glow: { color: '#93c5fd', opacity: 0.1 },
    },
    {
      id: '55-cancri-d',
      name: '55 Cancri d',
      type: 'Outer Gas Giant',
      radius: 26,
      texture: '/textures/saturn.jpg',
      rotationSpeed: 0.17,
      description:
        'The outer giant of the system, on a long-period orbit that anchors the known planetary architecture.',
      facts: [
        'Completes an orbit in roughly 14 Earth years.',
        'Orbits near 5.96 AU, comparable to the outer giant-planet region in our Solar System.',
        'Its long period and distance make it a key reference for the system\'s outer dynamics.',
      ],
      orbit: {
        au: 5.957,
        semiMajorAxis: 920,
        radius: 920,
        eccentricity: 0.02,
        period: 5169,
        speed: 0.0012,
        phase: 40,
        argumentOfPeriapsis: 188,
      },
      rings: {
        innerRadius: 30,
        outerRadius: 44,
        opacity: 0.45,
      },
      atmosphere: { color: '#fcd34d', opacity: 0.08, scale: 1.02 },
      glow: { color: '#fde68a', opacity: 0.09 },
    },
  ],
};

export const wasp121System = {
  id: 'wasp-121',
  name: 'WASP-121',
  stars: [
    {
      id: 'wasp-121-a',
      name: 'WASP-121',
      type: 'F-type Star',
      description: 'A hot F-type star hosting the ultra-hot Jupiter WASP-121 b.',
      facts: [
        'Slightly larger and hotter than the Sun.',
        'Its intense radiation drives extreme atmospheric chemistry on WASP-121 b.',
      ],
      radius: 92,
      color: '#ffd6b0',
      texture: '/textures/sun.jpg',
      intensity: 145000,
      rotationSpeed: 0.001,
      glow: { scale: 1.05, opacity: 0.24 },
    },
  ],
  planets: [
    {
      id: 'wasp-121-b',
      name: 'WASP-121 b',
      type: 'Ultra-hot Jupiter',
      radius: 13.4,
      texture: '/textures/jupiter.jpg',
      rotationSpeed: 1.1,
      description:
        'An inflated gas giant orbiting so close to its host star that upper atmospheric temperatures can reach metal-vapor regimes.',
      facts: [
        'Completes an orbit in roughly 1.27 Earth days at about 0.025 AU.',
        'Spectroscopic studies indicate a temperature inversion, consistent with a stratosphere.',
        'Molecules and metal-bearing species can exist in vapor form at high altitude.',
        'Likely tidally locked and close to its Roche limit, making it an extreme laboratory for atmospheric physics.',
      ],
      orbit: {
        au: 0.0254,
        radius: 165,
        speed: 13.5,
      },
      material: {
        type: 'wobble',
        factor: 0.18,
        speed: 1.2,
        opacity: 0.95,
        envMapIntensity: 1.1,
        clearcoat: 0.85,
        clearcoatRoughness: 0.18,
      },
      atmosphere: { color: '#fb923c', opacity: 0.14, scale: 1.03 },
      glow: { color: '#f97316', opacity: 0.2 },
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
      description:
        'An ultra-cool red dwarf hosting one of the best-studied compact systems of Earth-sized planets.',
      facts: [
        'Located about 40 light-years away in the constellation Aquarius.',
        'Its seven known planets orbit much closer than Mercury orbits the Sun.',
        'Frequent stellar activity can strongly affect planetary atmospheres.',
      ],
      radius: 18,
      color: '#ffb090',
      texture: '/textures/sun.jpg',
      intensity: 42000,
      rotationSpeed: 0.0012,
      glow: { scale: 1.08, opacity: 0.35 },
    },
  ],
  planets: [
    {
      id: 'trappist-1b',
      name: 'TRAPPIST-1 b',
      type: 'Hot Rocky Planet',
      tidallyLocked: true,
      radius: 3.9,
      texture: '/textures/T1b.png',
      orbit: { au: 0.0115, radius: 48, speed: 1.6 },
      rotationSpeed: 0.08,
      description:
        'The innermost known TRAPPIST-1 planet, strongly irradiated and likely too hot for long-lived surface water.',
      facts: [
        'Completes an orbit in about 1.5 Earth days.',
        'Likely tidally locked due to its extremely close orbit.',
        'Receives much more stellar energy than Earth.',
      ],
      glow: { color: '#fb923c', opacity: 0.12 },
    },
    {
      id: 'trappist-1c',
      name: 'TRAPPIST-1 c',
      type: 'Rocky Planet',
      tidallyLocked: true,
      radius: 4.1,
      texture: '/textures/T1c.png',
      orbit: { au: 0.0158, radius: 60, speed: 1.15 },
      rotationSpeed: 0.07,
      atmosphere: { color: '#f97316', opacity: 0.18, scale: 1.03 },
      description:
        'A hot rocky world just outside planet b, with conditions that may challenge long-term atmospheric stability.',
      facts: [
        'Completes one orbit in roughly 2.4 Earth days.',
        'Gets intense stellar radiation compared with Earth.',
        'May have experienced substantial atmospheric erosion.',
      ],
    },
    {
      id: 'trappist-1d',
      name: 'TRAPPIST-1 d',
      type: 'Rocky Planet',
      tidallyLocked: true,
      radius: 3.6,
      texture: '/textures/T1d.png',
      orbit: { au: 0.0223, radius: 74, speed: 0.82 },
      rotationSpeed: 0.065,
      atmosphere: { color: '#fbbf24', opacity: 0.12, scale: 1.02 },
      description:
        'A compact rocky world near the inner edge of the temperate region, where climate outcomes depend on atmosphere.',
      facts: [
        'Completes an orbit in about 4.0 Earth days.',
        'Sits between the hotter inner planets and the more temperate mid-system worlds.',
        'Could support moderate conditions under favorable atmospheric scenarios.',
      ],
    },
    {
      id: 'trappist-1e',
      name: 'TRAPPIST-1 e',
      type: 'Temperate Rocky Planet',
      tidallyLocked: true,
      radius: 4.0,
      texture: '/textures/T1e.png',
      orbit: { au: 0.0293, radius: 90, speed: 0.62 },
      rotationSpeed: 0.055,
      description:
        'Often highlighted as one of the most potentially temperate TRAPPIST-1 planets, near the system habitable zone.',
      facts: [
        'Completes an orbit in about 6.1 Earth days.',
        'Its size and irradiation are close to Earth-like ranges in many models.',
        'A top target for atmospheric characterization with next-generation telescopes.',
      ],
      atmosphere: { color: '#60a5fa', opacity: 0.14, scale: 1.03 },
      glow: { color: '#38bdf8', opacity: 0.16 },
    },
    {
      id: 'trappist-1f',
      name: 'TRAPPIST-1 f',
      type: 'Cool Rocky Planet',
      tidallyLocked: true,
      radius: 4.2,
      texture: '/textures/T1f.png',
      orbit: { au: 0.0385, radius: 106, speed: 0.46 },
      rotationSpeed: 0.05,
      description:
        'A cooler Earth-sized planet in the outer part of the temperate zone, where greenhouse effects are important.',
      facts: [
        'Completes an orbit in about 9.2 Earth days.',
        'Receives less energy than TRAPPIST-1 e and may require a denser atmosphere for warmth.',
        'Frequently discussed as another potentially habitable candidate.',
      ],
      atmosphere: { color: '#93c5fd', opacity: 0.1, scale: 1.03 },
    },
    {
      id: 'trappist-1g',
      name: 'TRAPPIST-1 g',
      type: 'Cold Super-Earth',
      tidallyLocked: true,
      radius: 4.9,
      texture: '/textures/T1g.png',
      orbit: { au: 0.0469, radius: 124, speed: 0.34 },
      rotationSpeed: 0.042,
      description:
        'A larger outer planet that receives significantly less stellar flux than Earth and may be globally cold.',
      facts: [
        'Completes an orbit in roughly 12.4 Earth days.',
        'Sits outside the system core temperate region in many climate models.',
        'Its larger size could imply a denser atmosphere or volatile-rich composition.',
      ],
      atmosphere: { color: '#7dd3fc', opacity: 0.14, scale: 1.04 },
    },
    {
      id: 'trappist-1h',
      name: 'TRAPPIST-1 h',
      type: 'Outer Rocky Planet',
      tidallyLocked: true,
      radius: 3.0,
      texture: '/textures/T1h.png',
      orbit: { au: 0.0619, radius: 146, speed: 0.23 },
      rotationSpeed: 0.03,
      description:
        'The outermost known TRAPPIST-1 planet, likely cold and weakly heated by its faint host star.',
      facts: [
        'Completes an orbit in about 18.8 Earth days.',
        'Receives only a small fraction of Earth\'s solar energy.',
        'May retain surface ice over much of the planet depending on its atmosphere.',
      ],
      material: { roughness: 0.85, metalness: 0.05 },
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

export const kepler90System = {
  id: 'kepler-90',
  name: 'Kepler-90',
  stars: [
    {
      id: 'kepler-90-a',
      name: 'Kepler-90',
      type: 'Sun-like Star',
      facts: [
        'A Sun-like star known for hosting one of the first eight-planet exoplanet systems discovered.',
      ],
      radius: 70,
      color: '#ffd7a8',
      texture: '/textures/sun.jpg',
      intensity: 102000,
      rotationSpeed: 0.0012,
      glow: { scale: 1.05, opacity: 0.26 },
    },
  ],
  planets: [
    {
      id: 'kepler-90-b',
      name: 'Kepler-90 b',
      type: 'Hot Rocky Planet',
      radius: 4.2,
      texture: '/textures/kepler90b.png',
      rotationSpeed: 0.72,
      description:
        'Kepler-90 b is the innermost known planet in the Kepler-90 system, orbiting very close to its host star on a short, intense year.',
      facts: [
        'Completes one orbit in roughly 7 Earth days.',
        'Orbits at about 0.074 AU, much closer to its star than Mercury is to the Sun.',
        'Lives in an eight-planet system, making Kepler-90 a milestone for compact multi-planet discoveries.',
        'Likely receives much stronger stellar radiation than Earth because of its close orbit.',
      ],
      orbit: {
        au: 0.074,
        radius: 140,
        speed: 6.30,
      },
      material: {
        roughness: 0.76,
        metalness: 0.12,
      },
    },
    {
      id: 'kepler-90-c',
      name: 'Kepler-90 c',
      type: 'Hot Rocky Planet',
      radius: 3.5,
      texture: '/textures/venus.jpg',
      rotationSpeed: 0.66,
      description:
        'A close-in rocky world slightly farther out than Kepler-90 b, still in an intensely irradiated inner region.',
      facts: [
        'Completes an orbit in about 8.7 Earth days.',
        'Orbits at roughly 0.089 AU from Kepler-90.',
        'Sits in the tightly packed inner chain of planets in the system.',
      ],
      orbit: {
        au: 0.089,
        radius: 168,
        speed: 5.04,
      },
      material: {
        roughness: 0.72,
        metalness: 0.14,
      },
      atmosphere: { color: '#f59e0b', opacity: 0.08, scale: 1.02 },
      glow: { color: '#fbbf24', opacity: 0.16 },
    },
    {
      id: 'kepler-90-i',
      name: 'Kepler-90 i',
      type: 'Super-Earth',
      radius: 4.2,
      texture: '/textures/kepler-90-i.png',
      rotationSpeed: 0.58,
      description:
        'An inner super-Earth-sized planet found in Kepler archival data, adding to Kepler-90\'s eight-planet status.',
      facts: [
        'Completes an orbit in roughly 14.4 Earth days.',
        'Orbits at approximately 0.107 AU from its host star.',
        'Its identification highlighted machine-learning-assisted analysis of Kepler light curves.',
      ],
      orbit: {
        au: 0.107,
        radius: 198,
        speed: 3.06,
      },
      material: {
        roughness: 0.7,
        metalness: 0.16,
      },
      atmosphere: { color: '#ffffff', opacity: 0.09, scale: 1.02 },
      glow: { color: '#ffffff', opacity: 0.034 },
    },
    {
      id: 'kepler-90-d',
      name: 'Kepler-90 d',
      type: 'Mini-Neptune',
      radius: 9.1,
      texture: '/textures/neptune.jpg',
      rotationSpeed: 0.42,
      description:
        'A larger planet on a wider orbit, likely richer in volatiles than the hot rocky inner worlds.',
      facts: [
        'Completes an orbit in about 59.7 Earth days.',
        'Orbits near 0.32 AU from Kepler-90.',
        'Marks the transition from the compact inner planets to cooler outer orbits.',
      ],
      orbit: {
        au: 0.32,
        radius: 360,
        speed: 0.72,
      },
      material: {
        roughness: 0.5,
        metalness: 0.08,
      },
      atmosphere: { color: '#60a5fa', opacity: 0.12, scale: 1.04 },
      glow: { color: '#93c5fd', opacity: 0.12 },
    },
    {
      id: 'kepler-90-e',
      name: 'Kepler-90 e',
      type: 'Mini-Neptune',
      radius: 8.4,
      texture: '/textures/uranus.jpg',
      rotationSpeed: 0.36,
      description:
        'A mid-system sub-Neptune candidate with a moderate orbit and a likely substantial atmosphere.',
      facts: [
        'Completes an orbit in roughly 91.9 Earth days.',
        'Orbits at around 0.42 AU.',
        'Part of the broader outer sequence that makes Kepler-90 resemble a compacted Solar System.',
      ],
      orbit: {
        au: 0.42,
        radius: 460,
        speed: 0.48,
      },
      material: {
        roughness: 0.52,
        metalness: 0.06,
      },
      atmosphere: { color: '#7dd3fc', opacity: 0.1, scale: 1.03 },
      glow: { color: '#38bdf8', opacity: 0.1 },
    },
    {
      id: 'kepler-90-f',
      name: 'Kepler-90 f',
      type: 'Mini-Neptune',
      radius: 9.1,
      texture: '/textures/saturn.jpg',
      rotationSpeed: 0.3,
      description:
        'An outer sub-Neptune on a longer period orbit, bridging the system\'s mid-range and giant planets.',
      facts: [
        'Completes an orbit in about 125 Earth days.',
        'Orbits near 0.48 AU from the host star.',
        'Likely receives less stellar heating than the inner Kepler-90 planets.',
      ],
      orbit: {
        au: 0.48,
        radius: 540,
        speed: 0.354,
      },
      material: {
        roughness: 0.58,
        metalness: 0.08,
      },
      atmosphere: { color: '#fcd34d', opacity: 0.08, scale: 1.03 },
      glow: { color: '#fde68a', opacity: 0.09 },
    },
    {
      id: 'kepler-90-g',
      name: 'Kepler-90 g',
      type: 'Gas Giant',
      radius: 25.2,
      texture: '/textures/kepler90g.png',
      rotationSpeed: 0.22,
      description:
        'A large outer planet in the system\'s giant-planet region, orbiting well beyond the inner compact chain.',
      facts: [
        'Completes one orbit in roughly 210.6 Earth days.',
        'Orbits at approximately 0.71 AU.',
        'One of two known giant planets in the Kepler-90 system.',
      ],
      orbit: {
        au: 0.71,
        radius: 720,
        speed: 0.21,
      },
      material: {
        roughness: 0.44,
        metalness: 0.08,
      },
      atmosphere: { color: '#ffffff', opacity: 0.07, scale: 1.02 },
      glow: { color: '#ffffff', opacity: 0.011 },
    },
    {
      id: 'kepler-90-h',
      name: 'Kepler-90 h',
      type: 'Gas Giant',
      radius: 35.0,
      texture: '/textures/saturn.jpg',
      rotationSpeed: 0.18,
      description:
        'The outermost known planet of the system, a giant world on the longest confirmed Kepler-90 orbit.',
      facts: [
        'Completes an orbit in about 331.6 Earth days.',
        'Orbits at roughly 1.01 AU, near an Earth-like star distance scale.',
        'Represents the far edge of the currently known Kepler-90 planetary architecture.',
      ],
      orbit: {
        au: 1.01,
        radius: 910,
        speed: 0.132,
      },
      material: {
        roughness: 0.46,
        metalness: 0.07,
      },
      atmosphere: { color: '#eab308', opacity: 0.06, scale: 1.02 },
      glow: { color: '#facc15', opacity: 0.1 },
    },
  ],
};
