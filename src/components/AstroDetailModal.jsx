import { useEffect } from 'react'
import './astroGallery.css'

const AstroDetailModal = ({ astro, categoryTitle, onClose, onNavigate }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!astro) return null

  return (
    <div className="astro-modal" role="dialog" aria-modal="true">
      <button type="button" className="astro-modal__backdrop" onClick={onClose} aria-label="Close" />

      <div className="astro-modal__panel">
        <div className="astro-modal__top">
          <div className="astro-modal__badge">{categoryTitle}</div>
          <button type="button" className="astro-modal__close" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="astro-modal__body">
          <div className="astro-modal__preview" style={{ '--accent': astro?.preview?.accent || '#c084fc' }}>
            <div className="astro-modal__orb" />
            <div className="astro-card__noise" />
          </div>

          <div className="astro-modal__content">
            <h3 className="astro-modal__title">{astro.name}</h3>
            {astro.subtitle ? <p className="astro-modal__subtitle">{astro.subtitle}</p> : null}

            {/* tags removed */}

            {Array.isArray(astro.facts) && astro.facts.length ? (
              <ul className="astro-modal__facts">
                {astro.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            ) : null}

            <div className="astro-modal__actions">
              <button
                type="button"
                className="astro-btn astro-btn--primary"
                onClick={() => onNavigate?.(astro)}
                disabled={!astro.route}
                title={astro.route ? 'Open detail page' : 'No page yet'}
              >
                {astro.route ? 'Open page' : 'Page coming soon'}
              </button>
              <button type="button" className="astro-btn" onClick={onClose}>
                Keep exploring
              </button>
            </div>

            <p className="astro-modal__hint">
              Tip: you can turn any card into a full page later by adding a `route` field in the data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AstroDetailModal
