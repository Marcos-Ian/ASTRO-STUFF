import { useFrame } from '@react-three/fiber';

const FRAME_TIME_BASELINE = 1 / 60;

export function useSpin(ref, { axis = 'y', speed = 0, speedMultiplier = 1 }) {
  useFrame(() => {
    if (!ref.current || !speed) return;
    ref.current.rotation[axis] += speed * speedMultiplier * FRAME_TIME_BASELINE;
  });
}
