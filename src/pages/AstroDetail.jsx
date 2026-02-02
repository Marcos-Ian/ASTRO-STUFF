import { Suspense, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './AstroDetail.css';
import Loader from '../components/Loader';
import StarSphere from '../models/StarSphere';
import { modelRegistry } from '../models';
import { moreAstrosCategories } from '../data/moreAstrosData';
import * as THREE from 'three';

const AstroDetail = () => {
  const { id } = useParams();
  const [rotationSpeed, setRotationSpeed] = useState(1);

  // Find the astro data from moreAstrosData
  const astroData = useMemo(() => {
    for (const category of moreAstrosCategories) {
      const found = category.items.find(item => item.id === id);
      if (found) return found;
    }
    return null;
  }, [id]);

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
            return <ModelComponent key={idx} {...instance} />;
          })}
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={100}
            maxDistance={2000}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default AstroDetail;
