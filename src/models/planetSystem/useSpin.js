import { useFrame } from '@react-three/fiber';

export function useSpin(ref, { axis = 'y', speed = 0, speedMultiplier = 1 }) {
  useFrame((_, delta) => {
    if (!ref.current || !speed) return;
    ref.current.rotation[axis] += speed * speedMultiplier * delta;
  });
}
