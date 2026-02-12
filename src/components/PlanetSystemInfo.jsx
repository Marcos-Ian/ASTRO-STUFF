import { useEffect, useState } from 'react';
import './PlanetInfo.css';

const PlanetSystemInfo = ({ planet, systemName, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [planet?.id]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 220);
  };

  if (!planet) return null;

  const physicalItems = [
    planet.radius != null ? { label: 'Size', value: `${planet.radius} units` } : null,
    planet.orbit?.au != null ? { label: 'Distance', value: `${planet.orbit.au} AU` } : null,
    planet.axialTilt != null
      ? { label: 'Tilt', value: `${Number(planet.axialTilt).toFixed(2)}°` }
      : null,
    planet.orbit?.speed != null
      ? { label: 'Orbit', value: Number(planet.orbit.speed).toFixed(4) }
      : null,
    planet.rotationSpeed != null
      ? { label: 'Rotation', value: Number(planet.rotationSpeed).toFixed(4) }
      : null,
  ].filter(Boolean);

  return (
    <aside className={`pi-panel ${isVisible ? 'visible' : ''}`} aria-label="Planet information">
      <div className="pi-header">
        <button onClick={handleClose} className="pi-back" aria-label="Back / close">
          <span className="pi-back-icon">&lt;</span>
        </button>

        <div className="pi-titlewrap">
          <div className="pi-title">{planet.name ?? planet.id}</div>
          <div className="pi-subtitle">
            {systemName ?? 'Planet System'}
            <span className="pi-dot" />
            <span className="pi-chip">
              <span
                className="pi-chip-dot"
                style={{ backgroundColor: planet.color ?? '#8ab4f8' }}
              />
              {planet.type ?? 'Exoplanet'}
            </span>
          </div>
        </div>
      </div>

      <div className="pi-content">
        <section className="pi-section">
          <h3 className="pi-section-title">Overview</h3>
          <p className="pi-text">{planet.description ?? 'No description available yet.'}</p>
        </section>

        {planet.facts?.length ? (
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
        ) : null}

        {physicalItems.length ? (
          <section className="pi-section">
            <h3 className="pi-section-title">Physical</h3>
            <div className="pi-props">
              {physicalItems.map((item) => (
                <div key={item.label} className="pi-prop">
                  <div className="pi-prop-label">{item.label}</div>
                  <div className="pi-prop-value">{item.value}</div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </aside>
  );
};

export default PlanetSystemInfo;
