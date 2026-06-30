import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { INTERNAL_AGENTS, HUB_NAME } from './internal.js'
import { CARD_ICONS } from './cardIcons.jsx'

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// Display order for the filter bar; unlisted categories follow in first-seen order.
const CATEGORY_ORDER = ['Migration Pipeline', 'Onboarding Portal', 'Playwright QA']

function buildCategories(items) {
  const counts = new Map()
  for (const it of items) {
    const c = it.category || 'Other'
    counts.set(c, (counts.get(c) || 0) + 1)
  }
  const ordered = [
    ...CATEGORY_ORDER.filter((c) => counts.has(c)),
    ...[...counts.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ]
  return [
    { label: 'All', count: items.length },
    ...ordered.map((label) => ({ label, count: counts.get(label) })),
  ]
}

// Card for an engineering agent — opens its collection's catalog at the anchor.
function ToolkitCard({ item }) {
  const open = () => {
    if (!item.href) return
    if (/^https?:/i.test(item.href)) window.open(item.href, '_blank', 'noopener,noreferrer')
    else window.location.assign(item.href)
  }
  return (
    <div
      className="app-card"
      style={{ '--accent': item.accent, cursor: 'pointer' }}
      role="link"
      tabIndex={0}
      onMouseMove={spotlight}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
    >
      <div className="card-head">
        <span className="card-icon">
          {CARD_ICONS[item.slug] ? <img src={CARD_ICONS[item.slug]} alt="" className="card-icon-img" /> : item.icon}
        </span>
        <h3 className="card-name">{item.name}</h3>
      </div>
      <p className="card-desc">{item.short}</p>
    </div>
  )
}

function matchesQuery(item, q) {
  if (!q) return true
  return `${item.name} ${item.short || ''} ${item.category || ''}`.toLowerCase().includes(q)
}

export default function ToolkitHub() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const categories = useMemo(() => buildCategories(INTERNAL_AGENTS), [])
  // Active category comes from the URL (?cat=…) so returning from a standalone
  // agent page lands back on the same collection instead of resetting to "All".
  const rawCat = searchParams.get('cat')
  const active = categories.some((c) => c.label === rawCat) ? rawCat : 'All'
  const setActive = (label) =>
    setSearchParams(label === 'All' ? {} : { cat: label }, { replace: true })
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return INTERNAL_AGENTS.filter((a) => (active === 'All' || a.category === active) && matchesQuery(a, q))
  }, [active, query])

  return (
    <div className="page toolkit-page">
      <a className="site-logo" href="/" aria-label="ART home">
        <img src="/logo1%20(1).png" alt="ART" />
      </a>

      <section className="apps-section">
        <div className="toolkit-top">
          <button className="internal-back" onClick={() => navigate('/')}>← Back</button>
        </div>

        <h2 className="apps-title">
          Explore our <span className="grad">{HUB_NAME}</span>
        </h2>
        <p className="apps-sub">Internal agents that power the platform.</p>

        <div className="cat-zone">
          <div className="search-wrap">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8085" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search agents — try 'migration', 'review', 'audit'…"
              aria-label="Search agents"
            />
          </div>

          <div className="cat-bar" role="tablist" aria-label="Browse agents by collection">
            {categories.map((c) => (
              <button
                key={c.label}
                role="tab"
                aria-selected={active === c.label}
                className={`cat-tab${active === c.label ? ' is-active' : ''}`}
                onClick={() => setActive(c.label)}
              >
                {c.label}
                <span className="cat-count">{c.count}</span>
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            className="apps-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {visible.map((a) => (
              <ToolkitCard key={a.slug} item={a} />
            ))}
          </motion.div>

          {visible.length === 0 && <p className="cat-empty">No agents match your search.</p>}
        </div>
      </section>
    </div>
  )
}
