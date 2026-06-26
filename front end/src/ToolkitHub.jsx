import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { INTERNAL_AGENTS, INTERNAL_SKILLS, HUB_NAME, openInternal } from './internal.js'
import { CARD_ICONS } from './cardIcons.jsx'

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

// Card for an internal agent / skill — opens its individual page (href) when
// set, otherwise the in-app /internal/<slug> overview page.
function ToolkitCard({ item }) {
  const navigate = useNavigate()
  const subCount = item.subAgents ? item.subAgents.length : 0
  const isExternal = !!item.href && /^https?:/i.test(item.href)
  const open = () => openInternal(item, navigate)
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

      <div className="card-tags">
        {subCount > 0 && <span className="pill pill-blue">{subCount} sub-agents</span>}
        {isExternal && <span className="pill pill-blue">External ↗</span>}
      </div>
    </div>
  )
}

export default function ToolkitHub() {
  const navigate = useNavigate()

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
        <p className="apps-sub">Internal agents, sub-agents and skills that power the platform.</p>

        <div className="cat-zone">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="int-group">
              <div className="int-group-head">
                <h3>Internal Agents</h3>
                <span className="cat-count">{INTERNAL_AGENTS.length}</span>
              </div>
              <div className="apps-grid int-grid">
                {INTERNAL_AGENTS.map((a) => (
                  <ToolkitCard key={a.slug} item={a} />
                ))}
              </div>
            </div>

            <div className="int-group">
              <div className="int-group-head">
                <h3>Internal Skills</h3>
                <span className="cat-count">{INTERNAL_SKILLS.length}</span>
              </div>
              <div className="apps-grid int-grid">
                {INTERNAL_SKILLS.map((s) => (
                  <ToolkitCard key={s.slug} item={s} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
