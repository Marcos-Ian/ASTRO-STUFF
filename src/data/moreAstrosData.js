export const moreAstrosCategories = [
  {
    id: 'extreme-planets',
    title: 'Extreme Planets',
    description:
      'Worlds that push physics to the limit — lava oceans, ultra-dense super-Earths, and scorching hot Jupiters.',
    items: [
      {
        id: '55-cancri-e',
        name: '55 Cancri e',
        subtitle: 'Diamond World • Super-Earth',
        route: '/astros/55-cancri-e',
         cardImage: '/CardImage/55 Cancri.png',
        modelInstances: [{ key: 'cancri55System', position: [0, 0, 0], scale: 1 }],
        // tags removed
        // Add an image path from /public, e.g. '/textures/HD189733b.png'
        preview: { type: 'gradient', accent: '#c084fc' },
        facts: [
          'Orbits its star in ~18 hours',
          'Dayside temperatures hot enough to melt rock',
          'May have a thin atmosphere of vaporized minerals',
        ],
      },
      {
        id: 'hd-189733b',
        name: 'HD 189733 b',
        subtitle: 'Hot Jupiter • “Raining Glass”',
        route: '/astros/hd-189733b',
        modelInstances: [{ key: 'glassJupiter', position: [0, 0, 0], scale: 1 }],
        cardImage: '/CardImage/HD189733b.png',
        preview: { type: 'gradient', accent: '#60a5fa' },
        facts: [
          'Violent winds can exceed ~5,000 mph (model-dependent)',
          'Silicate particles may form glassy precipitation',
          'Deep blue tint from atmospheric haze',
        ],
      },
      {
        id: 'wasp-121b',
        name: 'WASP-121 b',
        subtitle: 'Ultra-hot Jupiter • Stratosphere',
        route: '/astros/wasp-121b',

        modelInstances: [{ key: 'wasp121System', position: [0, 0, 0], scale: 1 }],
        cardImage: '/CardImage/WASP121-B.png',
        preview: { type: 'gradient', accent: '#f472b6' },
        facts: [
          'So hot it can vaporize metals',
          'Evidence for a temperature inversion (stratosphere)',
          'Orbits extremely close to its star',
        ],
      },
      {
        id: 'kepler-10b',
        name: 'Kepler-10 b',
        subtitle: 'Scorched Rock • Super-Earth',
        route: '/astros/kepler-10b',
        modelInstances: [{ key: 'kepler10System', position: [0, 0, 0], scale: 1 }],
        // tags removed
        cardImage: '/CardImage/kepler-10b.png',
        preview: { type: 'gradient', accent: '#a78bfa' },
        facts: [
          'One of the first confirmed rocky exoplanets',
          'Likely tidally locked',
          'Extremely high surface temperatures',
        ],
      },
    ],
  },
  {
    id: 'other-solar-systems',
    title: 'Other Solar Systems',
    description:
      'Famous multi-planet systems and compact orbits — a quick tour beyond our neighborhood.',
    items: [
      {
        id: 'trappist-1',
        name: 'TRAPPIST-1',
        subtitle: '7 Worlds • Ultra-cool Dwarf',
        route: '/astros/trappist-1',
        modelInstances: [{ key: 'trappistSystem', position: [0, 0, 0], scale: 1 }],
        // tags removed
        cardImage: ' /CardImage/TRAPPIST-1.png',
        preview: { type: 'gradient', accent: '#22c55e' },
        facts: [
          'Seven Earth-sized planets',
          'Several orbit in/near the habitable zone',
          'Planets are packed closer than Mercury is to the Sun',
        ],
      },
      {
        id: 'kepler-90',
        name: 'Kepler-90 System',
        route: '/astros/kepler-90',
        modelInstances: [{ key: 'kepler90System', position: [0, 0, 0], scale: 1 }],
        subtitle: '8 Planets • Sun-like Star',
        // tags removed
        cardImage: '  /CardImage/Kepler90.png',
        preview: { type: 'gradient', accent: '#f59e0b' },
        facts: [
          'Contains eight known planets: Kepler-90 b, c, i, d, e, f, g, and h',
          'Its layout is often compared to a compacted version of our Solar System',
          'Kepler archival data plus ML-assisted vetting helped confirm Kepler-90 i',
        ],
      },
      {
        id: 'hr-8799',
        name: 'HR 8799',
        subtitle: 'Directly Imaged Giants',
        route: '/astros/hr-8799',
        modelInstances: [{ key: 'hr8799System', position: [0, 0, 0], scale: 1 }],
        // tags removed
        cardImage: '  /CardImage/HR 8799.png',
        preview: { type: 'gradient', accent: '#38bdf8' },
        facts: [
          'Multiple massive planets imaged directly',
          'Young system — planets glow in infrared',
          'Wide orbits compared to typical exoplanets',
        ],
      },
      {
        id: 'proxima-centauri',
        name: 'Proxima Centauri',
        subtitle: 'Nearest Star • Proxima b',
        route: '/astros/proxima-centauri',
        modelInstances: [{ key: 'proximaCentauri', position: [0, 0, 0], scale: 1 }],
        // tags removed
        cardImage: '/CardImage/ProximaCentauri.png',
        preview: { type: 'gradient', accent: '#ef4444' },
        facts: [
          'Closest star to the Sun',
          'Hosts at least one Earth-mass planet candidate',
          'Star is active with frequent flares',
        ],
      },
    ],
  },
  {
    id: 'stellar-objects',
    title: 'Stellar Objects',
    description:
      'From stellar remnants to monsters — the engines and endpoints of stars across the cosmos.',
    items: [
      {
        id: 'pulsar',
        name: 'Pulsar',
        subtitle: 'Rotating Neutron Star',
        route: '/astros/pulsar',
        modelInstances: [{ key: 'pulsarSystem', position: [0, 0, 0], scale: 1 }],
        // tags removed
        cardImage: ' /CardImage/pulsar.png',
        preview: { type: 'gradient', accent: '#93c5fd' },
        facts: [
          'Dense stellar remnant with intense magnetic fields',
          'Emits lighthouse-like beams of radiation',
          'Can spin from milliseconds to seconds per rotation',
        ],
      },
      {
        id: 'magnetar',
        name: 'Magnetar',
        subtitle: 'Extreme Magnetic Field',
        route: '/astros/magnetar',
        modelInstances: [{ key: 'magnetarSystem', position: [0, 0, 0], scale: 1 }],
        // tags removed
        cardImage: '/CardImage/magnetar.png',
        preview: { type: 'gradient', accent: '#e879f9' },
        facts: [
          'Magnetic field can be trillions of times stronger than Earth’s',
          'Can produce powerful X-ray/gamma-ray bursts',
          'A rare, highly energetic neutron star variant',
        ],
      },
      {
        id: 'white-dwarf',
        name: 'White Dwarf',
        subtitle: 'Stellar Core Remnant',
        // tags removed
        cardImage: '',
        preview: { type: 'gradient', accent: '#f8fafc' },
        facts: [
          'Earth-sized but with Sun-like mass',
          'Final state for many stars (including the Sun)',
          'Slowly cools over billions of years',
        ],
      },
      {
        id: 'red-giant',
        name: 'Red Giant',
        subtitle: 'Expanded Late-stage Star',
        // tags removed
        cardImage: '',
        preview: { type: 'gradient', accent: '#fb7185' },
        facts: [
          'Occurs when a star exhausts core hydrogen',
          'Outer layers expand dramatically',
          'Surface temperature drops while luminosity rises',
        ],
      },
    ],
  },
]

export const flattenAstros = (categories) =>
  categories.flatMap((category) =>
    category.items.map((item) => ({ ...item, categoryId: category.id, categoryTitle: category.title }))
  )
