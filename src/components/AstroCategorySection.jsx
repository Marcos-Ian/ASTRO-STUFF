import AstroCard from './AstroCard'
import './astroGallery.css'

const AstroCategorySection = ({ category, onSelectAstro }) => {
  return (
    <section className="astro-section" aria-labelledby={`cat-${category.id}`}
    >
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
