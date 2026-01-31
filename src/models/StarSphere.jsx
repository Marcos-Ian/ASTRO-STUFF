import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function StarSphere() {
  const texture = useTexture('/textures/stars.jpg') // image in public/textures/

  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <Sphere args={[5000, 64, 64]}>
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide} // render inside of sphere
      />
    </Sphere>
  )
}
export default StarSphere
