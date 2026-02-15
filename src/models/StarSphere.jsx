import { useEffect, useMemo } from 'react'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function StarSphere() {
  const sourceTexture = useTexture('/textures/stars.jpg') // image in public/textures/
  const texture = useMemo(() => {
    if (!sourceTexture) return null
    const nextTexture = sourceTexture.clone()
    nextTexture.colorSpace = THREE.SRGBColorSpace
    nextTexture.needsUpdate = true
    return nextTexture
  }, [sourceTexture])

  useEffect(() => {
    return () => {
      if (texture) texture.dispose()
    }
  }, [texture])

  return (
    <Sphere args={[5000, 64, 64]}>
      <meshBasicMaterial
        map={texture || sourceTexture}
        side={THREE.BackSide} // render inside of sphere
      />
    </Sphere>
  )
}
export default StarSphere
