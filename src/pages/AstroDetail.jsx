import { Suspense, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Loader from '../components/Loader'
import { moreAstrosCategories, flattenAstros } from '../data/moreAstrosData'
import { modelRegistry } from '../models'
import StarSphere from '../models/StarSphere'
import './AstroDetail.css'

const AstroDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const astro = useMemo(() => {
    const flattened = flattenAstros(moreAstrosCategories)
    return flattened.find((item) => item.id === id)
  }, [id])

  const modelConfigs = useMemo(() => {
    if (!astro) return []
    if (Array.isArray(astro.modelInstances)) return astro.modelInstances
    if (Array.isArray(astro.modelKeys)) return astro.modelKeys.map((key) => ({ key }))
    if (astro.modelKey) return [{ key: astro.modelKey }]
    return []
  }, [astro])

  const models = useMemo(
    () =>
      modelConfigs
        .map((config, index) => {
          const { key: modelKey, ...props } = config
          const ModelComponent = modelRegistry[modelKey]
          if (!ModelComponent) return null
          return <ModelComponent key={`${modelKey}-${index}`} {...props} />
        })
        .filter(Boolean),
    [modelConfigs]
  )

  if (!astro) {
    return (
      <section className="astro-detail">
        <div className="astro-detail__shell">
          <button type="button" className="astro-detail__back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="astro-detail__empty">
            <h1>Astro not found</h1>
            <p>Try returning to the gallery and picking another object.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="astro-detail">
      <Canvas
        className="canvas-full astro-detail__canvas"
        camera={{ position: [0, 300, 800], fov: 75, near: 0.1, far: 10000 }}
        gl={{
          alpha: false,
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <color attach="background" args={['#000000']} />
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.17} />
          <hemisphereLight intensity={0.8} color="#bcd7ff" groundColor="#080808" />
          <StarSphere />
          {models}
          <OrbitControls
            enableZoom
            enablePan
            enableRotate
            minDistance={100}
            maxDistance={2000}
          />
        </Suspense>
      </Canvas>
      <div className="astro-detail__shell">
        <header className="astro-detail__header">
          <button type="button" className="astro-detail__back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div>
            <div className="astro-detail__badge">{astro.categoryTitle}</div>
            <h1>{astro.name}</h1>
            {astro.subtitle ? <p className="astro-detail__subtitle">{astro.subtitle}</p> : null}
          </div>
        </header>

        <div className="astro-detail__content">
          <div className="astro-detail__spacer">
            {!models.length ? (
              <div className="astro-detail__model-empty">
                3D model coming soon. Add a modelKey or modelInstances to wire one up.
              </div>
            ) : null}
          </div>

          <aside className="astro-detail__facts">
            <h2>Quick facts</h2>
            {Array.isArray(astro.facts) && astro.facts.length ? (
              <ul>
                {astro.facts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            ) : (
              <p>No facts available yet.</p>
            )}
            <div className="astro-detail__meta">
              <p>
                Model link: <span>{modelConfigs.length ? 'Connected' : 'Not linked'}</span>
              </p>
              <p>
                Models: <span>{modelConfigs.length || 0}</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default AstroDetail
