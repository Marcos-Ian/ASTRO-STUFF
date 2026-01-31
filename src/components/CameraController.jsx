import { useMemo, useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({
  selectedPlanet,
  planetRefs,
  controlsRef,
  targetLerp = 0.12,
  onResetSelection,
}) {
  const { camera } = useThree();

  const defaultTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetVec = useMemo(() => new THREE.Vector3(), []);
  const smoothTarget = useMemo(() => new THREE.Vector3(), []);

  const lastTargetRef = useRef(new THREE.Vector3());
  const hasLastRef = useRef(false);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onResetSelection) {
        onResetSelection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onResetSelection]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const hasSelection = selectedPlanet && planetRefs.current[selectedPlanet];

    // 1) get the real world position of the selected planet (accounts for orbit)
    if (hasSelection) {
      planetRefs.current[selectedPlanet].getWorldPosition(targetVec);
    } else {
      targetVec.copy(defaultTarget);
    }

    // 2) smooth the target movement (optional but nice)
    if (!hasLastRef.current) {
      smoothTarget.copy(targetVec);
      controls.target.copy(targetVec);
      lastTargetRef.current.copy(targetVec);
      hasLastRef.current = true;
      controls.update();
      return;
    }

    smoothTarget.lerp(targetVec, targetLerp);

    // 3) compute how much the target moved since last frame
    const delta = smoothTarget.clone().sub(lastTargetRef.current);

    // 4) move the camera by the same delta so it "follows" the planet
    camera.position.add(delta);

    // 5) update OrbitControls target
    controls.target.copy(smoothTarget);

    lastTargetRef.current.copy(smoothTarget);

    controls.update();
  });

  return null;
}
