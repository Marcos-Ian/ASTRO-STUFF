import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useSpin } from './useSpin';

const TWO_PI = Math.PI * 2;

const buildMagneticArcCurve = (surfaceRadius, apexHeight, segments) => {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const theta = (i / segments) * TWO_PI;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const radialDistance = surfaceRadius + apexHeight * sinTheta * sinTheta;
    points.push(new THREE.Vector3(radialDistance * sinTheta, radialDistance * cosTheta, 0));
  }
  return new THREE.CatmullRomCurve3(points, true);
};

export function Star({
  radius,
  color = '#ffffff',
  texture,
  intensity = 50000,
  distance = 0,
  decay = 2,
  rotationSpeed = 0,
  speedMultiplier = 1,
  glow,
  onClick,
  starData,
}) {
  const starRef = useRef();
  const upperJetRef = useRef();
  const lowerJetRef = useRef();
  const upperCoreJetRef = useRef();
  const lowerCoreJetRef = useRef();
  const upperJetMaterialRef = useRef();
  const lowerJetMaterialRef = useRef();
  const upperCoreJetMaterialRef = useRef();
  const lowerCoreJetMaterialRef = useRef();
  const burstRingRef = useRef();
  const burstRingMaterialRef = useRef();
  const magneticArcGroupRef = useRef();
  const magneticArcMaterialRefs = useRef([]);
  const sourceStarTexture = useTexture(texture || '/textures/sun.jpg');
  const starTexture = useMemo(() => {
    if (!sourceStarTexture) return null;
    const nextTexture = sourceStarTexture.clone();
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 16;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.needsUpdate = true;
    return nextTexture;
  }, [sourceStarTexture]);

  useEffect(() => {
    return () => {
      if (starTexture) starTexture.dispose();
    };
  }, [starTexture]);

  useSpin(starRef, { speed: rotationSpeed, speedMultiplier });

  const polarOutburst = starData?.polarOutburst ?? null;
  const outburstColor = polarOutburst?.color ?? '#f0abfc';
  const beamLength = radius * (polarOutburst?.lengthFactor ?? 5.5);
  const beamBaseRadius = radius * (polarOutburst?.baseWidthFactor ?? polarOutburst?.widthFactor ?? 0.22);
  const beamFarRadius = radius * (polarOutburst?.farWidthFactor ?? 0);
  const useFlaredBeam = beamFarRadius > 0;
  const baseOpacity = polarOutburst?.opacity ?? 0.18;
  const baseRingOpacity = polarOutburst?.ringOpacity ?? 0.2;
  const coreWidthRatio = THREE.MathUtils.clamp(polarOutburst?.coreWidthRatio ?? 0.34, 0.05, 1);
  const coreBaseRadius = beamBaseRadius * coreWidthRatio;
  const coreFarRadius = beamFarRadius * coreWidthRatio;
  const coreOpacityBase = polarOutburst?.coreOpacity ?? Math.min(1, baseOpacity * 2.4);
  const corePulseStrength = polarOutburst?.corePulseStrength ?? 0.16;
  const coreColor = polarOutburst?.coreColor ?? '#e0f2ff';
  const magneticArcs = useMemo(() => {
    if (starData?.magneticArcs) return starData.magneticArcs;
    return polarOutburst ? {} : null;
  }, [polarOutburst, starData?.magneticArcs]);

  const magneticFieldLines = useMemo(() => {
    if (!magneticArcs) return [];

    const surfaceRadius = radius * (magneticArcs.surfaceFactor ?? 1.02);
    const sharedSegments = Math.max(48, Math.round(magneticArcs.segments ?? 160));
    const sharedThicknessFactor = magneticArcs.thicknessFactor ?? 0.006;
    const sharedOpacity = magneticArcs.opacity ?? 0.34;
    const arcColor = magneticArcs.color ?? outburstColor;
    const fallbackCount = Math.max(4, Math.round(magneticArcs.count ?? 10));

    const innerLayerConfig = magneticArcs.innerLayer ?? {
      count: Math.ceil(fallbackCount / 2),
      apexFactor: magneticArcs.innerFactor ?? 0.7,
      opacity: sharedOpacity * 1.1,
      phaseOffset: 0,
    };

    const outerLayerConfig = magneticArcs.outerLayer ?? {
      count: Math.ceil(fallbackCount / 2),
      apexFactor: magneticArcs.outerFactor ?? 2.75,
      opacity: sharedOpacity * 0.8,
      phaseOffset: 0.5,
    };

    const buildLayer = (layerId, layerConfig, defaults) => {
      const count = Math.max(1, Math.round(layerConfig.count ?? defaults.count));
      const apex = radius * (layerConfig.apexFactor ?? defaults.apexFactor);
      const segments = Math.max(48, Math.round(layerConfig.segments ?? sharedSegments));
      const tubeRadius =
        radius * (layerConfig.thicknessFactor ?? defaults.thicknessFactor ?? sharedThicknessFactor);
      const phaseOffset = layerConfig.phaseOffset ?? defaults.phaseOffset ?? 0;
      const opacity = layerConfig.opacity ?? defaults.opacity ?? sharedOpacity;
      const layerColor = layerConfig.color ?? arcColor;

      return Array.from({ length: count }, (_, index) => ({
        key: `magnetic-arc-${layerId}-${index}`,
        curve: buildMagneticArcCurve(surfaceRadius, apex, segments),
        rotation: [0, ((index + phaseOffset) / count) * Math.PI, 0],
        tubeRadius,
        tubularSegments: segments,
        color: layerColor,
        opacity,
      }));
    };

    return [
      ...buildLayer('inner', innerLayerConfig, {
        count: 6,
        apexFactor: 0.7,
        thicknessFactor: 0.0055,
        opacity: sharedOpacity * 1.1,
        phaseOffset: 0,
      }),
      ...buildLayer('outer', outerLayerConfig, {
        count: 6,
        apexFactor: 2.75,
        thicknessFactor: 0.0042,
        opacity: sharedOpacity * 0.8,
        phaseOffset: 0.5,
      }),
    ];
  }, [magneticArcs, outburstColor, radius]);

  useEffect(() => {
    magneticArcMaterialRefs.current = magneticFieldLines.map(() => null);
  }, [magneticFieldLines]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (polarOutburst) {
      const cycleRate = polarOutburst.cycleRate ?? 2.4;
      const burstRate = polarOutburst.burstRate ?? 0.65;
      const sharpness = polarOutburst.sharpness ?? 10;
      const strength = polarOutburst.strength ?? 1;
      const pulseDepth = THREE.MathUtils.clamp(polarOutburst.pulseDepth ?? 1, 0, 1);

      const pulseWave = 0.55 + 0.45 * Math.sin(t * cycleRate * TWO_PI);
      const beamPulse = 1 - pulseDepth + pulseWave * pulseDepth;
      const burstPulse = Math.pow(Math.max(0, Math.sin(t * burstRate * TWO_PI)), sharpness);
      const beamOpacity = Math.min(
        1,
        (baseOpacity * beamPulse + (polarOutburst.burstOpacity ?? 0.75) * burstPulse) * strength
      );
      const coreOpacity = THREE.MathUtils.clamp(
        coreOpacityBase * (1 + corePulseStrength * Math.sin(t * cycleRate * TWO_PI * 1.35)) * strength,
        0,
        1
      );

      if (upperJetMaterialRef.current) {
        upperJetMaterialRef.current.opacity = beamOpacity;
      }
      if (lowerJetMaterialRef.current) {
        lowerJetMaterialRef.current.opacity = beamOpacity;
      }
      if (upperCoreJetMaterialRef.current) {
        upperCoreJetMaterialRef.current.opacity = coreOpacity;
      }
      if (lowerCoreJetMaterialRef.current) {
        lowerCoreJetMaterialRef.current.opacity = coreOpacity;
      }

      const stretch = 1 + burstPulse * 0.9;
      if (upperJetRef.current) {
        upperJetRef.current.scale.y = stretch;
      }
      if (lowerJetRef.current) {
        lowerJetRef.current.scale.y = stretch;
      }
      if (upperCoreJetRef.current) {
        upperCoreJetRef.current.scale.y = stretch;
      }
      if (lowerCoreJetRef.current) {
        lowerCoreJetRef.current.scale.y = stretch;
      }

      if (burstRingRef.current) {
        const ringScale = 1 + burstPulse * 2.2;
        burstRingRef.current.scale.setScalar(ringScale);
      }
      if (burstRingMaterialRef.current) {
        burstRingMaterialRef.current.opacity = Math.min(
          1,
          baseRingOpacity * burstPulse * strength
        );
      }
    }

    if (magneticFieldLines.length > 0) {
      if (magneticArcGroupRef.current) {
        const arcSpinRate = magneticArcs?.spinRate ?? 0.08;
        const arcWobble = THREE.MathUtils.degToRad(magneticArcs?.wobble ?? 4);
        magneticArcGroupRef.current.rotation.y += arcSpinRate * speedMultiplier * delta;
        magneticArcGroupRef.current.rotation.z = Math.sin(t * 0.25) * arcWobble;
      }

      const shimmerRate = magneticArcs?.shimmerRate ?? 0.45;
      const shimmerStrength = magneticArcs?.shimmerStrength ?? 0.18;
      magneticArcMaterialRefs.current.forEach((material, index) => {
        if (!material) return;
        const baseLineOpacity = magneticFieldLines[index]?.opacity ?? 0.3;
        const shimmer = 1 + shimmerStrength * Math.sin(t * TWO_PI * shimmerRate + index * 0.7);
        material.opacity = THREE.MathUtils.clamp(baseLineOpacity * shimmer, 0, 1);
      });
    }
  });

  return (
    <group>
      <pointLight intensity={intensity} decay={decay} distance={distance} color={color} />
      <mesh
        ref={starRef}
        onClick={(e) => {
          if (!onClick) return;
          e.stopPropagation();
          onClick(starData);
        }}
        onPointerOver={(e) => {
          if (!onClick) return;
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          if (!onClick) return;
          e.stopPropagation();
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial map={starTexture} color={color} toneMapped />
      </mesh>
      {(polarOutburst || magneticFieldLines.length > 0) && (
        <group>
          {magneticFieldLines.length > 0 && (
            <group ref={magneticArcGroupRef}>
              {magneticFieldLines.map((arc, index) => (
                <mesh key={arc.key} rotation={arc.rotation}>
                  <tubeGeometry args={[arc.curve, arc.tubularSegments, arc.tubeRadius, 6, true]} />
                  <meshBasicMaterial
                    ref={(material) => {
                      magneticArcMaterialRefs.current[index] = material;
                    }}
                    color={arc.color}
                    transparent
                    opacity={arc.opacity}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    toneMapped={false}
                  />
                </mesh>
              ))}
            </group>
          )}
          {polarOutburst && (
            <>
              <mesh ref={upperJetRef} position={[0, radius + beamLength / 2, 0]}>
                {useFlaredBeam ? (
                  <cylinderGeometry args={[beamFarRadius, beamBaseRadius, beamLength, 24, 1, true]} />
                ) : (
                  <coneGeometry args={[beamBaseRadius, beamLength, 24, 1, true]} />
                )}
                <meshBasicMaterial
                  ref={upperJetMaterialRef}
                  color={outburstColor}
                  transparent
                  opacity={baseOpacity}
                  blending={THREE.AdditiveBlending}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
              <mesh ref={upperCoreJetRef} position={[0, radius + beamLength / 2, 0]}>
                {useFlaredBeam ? (
                  <cylinderGeometry args={[coreFarRadius, coreBaseRadius, beamLength, 24, 1, true]} />
                ) : (
                  <coneGeometry args={[coreBaseRadius, beamLength, 24, 1, true]} />
                )}
                <meshBasicMaterial
                  ref={upperCoreJetMaterialRef}
                  color={coreColor}
                  transparent
                  opacity={coreOpacityBase}
                  blending={THREE.AdditiveBlending}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                ref={lowerJetRef}
                position={[0, -(radius + beamLength / 2), 0]}
                rotation={[Math.PI, 0, 0]}
              >
                {useFlaredBeam ? (
                  <cylinderGeometry args={[beamFarRadius, beamBaseRadius, beamLength, 24, 1, true]} />
                ) : (
                  <coneGeometry args={[beamBaseRadius, beamLength, 24, 1, true]} />
                )}
                <meshBasicMaterial
                  ref={lowerJetMaterialRef}
                  color={outburstColor}
                  transparent
                  opacity={baseOpacity}
                  blending={THREE.AdditiveBlending}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                ref={lowerCoreJetRef}
                position={[0, -(radius + beamLength / 2), 0]}
                rotation={[Math.PI, 0, 0]}
              >
                {useFlaredBeam ? (
                  <cylinderGeometry args={[coreFarRadius, coreBaseRadius, beamLength, 24, 1, true]} />
                ) : (
                  <coneGeometry args={[coreBaseRadius, beamLength, 24, 1, true]} />
                )}
                <meshBasicMaterial
                  ref={lowerCoreJetMaterialRef}
                  color={coreColor}
                  transparent
                  opacity={coreOpacityBase}
                  blending={THREE.AdditiveBlending}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
              <mesh ref={burstRingRef} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius * 1.08, radius * 1.5, 48]} />
                <meshBasicMaterial
                  ref={burstRingMaterialRef}
                  color={outburstColor}
                  transparent
                  opacity={baseRingOpacity}
                  blending={THREE.AdditiveBlending}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                  toneMapped={false}
                />
              </mesh>
            </>
          )}
        </group>
      )}
      {/* {name && (
        <Html
          position={[0, -(radius + 10), 0]}
          center
          distanceFactor={30}
          occlude
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: -1,
          }}
        >
          <div
            style={{
              color: 'white',
              padding: '4px 12px',
              borderRadius: '6px',
              fontSize: '400px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              fontFamily: 'Orbitron, sans-serif',
            }}
          >
            {name}
          </div>
        </Html>
      )} */}
      {glow && (
        <mesh>
          <sphereGeometry args={[radius * (glow.scale ?? 1.03), 64, 64]} />
          <meshBasicMaterial
            color={glow.color ?? color}
            transparent
            opacity={glow.opacity ?? 0.25}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            toneMapped
          />
        </mesh>
      )}
    </group>
  );
}
