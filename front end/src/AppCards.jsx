import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AGENTS } from './agents.js'
import { CARD_ICONS, CARD_ICON_SVGS } from './cardIcons.jsx'

const APPS = AGENTS

// Display order for the browse-by-category bar. Any category not listed here
// is appended afterwards in first-seen order, so new categories never vanish.
const CATEGORY_ORDER = [
  'HR',
  'Sales',
  'Customer Service',
  'Financial Services',
  'Legal & Compliance',
  'IT Ops & Security',
  'Developer Tools',
  'Research & Analysis',
]

function buildCategories(apps) {
  const counts = new Map()
  for (const app of apps) {
    const c = app.category || 'Other'
    counts.set(c, (counts.get(c) || 0) + 1)
  }
  const ordered = [
    ...CATEGORY_ORDER.filter((c) => counts.has(c)),
    ...[...counts.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ]
  return [
    { label: 'All', count: apps.length },
    ...ordered.map((label) => ({ label, count: counts.get(label) })),
  ]
}

function Tags({ tags }) {
  return (
    <div className="card-tags">
      {tags.map((t) => (
        <span key={t.label} className={`pill pill-${t.type}`}>
          {t.label}
        </span>
      ))}
    </div>
  )
}

// Plain card — hover/lift is handled in CSS, so there are no per-card layout
// animations to fight with the grid when categories change.
function Card({ app }) {
  const navigate = useNavigate()

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      className="app-card"
      style={{ '--accent': app.accent, cursor: 'pointer' }}
      role="link"
      tabIndex={0}
      onMouseMove={onMove}
      onClick={() => navigate(`/profile/${app.slug}`)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/profile/${app.slug}`)}
    >
      <div className="card-head">
        <span className="card-icon">
          {CARD_ICON_SVGS[app.slug] ? (
            CARD_ICON_SVGS[app.slug]
          ) : CARD_ICONS[app.slug] ? (
            <img src={CARD_ICONS[app.slug]} alt="" className="card-icon-img" />
          ) : (
            app.icon
          )}
        </span>
        <h3 className="card-name">{app.name}</h3>
      </div>

      <p className="card-desc">{app.short}</p>

      <Tags tags={app.tags} />
    </div>
  )
}

function matchesQuery(app, q) {
  if (!q) return true
  const hay = `${app.name} ${app.short || ''} ${app.category || ''} ${(app.tags || []).map((t) => t.label).join(' ')}`.toLowerCase()
  return hay.includes(q)
}

export default function AppCards() {
  // Keep the selected category in the URL (?cat=HR) so it survives back/forward
  // navigation — returning from an agent profile lands back on the same filtered
  // view instead of resetting to "All". `replace` so it doesn't add history.
  const [searchParams, setSearchParams] = useSearchParams()
  const active = searchParams.get('cat') || 'All'
  const setActive = (label) =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (label === 'All') next.delete('cat')
        else next.set('cat', label)
        return next
      },
      { replace: true },
    )
  const [query, setQuery] = useState('')
  const categories = useMemo(() => buildCategories(APPS), [])
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return APPS.filter((a) => (active === 'All' || a.category === active) && matchesQuery(a, q))
  }, [active, query])

  return (
    <section id="more" className="apps-section">
      <h2 className="apps-title">
        Explore our <span className="grad">AI Agents</span>
      </h2>
      <p className="apps-sub">A unified suite of intelligent applications. Click any agent to learn more.</p>

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
            placeholder="Search agents — try 'fraud', 'HR', 'compliance'…"
            aria-label="Search agents"
          />
        </div>

        <div className="cat-bar" role="tablist" aria-label="Browse agents by category">
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

        {/* One cheap cross-fade per category switch (keyed remount). */}
        <motion.div
          key={active}
          className="apps-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible.map((app) => (
            <Card key={app.slug} app={app} />
          ))}
        </motion.div>

        {visible.length === 0 && <p className="cat-empty">No agents match your search.</p>}
      </div>
    </section>
  )
}
