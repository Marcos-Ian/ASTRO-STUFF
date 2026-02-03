import { Suspense, useState, useRef } from 'react'
import './Home.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import Loader from '../components/Loader'
import SolarSystem from '../models/SolarSystem'
import PlanetInfo from '../components/PlanetInfo'
import StarSphere from '../models/StarSphere'
import * as THREE from 'three'
import CameraController from '../components/CameraController'
import SolarDescription from '../components/SolarDescription'
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Home = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const planetRefs = useRef({});
  const controlsRef = useRef(null);

  const handlePlanetClick = (planetName) => {
      console.log('handlePlanetClick called with:', planetName); // ADD THIS
    setSelectedPlanet(planetName);
    console.log('Selected planet:', planetName);
  };

  const handleResetSelection = () => {
    setSelectedPlanet(null);
    console.log('Camera focus reset to sun');
  };

  return (
    <section className="home-section">
      {/* Rotation Speed Control */}
      <div className="rotation-speed-control">
        <div className="rotation-speed-label">Rotation Speed</div>
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
          <SolarSystem 
            position={[0, 0, 0]} 
            onPlanetClick={handlePlanetClick} 
            selectedPlanet={selectedPlanet}
            rotationSpeed={rotationSpeed}
            onPlanetRef={(name, ref) => {
              if (ref) {
                planetRefs.current[name] = ref;
              } else {
                delete planetRefs.current[name];
              }
            }}
          />
          <CameraController 
            selectedPlanet={selectedPlanet} 
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
      {/* Small right-side description */}
      <SolarDescription />
      {/* Planet info panel */}
      {selectedPlanet && (
        <PlanetInfo 
          planetName={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
        />
      )}
    </section>
  );
}

export default Home;