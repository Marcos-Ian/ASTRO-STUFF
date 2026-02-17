import { Suspense, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './AstroDetail.css';
import Loader from '../components/Loader';
import StarSphere from '../models/StarSphere';
import { modelRegistry } from '../models';
import { moreAstrosCategories } from '../data/moreAstrosData';
import {
  cancri55System,
  glassJupiterSystem,
  kepler10System,
  kepler90System,
  proximaCentauriSystem,
  trappistSystem,
  wasp121System,
} from '../data/planetSystems';
import * as THREE from 'three';
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import PlanetSystemInfo from '../components/PlanetSystemInfo';
import CameraController from '../components/CameraController';
import SolarDescription from '../components/SolarDescription';
import StarInfo from '../components/StarInfo';

const systemByModelKey = {
  cancri55System: cancri55System,
  glassJupiter: glassJupiterSystem,
  kepler10System: kepler10System,
  kepler90System: kepler90System,
  proximaCentauri: proximaCentauriSystem,
  trappistSystem: trappistSystem,
  wasp121System: wasp121System,
};

const formatNumber = (value) => {
  if (!Number.isFinite(value)) return null;
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
};

const buildStarTitle = (system) => {
  const stars = system?.stars ?? [];
  if (!stars.length) return system?.name ?? 'Star';
  if (stars.length === 1) return stars[0].name ?? system?.name ?? 'Star';
  return stars
    .map((star) => star.name ?? star.id)
    .filter(Boolean)
    .join(' + ');
};

const buildStarFact = (system) => {
  const stars = system?.stars ?? [];
  if (!stars.length) return null;
  if (stars.length === 2) return 'Binary star system with two host stars.';
  if (stars.length > 2) return `Multi-star system with ${stars.length} host stars.`;
  const star = stars[0];
  const radius = formatNumber(star.radius);
  if (radius) return `${star.name ?? 'Host star'} is shown with a scaled radius of ${radius} units.`;
  return `${star.name ?? 'Host star'} anchors this system.`;
};

const AstroDetail = () => {
  const { id } = useParams();
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedSystemName, setSelectedSystemName] = useState(null);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedStarSystemName, setSelectedStarSystemName] = useState(null);
  const planetRefs = useRef({});
  const controlsRef = useRef(null);

  // Find the astro data from moreAstrosData
  const astroData = useMemo(() => {
    for (const category of moreAstrosCategories) {
      const found = category.items.find(item => item.id === id);
      if (found) return found;
    }
    return null;
  }, [id]);

  const systemForDescription = useMemo(() => {
    const modelKey = astroData?.modelInstances?.find(
      (instance) => systemByModelKey[instance.key]
    )?.key;
    if (!modelKey) return null;
    return systemByModelKey[modelKey] ?? null;
  }, [astroData]);

  const starTitle = useMemo(
    () => buildStarTitle(systemForDescription),
    [systemForDescription]
  );

  const starFact = useMemo(
    () => buildStarFact(systemForDescription),
    [systemForDescription]
  );

  const handlePlanetClick = (planet, system) => {
    setSelectedPlanet(planet ?? null);
    setSelectedSystemName(system?.name ?? null);
    setSelectedPlanetId(planet?.id ?? null);
    setSelectedStar(null);
    setSelectedStarSystemName(null);
  };

  const handleStarClick = (star, system) => {
    setSelectedStar(star ?? null);
    setSelectedStarSystemName(system?.name ?? null);
    setSelectedPlanet(null);
    setSelectedSystemName(null);
    setSelectedPlanetId(null);
  };

  const handleResetSelection = () => {
    setSelectedPlanet(null);
    setSelectedSystemName(null);
    setSelectedPlanetId(null);
    setSelectedStar(null);
    setSelectedStarSystemName(null);
  };

  return (
    <section className="home-section">
      {/* Rotation Speed Control */}
      <div className="rotation-speed-control">
        <div className="rotation-speed-label">
          {astroData ? astroData.name : 'Astronomy Detail'}
        </div>
        <div className="rotation-speed-controls">
          <button
            onClick={() => setRotationSpeed(Math.max(0, rotationSpeed - 0.5))}
            className="rotation-btn"
          >
            −
          </button>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            className="rotation-range"
            style={{
              background: `linear-gradient(to right, #a855f7 0%, #c084fc ${(rotationSpeed / 5) * 100}%, #374151 ${(rotationSpeed / 5) * 100}%, #374151 100%)`
            }}
          />
          <button
            onClick={() => setRotationSpeed(Math.min(5, rotationSpeed + 0.5))}
            className="rotation-btn"
          >
            +
          </button>
          <span className="rotation-value">{rotationSpeed.toFixed(1)}x</span>
        </div>
      </div>
      <Canvas
        className="canvas-full"
        camera={{ position: [0, 300, 800], fov: 75, near: 0.1, far: 10000 }}
        gl={{
          alpha: false,
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.17} />
          <hemisphereLight intensity={0.8} color="#bcd7ff" groundColor="#080808" />
          
          {/* Space background with stars */}
          <StarSphere />
          
          {/* Render multiple 3D models based on astro data */}
          {astroData?.modelInstances?.map((instance, idx) => {
            const ModelComponent = modelRegistry[instance.key];
            if (!ModelComponent) return null;

            const supportsPlanetSelection = [
              'cancri55System',
              'glassJupiter',
              'kepler10System',
              'kepler90System',
              'proximaCentauri',
              'trappistSystem',
              'wasp121System',
            ].includes(instance.key);

            if (supportsPlanetSelection) {
              return (
                <ModelComponent
                  key={idx}
                  {...instance}
                  speedMultiplier={rotationSpeed}
                  onPlanetClick={handlePlanetClick}
                  onStarClick={handleStarClick}
                  onPlanetRef={(name, ref) => {
                    if (ref) {
                      planetRefs.current[name] = ref;
                    } else {
                      delete planetRefs.current[name];
                    }
                  }}
                />
              );
            }

            return <ModelComponent key={idx} {...instance} />;
          })}
          
          <CameraController
            selectedPlanet={selectedPlanetId}
            planetRefs={planetRefs}
            controlsRef={controlsRef}
            onResetSelection={handleResetSelection}
          />
          <OrbitControls 
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={100}
            maxDistance={2000}
          />
            <EffectComposer>
                  <Bloom
                    intensity={2.5}
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.9}
                  />
                </EffectComposer>
        </Suspense>
      </Canvas>
      {systemForDescription && starFact ? (
        <SolarDescription
          title={starTitle}
          body={starFact}
          hint={null}
          ariaLabel={`${starTitle} star fact`}
        />
      ) : null}
      {selectedPlanet && (
        <PlanetSystemInfo
          planet={selectedPlanet}
          systemName={selectedSystemName}
          onClose={() => {
            setSelectedPlanet(null);
            setSelectedSystemName(null);
            setSelectedPlanetId(null);
          }}
        />
      )}
      {selectedStar && (
        <StarInfo
          star={selectedStar}
          systemName={selectedStarSystemName}
          onClose={() => {
            setSelectedStar(null);
            setSelectedStarSystemName(null);
          }}
        />
      )}
    </section>
  );
};

export default AstroDetail;
