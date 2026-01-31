import { useEffect, useMemo, useState } from 'react';
import planetsData from '../data/planets.json';
import './PlanetInfo.css';

const PlanetInfo = ({ planetName, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const planet = useMemo(
    () => planetsData.planets.find(p => p.name === planetName),
    [planetName]
  );

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 220);
  };

  if (!planet) return null;

  const planetIndex = planetsData.planets.findIndex(p => p.name === planetName) + 1;

  return (
    <aside className={`pi-panel ${isVisible ? 'visible' : ''}`} aria-label="Planet information">
      <div className="pi-header">
        <button onClick={handleClose} className="pi-back" aria-label="Back / close">
          <span className="pi-back-icon">‹</span>
        </button>

        <div className="pi-titlewrap">
          <div className="pi-title">{planet.name}</div>
          <div className="pi-subtitle">
            Planet {planetIndex} of {planetsData.planets.length}
            <span className="pi-dot" />
            <span className="pi-chip">
              <span className="pi-chip-dot" style={{ backgroundColor: planet.fallbackColor }} />
              {planet.type ?? 'Solar System'}
            </span>
          </div>
        </div>
      </div>

      <div className="pi-content">
        <section className="pi-section">
          <h3 className="pi-section-title">Overview</h3>
          <p className="pi-text">{planet.description}</p>
        </section>

        <section className="pi-section">
          <h3 className="pi-section-title">Interesting Facts</h3>
          <ul className="pi-facts">
            {planet.facts.map((fact, idx) => (
              <li key={idx} className="pi-fact">
                <span className="pi-fact-num">{idx + 1}</span>
                <span className="pi-fact-text">{fact}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pi-section">
          <h3 className="pi-section-title">Physical</h3>
          <div className="pi-props">
            <div className="pi-prop">
              <div className="pi-prop-label">Size</div>
              <div className="pi-prop-value">{planet.size} units</div>
            </div>
            <div className="pi-prop">
              <div className="pi-prop-label">Distance</div>
              <div className="pi-prop-value">{planet.orbitRadius} AU</div>
            </div>
            <div className="pi-prop">
              <div className="pi-prop-label">Tilt</div>
              <div className="pi-prop-value">{planet.axialTilt.toFixed(2)}°</div>
            </div>
            <div className="pi-prop">
              <div className="pi-prop-label">Orbit</div>
              <div className="pi-prop-value">{planet.orbitSpeed.toFixed(4)}</div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default PlanetInfo;
