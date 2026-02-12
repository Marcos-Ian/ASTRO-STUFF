import React from 'react';
import planetsData from '../data/planets.json';
import './SolarDescription.css';

const SolarDescription = ({ title, body, hint, ariaLabel }) => {
  const count = planetsData.planets.length;
  const resolvedTitle = title === undefined ? 'Solar System' : title;
  const resolvedBody =
    body === undefined
      ? `Interactive 3D demo featuring ${count} planets. Click a planet to view details.`
      : body;
  const resolvedHint =
    hint === undefined ? 'Use mouse or touch to orbit, zoom, and explore.' : hint;
  const resolvedLabel =
    ariaLabel ?? (resolvedTitle ? `${resolvedTitle} description` : 'System description');

  return (
    <div className="sys-description" role="region" aria-label={resolvedLabel}>
      {resolvedTitle ? <h4 className="sys-title">{resolvedTitle}</h4> : null}
      {resolvedBody ? <p className="sys-body">{resolvedBody}</p> : null}
      {resolvedHint ? <p className="sys-hint">{resolvedHint}</p> : null}
    </div>
  );
};

export default SolarDescription;
