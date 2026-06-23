import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AGENTS } from './agents.js'

const APPS = AGENTS

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

function Card({ app, index }) {
  const navigate = useNavigate()

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      layoutId={`card-${app.name}`}
      className="app-card"
      style={{ '--accent': app.accent, cursor: 'pointer' }}
      role="link"
      tabIndex={0}
      onMouseMove={onMove}
      onClick={() => navigate(`/profile/${app.slug}`)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/profile/${app.slug}`)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="card-head">
        <motion.span layoutId={`icon-${app.name}`} className="card-icon">
          {app.icon}
        </motion.span>
        <motion.h3 layoutId={`name-${app.name}`} className="card-name">
          {app.name}
        </motion.h3>
      </div>

      <p className="card-desc">{app.short}</p>

      <Tags tags={app.tags} />
    </motion.div>
  )
}

export default function AppCards() {
  return (
    <section id="more" className="apps-section">
      <p className="apps-eyebrow">THE PLATFORM</p>
      <h2 className="apps-title">
        Explore our <span className="grad">AI Agents</span>
      </h2>
      <p className="apps-sub">A unified suite of intelligent applications. Click any agent to learn more.</p>

      <div className="apps-grid">
        {APPS.map((app, i) => (
          <Card key={app.name} app={app} index={i} />
        ))}
      </div>
    </section>
  )
}
