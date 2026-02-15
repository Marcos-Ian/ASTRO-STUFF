import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TWO_PI = Math.PI * 2;
const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const ORBIT_TIME_SCALE = 0.08;
const FRAME_TIME_BASELINE = 1 / 60;

const solveKepler = (meanAnomaly, eccentricity) => {
  if (eccentricity === 0) return meanAnomaly;
  let eccentricAnomaly = eccentricity < 0.8 ? meanAnomaly : Math.PI;
  for (let i = 0; i < 8; i += 1) {
    const f = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
    const fPrime = 1 - eccentricity * Math.cos(eccentricAnomaly);
    eccentricAnomaly -= f / fPrime;
  }
  return eccentricAnomaly;
};

const setOrbitalPlanePosition = (target, semiMajor, eccentricity, eccentricAnomaly) => {
  const cosEccentricAnomaly = Math.cos(eccentricAnomaly);
  const sinEccentricAnomaly = Math.sin(eccentricAnomaly);
  const semiMinor = semiMajor * Math.sqrt(Math.max(0, 1 - eccentricity * eccentricity));

  // Parametric ellipse from eccentric anomaly avoids branch jumps around +/-PI.
  target.set(
    semiMajor * (cosEccentricAnomaly - eccentricity),
    0,
    semiMinor * sinEccentricAnomaly
  );
};

export function Orbit({
  radius = 0,
  semiMajorAxis,
  eccentricity = 0,
  speed = 0,
  period,
  phase = 0,
  inclination = 0,
  argumentOfPeriapsis = 0,
  longitudeOfAscendingNode = 0,
  lockToCenter = false,
  flatten = false,
  speedMultiplier = 1,
  children,
}) {
  const orbitRef = useRef();
  const meanAnomalyRef = useRef(THREE.MathUtils.degToRad(phase ?? 0));
  const position = useMemo(() => new THREE.Vector3(), []);

  const angles = useMemo(
    () => ({
      inclination: THREE.MathUtils.degToRad(inclination ?? 0),
      argumentOfPeriapsis: THREE.MathUtils.degToRad(argumentOfPeriapsis ?? 0),
      longitudeOfAscendingNode: THREE.MathUtils.degToRad(longitudeOfAscendingNode ?? 0),
    }),
    [inclination, argumentOfPeriapsis, longitudeOfAscendingNode]
  );

  useEffect(() => {
    meanAnomalyRef.current = THREE.MathUtils.degToRad(phase ?? 0);
  }, [phase]);

  useFrame(() => {
    if (!orbitRef.current) return;

    const semiAxis = semiMajorAxis ?? radius ?? 0;
    const clampedEccentricity = THREE.MathUtils.clamp(eccentricity ?? 0, 0, 0.99);
    const meanMotion = Number.isFinite(period) && period !== 0 ? TWO_PI / period : speed;
    const scaledMeanMotion =
      meanMotion * ORBIT_TIME_SCALE * speedMultiplier * FRAME_TIME_BASELINE;
    meanAnomalyRef.current = THREE.MathUtils.euclideanModulo(
      meanAnomalyRef.current + scaledMeanMotion,
      TWO_PI
    );
    const meanAnomaly = meanAnomalyRef.current;
    const eccentricAnomaly = solveKepler(meanAnomaly, clampedEccentricity);
    setOrbitalPlanePosition(position, semiAxis, clampedEccentricity, eccentricAnomaly);
    position.applyAxisAngle(Y_AXIS, angles.argumentOfPeriapsis);
    if (!flatten) {
      position.applyAxisAngle(X_AXIS, angles.inclination);
    }
    position.applyAxisAngle(Y_AXIS, angles.longitudeOfAscendingNode);

    orbitRef.current.position.copy(position);
    if (lockToCenter) {
      orbitRef.current.lookAt(0, 0, 0);
    }
  });

  return <group ref={orbitRef}>{children}</group>;
}
