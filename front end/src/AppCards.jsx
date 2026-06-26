import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AGENTS } from './agents.js'
import { CARD_ICONS } from './cardIcons.jsx'

const APPS = AGENTS

// Display order for the browse-by-category bar. Any category not listed here
// is appended afterwards in first-seen order, so new categories never vanish.
const CATEGORY_ORDER = [
  'HR',
  'Sales',
  'Customer Service',
  'Banking & Insurance',
  'IT Ops & Security',
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
          {CARD_ICONS[app.slug] ? (
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

export default function AppCards() {
  const [active, setActive] = useState('All')
  const categories = useMemo(() => buildCategories(APPS), [])
  const visible = useMemo(
    () => (active === 'All' ? APPS : APPS.filter((a) => a.category === active)),
    [active]
  )

  return (
    <section id="more" className="apps-section">
      <h2 className="apps-title">
        Explore our <span className="grad">AI Agents</span>
      </h2>
      <p className="apps-sub">A unified suite of intelligent applications. Click any agent to learn more.</p>

      {/* Browse by category — deep-black backdrop begins here */}
      <div className="cat-zone">
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

        {/* One cheap cross-fade per category switch (keyed remount), instead of
            per-card FLIP/layout animations that distort cards in a CSS grid. */}
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
      </div>
    </section>
  )
}
