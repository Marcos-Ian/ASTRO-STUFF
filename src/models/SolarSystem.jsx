import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Html } from '@react-three/drei';


/* =======================
   Asteroid Belt (Main Belt Example)
   - Uses InstancedMesh for performance
======================= */
function AsteroidBelt({
  innerRadius = 480, // between Mars and Jupiter (in your units)
  outerRadius = 700,
  beltWidth = 60,
  count = 600,
  minSize = 1.2,
  maxSize = 3.5,
  orbitSpeed = 0.0002,
  speedMultiplier = 1
}) {
  const meshRef = useRef();
  const groupRef = useRef();
  // Optionally, use a rocky texture or just a gray color
  // const texture = useTexture('/textures/asteroid.jpg');

  // Precompute asteroid transforms
  const asteroids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // Random angle
      const theta = Math.random() * Math.PI * 2;
      // Random radius within belt
      const r = innerRadius + Math.random() * (outerRadius - innerRadius);
      // Random vertical offset for thickness
      const y = (Math.random() - 0.5) * beltWidth;
      // Position
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      // Random scale
      const scale = minSize + Math.random() * (maxSize - minSize);
      // Random rotation
      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
      arr.push({ position: [x, y, z], scale, rotation: rot });
    }
    return arr;
  }, [count, innerRadius, outerRadius, beltWidth, minSize, maxSize]);

  // Animate the belt's rotation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += orbitSpeed * speedMultiplier;
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;
    asteroids.forEach((ast, i) => {
      const m = new THREE.Matrix4();
      m.compose(
        new THREE.Vector3(...ast.position),
        new THREE.Quaternion().setFromEuler(new THREE.Euler(...ast.rotation)),
        new THREE.Vector3(ast.scale, ast.scale, ast.scale)
      );
      meshRef.current.setMatrixAt(i, m);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [asteroids]);

  return (
    <group ref={groupRef}>
      <instancedMesh frustumCulled={false} ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#888888" roughness={1} metalness={0.1} />
      </instancedMesh>
    </group>
  );
}

import * as THREE from 'three';
import planetsData from '../data/planets.json';

/* =======================
   Planet (now supports children)
   - children: follows planet orbit + position
   - tiltChildren: follows orbit + position + axial tilt
======================= */
function Planet({
  size,
  texturePath,
  fallbackColor,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  emissive,
  axialTilt,
  children,
  tiltChildren,
  onClick,
  planetName,
  onPlanetRef,
  speedMultiplier = 1
}) {
  const planetRef = useRef();
  const orbitRef = useRef();
  const positionGroupRef = useRef();

  const texture = useTexture(texturePath, undefined, () => {
    console.warn(`Failed to load texture: ${texturePath}`);
  });

  useFrame(() => {
    if (orbitRef.current && orbitSpeed) orbitRef.current.rotation.y += orbitSpeed * speedMultiplier;
    if (planetRef.current && rotationSpeed) planetRef.current.rotation.y += rotationSpeed * speedMultiplier;
  });

  const tiltRad = THREE.MathUtils.degToRad(axialTilt ?? 0);
  const hasTexture = texture && texture.image;

  useEffect(() => {
    if (onPlanetRef && planetName) {
      onPlanetRef(planetName, positionGroupRef.current);
    }
    return () => {
      if (onPlanetRef && planetName) onPlanetRef(planetName, null);
    };
  }, [onPlanetRef, planetName]);

  return (
    <group ref={orbitRef}>
      {/* This group is what moves around the sun */}
      <group position={[orbitRadius, 0, 0]} ref={positionGroupRef}>
        {/* Planet axial tilt group */}
        <group rotation={[tiltRad, 0, 0]}>
          <Sphere 
            ref={planetRef} 
            args={[size, 64, 64]}
             castShadow
             receiveShadow
          onClick={(e) => {
  e.stopPropagation();
  console.log('Planet clicked:', planetName); 
  if (onClick && planetName) {
    onClick(planetName);
  }
}}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'default';
            }}
          >
            <meshStandardMaterial
              map={hasTexture ? texture : null}
              color={hasTexture ? undefined : fallbackColor}
              emissive={emissive || '#000000'}
              emissiveIntensity={emissive ? 0.2 : 0}
              roughness={0.95}
              metalness={0}
            />
          </Sphere>

          {/* Stuff that should tilt with the planet (rings) */}
          {tiltChildren}
        </group>

        {/* Label - positioned below planet, outside tilt group */}
        <Html
           position={[0, -(size + 10), 0]} 
          center
          distanceFactor={30}
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -1, // Negative z-index to ensure it's behind info panel
          }}
        >
          <div style={{
            color: 'white',
            padding: '4px 12px',
            borderRadius: '6px',
              fontSize: '450px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              fontFamily: 'Orbitron, sans-serif',
          }}>
            {planetName}
          </div>
        </Html>

        {/* Stuff that should follow the planet position but NOT axial tilt (moons) */}
        {children}
      </group>
    </group>
  );
}

/* =======================
   Moon
======================= */
function Moon({ size, texturePath, fallbackColor, orbitRadius, orbitSpeed, rotationSpeed, speedMultiplier = 1 }) {
  const moonRef = useRef();
  const orbitRef = useRef();

  const texture = useTexture(texturePath, undefined, () => {
    console.warn(`Failed to load moon texture: ${texturePath}`);
  });

  useFrame(() => {
    if (orbitRef.current) orbitRef.current.rotation.y += orbitSpeed * speedMultiplier;
    if (moonRef.current) moonRef.current.rotation.y += rotationSpeed * speedMultiplier;
  });

  const hasTexture = texture && texture.image;

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadius, 0, 0]}>
        <Sphere ref={moonRef} args={[size, 32, 32]} castShadow receiveShadow>
          <meshStandardMaterial
            map={hasTexture ? texture : null}
            color={hasTexture ? undefined : fallbackColor}
            roughness={0.9}
            metalness={0.05}
          />
        </Sphere>
      </group>
    </group>
  );
}

/* =======================
   Saturn Rings
   NOTE: Put this inside tiltChildren so it follows Saturn tilt
======================= */
function SaturnRings() {
  const inner = 38;
  const outer = 65;

  // High-res radial texture (detail + edge fade + subtle noise)
  const ringTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 8; // not important (angle repeats)
    canvas.height = 2048; // IMPORTANT: radial detail
    const ctx = canvas.getContext('2d');

    // Base radial banding
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);

    // Inner fade-in
    g.addColorStop(0.0, 'rgba(0,0,0,0)');
    g.addColorStop(0.03, 'rgba(190,170,130,0.20)');
    g.addColorStop(0.07, 'rgba(190,170,130,0.55)');

    // C-ring / B-ring style layers (more, thinner bands)
    g.addColorStop(0.12, 'rgba(170,150,115,0.65)');
    g.addColorStop(0.18, 'rgba(210,190,150,0.80)');
    g.addColorStop(0.24, 'rgba(160,140,105,0.55)');

    // Cassini Division-ish gap
    g.addColorStop(0.30, 'rgba(40,30,20,0.10)');
    g.addColorStop(0.33, 'rgba(150,130,95,0.55)');

    // A-ring outer layers
    g.addColorStop(0.42, 'rgba(210,190,150,0.75)');
    g.addColorStop(0.52, 'rgba(170,150,115,0.60)');
    g.addColorStop(0.62, 'rgba(210,190,150,0.70)');

    // Outer fade-out
    g.addColorStop(0.82, 'rgba(150,130,95,0.45)');
    g.addColorStop(0.92, 'rgba(150,130,95,0.20)');
    g.addColorStop(1.0, 'rgba(0,0,0,0)');

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle noise + micro-banding to avoid "too smooth" look
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = img.data;

    for (let y = 0; y < canvas.height; y++) {
      const band = 0.06 * Math.sin(y * 0.05) + 0.04 * Math.sin(y * 0.013);
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const n = (Math.random() - 0.5) * 0.12; // subtle grain
        d[i + 0] = Math.min(255, d[i + 0] * (1 + band + n)); // R
        d[i + 1] = Math.min(255, d[i + 1] * (1 + band + n)); // G
        d[i + 2] = Math.min(255, d[i + 2] * (1 + band + n)); // B
      }
    }
    ctx.putImageData(img, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Geometry with polar UVs (your “wrap around” fix)
  const geom = useMemo(() => {
    const g = new THREE.RingGeometry(inner, outer, 256, 16);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      const v = (r - inner) / (outer - inner);

      let a = Math.atan2(y, x);
      if (a < 0) a += Math.PI * 2;
      const u = a / (Math.PI * 2);

      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
    return g;
  }, [inner, outer]);

  return (
    <group>
      {/* MAIN rings */}
      <mesh geometry={geom} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          map={ringTexture}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          alphaTest={0.01}
          roughness={1}
          metalness={0}
          opacity={0.95}
        />
      </mesh>

      {/* Thin “shadow/dark” pass to add depth (subtle) */}
      <mesh geometry={geom} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
        <meshStandardMaterial
          color={'#000000'}
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}

/* =======================
   Sun (FIXED so texture actually shows)
   Core uses MeshBasicMaterial so it won't get blown out by lighting.
   Glow is handled by additive corona shells + a more reasonable pointLight.
======================= */
function Sun({ speedMultiplier = 1 }) {
  const sunRef = useRef();
  const coronaRef = useRef();
  const glowRef = useRef();

  const sunTexture = useTexture('/textures/sun.jpg', undefined, () => {
    console.warn('Failed to load sun texture: /textures/sun.jpg');
  });

  // Improve texture clarity + correct color space
  useEffect(() => {
    if (!sunTexture) return;

    // If you use R3F's <Canvas gl={{ outputColorSpace: THREE.SRGBColorSpace }} />
    // this still helps keep the texture correct + sharp.
    sunTexture.colorSpace = THREE.SRGBColorSpace;
    sunTexture.anisotropy = 16;
    sunTexture.minFilter = THREE.LinearMipmapLinearFilter;
    sunTexture.magFilter = THREE.LinearFilter;
    sunTexture.needsUpdate = true;
  }, [sunTexture]);

  useFrame(({ clock }) => {
    if (sunRef.current) sunRef.current.rotation.y += 0.0008 * speedMultiplier;

    // Subtle breathing glow so it feels alive (doesn't affect texture visibility)
    const t = clock.getElapsedTime();
    const pulseA = 0.42 + Math.sin(t * 2.0) * 0.05;
    const pulseB = 0.20 + Math.sin(t * 1.3 + 1.2) * 0.03;

    if (coronaRef.current) coronaRef.current.opacity = pulseA;
    if (glowRef.current) glowRef.current.opacity = pulseB;
  });

  return (
    <group>
      <pointLight intensity={550000} decay={2} distance={0} color="#FFF2CC" />

      {/* Core (shows texture clearly; ignores lights so it won't turn into a flat yellow ball) */}
      <Sphere ref={sunRef} args={[50, 64, 64]}>
        <meshBasicMaterial
          map={sunTexture}
          color="#ffffff"
          toneMapped={false}
        />
      </Sphere>


      {/* Corona */}
      <Sphere args={[51.8, 64, 64]}>
        <meshBasicMaterial
          ref={coronaRef}
          color="#ee8c03"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </Sphere>


    </group>
  );
}

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

        return <Planet key={planet.name} {...planet} onClick={onPlanetClick} planetName={planet.name} onPlanetRef={onPlanetRef} speedMultiplier={rotationSpeed} />;
      })}
    </group>
  );
}

export default SolarSystem;
