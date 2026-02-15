import { useMemo, useRef } from 'react'
import './astroGallery.css'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const AstroCard = ({ astro, onClick }) => {
  const cardRef = useRef(null)

  const accent = useMemo(() => astro?.preview?.accent || '#c084fc', [astro])
  const previewImageSrc = useMemo(() => {
    if (astro?.cardImage) return astro.cardImage
    if (astro?.preview?.type === 'image') return astro?.preview?.src
    return null
  }, [astro])

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotateY = clamp((x - 0.5) * 10, -7, 7)
    const rotateX = clamp((0.5 - y) * 10, -7, 7)

    el.style.setProperty('--rx', `${rotateX}deg`)
    el.style.setProperty('--ry', `${rotateY}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
  }

  return (
    <button
      type="button"
      ref={cardRef}
      className="astro-card"
      style={{ '--accent': accent }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onClick?.(astro)}
    >
      <div className="astro-card__preview" aria-hidden="true">
        {previewImageSrc ? (
          <img className="astro-card__img" src={previewImageSrc} alt="" loading="lazy" />
        ) : (
          <div className="astro-card__orb" />
        )}
        <div className="astro-card__noise" />
      </div>

      <div className="astro-card__content">
        <div className="astro-card__titleRow">
          <h3 className="astro-card__title">{astro.name}</h3>
          <span className="astro-chip">Explore</span>
        </div>

        {astro.subtitle ? <p className="astro-card__subtitle">{astro.subtitle}</p> : null}

        {/* tags removed */}
      </div>
    </button>
  )
}

export default AstroCard
