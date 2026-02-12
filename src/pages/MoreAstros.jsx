import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MoreAstros.css'
import AstroCategorySection from '../components/AstroCategorySection'
import { moreAstrosCategories } from '../data/moreAstrosData'

const normalize = (value) => (value ?? '').toString().toLowerCase().trim()

const matchesQuery = (astro, query) => {
  if (!query) return true

  const q = normalize(query)
  const haystack = [
    astro?.name,
    astro?.subtitle,
    ...(Array.isArray(astro?.tags) ? astro.tags : []),
  ]
    .filter(Boolean)
    .map(normalize)
    .join(' | ')

  return haystack.includes(q)
}

const MoreAstros = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filteredCategories = useMemo(() => {
    const q = normalize(query)
    return moreAstrosCategories
      .map((category) => {
        const items = category.items.filter((astro) => matchesQuery(astro, q))
        return { ...category, items }
      })
      .filter((category) => category.items.length > 0)
  }, [query])

  const totalShown = useMemo(
    () => filteredCategories.reduce((sum, c) => sum + c.items.length, 0),
    [filteredCategories]
  )

  const handleSelectAstro = (astro) => {
    if (astro?.route) {
      navigate(astro.route)
    }
  }

  return (
    <section className="more-astros-page">
      <div className="more-astros-scroll">
        <header className="more-astros-hero">
          <h1 className="more-astros-title">More Astros</h1>
          <p className="more-astros-subtitle">
            Explore extreme planets, other solar systems, and stellar objects.
            Tap a card to jump straight to its dedicated page.
          </p>

          <div className="more-astros-toolbar">
            <label className="more-astros-search" aria-label="Search astros">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, type, or tag (e.g., ‘pulsar’, ‘lava’, ‘system’)"
                spellCheck={false}
              />
            </label>

            <div className="more-astros-kpi">Showing: {totalShown}</div>
          </div>
        </header>

        {filteredCategories.length === 0 ? (
          <div className="more-astros-empty">
            No matches. Try searching for “system”, “giant”, or “neutron”.
          </div>
        ) : (
          filteredCategories.map((category) => (
            <AstroCategorySection
              key={category.id}
              category={category}
              onSelectAstro={handleSelectAstro}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default MoreAstros


