import AstroCard from './AstroCard'
import './astroGallery.css'

const AstroCategorySection = ({ category, onSelectAstro }) => {
  const isOtherSystems = category?.id === 'other-solar-systems'

  return (
    <section
      className={`astro-section${isOtherSystems ? ' astro-section--systems' : ''}`}
      aria-labelledby={`cat-${category.id}`}
    >
      <div className="astro-section__inner">
        <div className="astro-section__header">
          <div>
            <h2 id={`cat-${category.id}`} className="astro-section__title">
              {category.title}
            </h2>
            {category.description ? (
              <p className="astro-section__desc">{category.description}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="astro-row" role="list">
        {category.items.map((astro) => (
          <div key={astro.id} role="listitem" className="astro-row__item">
            <AstroCard astro={astro} onClick={onSelectAstro} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default AstroCategorySection
