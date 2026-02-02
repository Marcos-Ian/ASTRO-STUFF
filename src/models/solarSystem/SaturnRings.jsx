import { useMemo } from 'react';
import * as THREE from 'three';

/* =======================
   Saturn Rings
   NOTE: Put this inside tiltChildren so it follows Saturn tilt
======================= */
export function SaturnRings() {
  const inner = 38;
  const outer = 65;

  // High-res radial texture (detail + edge fade + subtle noise)
  const ringTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 8; // not important (angle repeats)
    canvas.height = 2048; // IMPORTANT: radial detail
    const ctx = canvas.getContext('2d');

    // Base radial banding
    const g = ctx.createLinearGradient(0, 0, 0, canvas.height);

    // Inner fade-in
    g.addColorStop(0.0, 'rgba(0,0,0,0)');
    g.addColorStop(0.03, 'rgba(190,170,130,0.20)');
    g.addColorStop(0.07, 'rgba(190,170,130,0.55)');

    // C-ring / B-ring style layers (more, thinner bands)
    g.addColorStop(0.12, 'rgba(170,150,115,0.65)');
    g.addColorStop(0.18, 'rgba(210,190,150,0.80)');
    g.addColorStop(0.24, 'rgba(160,140,105,0.55)');

    // Cassini Division-ish gap
    g.addColorStop(0.30, 'rgba(40,30,20,0.10)');
    g.addColorStop(0.33, 'rgba(150,130,95,0.55)');

    // A-ring outer layers
    g.addColorStop(0.42, 'rgba(210,190,150,0.75)');
    g.addColorStop(0.52, 'rgba(170,150,115,0.60)');
    g.addColorStop(0.62, 'rgba(210,190,150,0.70)');

    // Outer fade-out
    g.addColorStop(0.82, 'rgba(150,130,95,0.45)');
    g.addColorStop(0.92, 'rgba(150,130,95,0.20)');
    g.addColorStop(1.0, 'rgba(0,0,0,0)');

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle noise + micro-banding to avoid "too smooth" look
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = img.data;

    for (let y = 0; y < canvas.height; y++) {
      const band = 0.06 * Math.sin(y * 0.05) + 0.04 * Math.sin(y * 0.013);
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const n = (Math.random() - 0.5) * 0.12; // subtle grain
        d[i + 0] = Math.min(255, d[i + 0] * (1 + band + n)); // R
        d[i + 1] = Math.min(255, d[i + 1] * (1 + band + n)); // G
        d[i + 2] = Math.min(255, d[i + 2] * (1 + band + n)); // B
      }
    }
    ctx.putImageData(img, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Geometry with polar UVs (your “wrap around” fix)
  const geom = useMemo(() => {
    const g = new THREE.RingGeometry(inner, outer, 256, 16);
    const pos = g.attributes.position;
    const uv = g.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const r = Math.sqrt(x * x + y * y);
      const v = (r - inner) / (outer - inner);

      let a = Math.atan2(y, x);
      if (a < 0) a += Math.PI * 2;
      const u = a / (Math.PI * 2);

      uv.setXY(i, u, v);
    }
    uv.needsUpdate = true;
    return g;
  }, [inner, outer]);

  return (
    <group>
      {/* MAIN rings */}
      <mesh geometry={geom} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          map={ringTexture}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
          alphaTest={0.01}
          roughness={1}
          metalness={0}
          opacity={0.95}
        />
      </mesh>

      {/* Thin “shadow/dark” pass to add depth (subtle) */}
      <mesh geometry={geom} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
        <meshStandardMaterial
          color={'#000000'}
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
