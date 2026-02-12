import { useEffect, useState } from 'react';
import './PlanetInfo.css';

const StarInfo = ({ star, systemName, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!star) return undefined;
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [star?.id]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 220);
  };

  if (!star) return null;

  const facts = Array.isArray(star.facts) ? star.facts : [];
  const physicalItems = [
    star.radius != null ? { label: 'Size (scaled)', value: `${star.radius} units` } : null,
    Number.isFinite(star.intensity)
      ? { label: 'Light (scaled)', value: `${Math.round(star.intensity)}` }
      : null,
    star.rotationSpeed != null
      ? { label: 'Spin', value: Number(star.rotationSpeed).toFixed(4) }
      : null,
  ].filter(Boolean);

  return (
    <aside className={`pi-panel ${isVisible ? 'visible' : ''}`} aria-label="Star information">
      <div className="pi-header">
        <button onClick={handleClose} className="pi-back" aria-label="Back / close">
          <span className="pi-back-icon">&lt;</span>
        </button>

        <div className="pi-titlewrap">
          <div className="pi-title">{star.name ?? star.id ?? 'Star'}</div>
          <div className="pi-subtitle">
            {systemName ?? 'Star System'}
            <span className="pi-dot" />
            <span className="pi-chip">
              <span
                className="pi-chip-dot"
                style={{ backgroundColor: star.color ?? '#facc15' }}
              />
              {star.type ?? 'Star'}
            </span>
          </div>
        </div>
      </div>

      <div className="pi-content">
        {star.description ? (
          <section className="pi-section">
            <h3 className="pi-section-title">Overview</h3>
            <p className="pi-text">{star.description}</p>
          </section>
        ) : null}

        {facts.length ? (
          <section className="pi-section">
            <h3 className="pi-section-title">Interesting Facts</h3>
            <ul className="pi-facts">
              {facts.map((fact, idx) => (
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

export default StarInfo;
