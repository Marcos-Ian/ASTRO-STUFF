import React from 'react';
import planetsData from '../data/planets.json';
import './SolarDescription.css';

const SolarDescription = () => {
  const count = planetsData.planets.length;

  return (
    <div className="sys-description" role="region" aria-label="Solar system description">
      <h4 className="sys-title">Solar System</h4>
      <p className="sys-body">Interactive 3D demo featuring {count} planets. Click a planet to view details.</p>
      <p className="sys-hint">Use mouse or touch to orbit, zoom, and explore.</p>
    </div>
  );
};

export default SolarDescription;
