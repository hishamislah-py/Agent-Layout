import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const PRICING = [
  { name: 'Free', price: 'Free', sub: 'For getting started', features: ['Core features', 'Community support', 'Limited monthly usage'] },
  { name: 'Starter', price: '$19', period: '/mo', sub: 'For small teams', features: ['Everything in Free', 'Higher usage limits', 'Email support'] },
  { name: 'Pro', price: '$99', period: '/mo', sub: 'For growing teams', featured: true, features: ['Everything in Starter', 'Advanced capabilities', 'Priority support', 'Team workspaces'] },
  { name: 'Enterprise', price: 'Custom', sub: 'For organizations', features: ['Everything in Pro', 'SSO & advanced security', 'Dedicated support', 'Custom integrations'] },
]

const INTEGRATIONS = ['ChatGPT', 'Claude', 'REST API', 'Webhooks', 'Slack', 'Zapier', 'Microsoft 365', 'GitHub']

const TABS = ['Overview', 'Features', 'Screenshots', 'Use Cases', 'Integrations', 'Pricing']
const TAB_IDS = { Overview: 'overview', Features: 'features', Screenshots: 'screenshots', 'Use Cases': 'usecases', Integrations: 'integrations', Pricing: 'pricing' }

function Stars({ rating }) {
  return (
    <span className="ad-stars" title={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? 'star on' : 'star'}>★</span>
      ))}
      <span className="ad-rating-num">{rating.toFixed(1)}</span>
    </span>
  )
}

function Shot({ app, label }) {
  return (
    <div className="ad-shot" style={{ '--accent': app.accent }}>
      <div className="ad-shot-bar">
        <span /><span /><span />
      </div>
      <div className="ad-shot-body">
        <span className="ad-shot-icon">{app.icon}</span>
        <span className="ad-shot-label">{label}</span>
      </div>
    </div>
  )
}

export default function AgentDetail({ app, onClose }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const goto = (id) => {
    const el = scrollRef.current?.querySelector(`#${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.div
      className="ad-overlay"
      ref={scrollRef}
      style={{ '--accent': app.accent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="ad-topbar">
        <button className="ad-back" onClick={onClose}>← Back to agents</button>
        <a className="ad-visit ad-visit-sm" href={app.url} target="_blank" rel="noopener noreferrer">Visit Website →</a>
      </div>

      <motion.div
        className="ad-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="ad-crumb">
          <button onClick={onClose}>Home</button> <span>/</span> {app.name}
        </nav>

        <div className="ad-grid">
          {/* ---------------- main ---------------- */}
          <main className="ad-main">
            <header className="ad-header">
              <span className="ad-icon">{app.icon}</span>
              <div className="ad-id-text">
                <h1 className="ad-name">{app.name}</h1>
                <Stars rating={app.rating} />
                <p className="ad-tagline">{app.tagline}</p>
                <div className="ad-tags">
                  {app.tags.map((t) => (
                    <span key={t.label} className={`pill pill-${t.type}`}>{t.label}</span>
                  ))}
                </div>
                <div className="ad-actions">
                  <a className="ad-visit" href={app.url} target="_blank" rel="noopener noreferrer">Visit Website →</a>
                  <button className="ad-share">⤴ Share</button>
                </div>
              </div>
            </header>

            <div className="ad-tabnav">
              {TABS.map((t) => (
                <button key={t} onClick={() => goto(TAB_IDS[t])}>{t}</button>
              ))}
            </div>

            <section id="overview" className="ad-section">
              <h2 className="ad-h2">About {app.name}</h2>
              <div className="ad-block">
                <h3>Who It's For</h3>
                <p>{app.whoFor}</p>
              </div>
              <div className="ad-block">
                <h3>What You Get</h3>
                <p>{app.whatYouGet}</p>
              </div>
              <div className="ad-block">
                <h3>How It Works</h3>
                <p>{app.howItWorks}</p>
              </div>
              <Shot app={app} label={`${app.name} — overview`} />
            </section>

            <section className="ad-newsletter">
              <h3>Stay in the loop</h3>
              <p>Weekly roundup of new AI agents. No spam, unsubscribe anytime.</p>
              <form className="ad-news-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </section>

            <section id="features" className="ad-section">
              <h2 className="ad-h2">Features &amp; Capabilities</h2>
              {app.featureGroups.map((g) => (
                <div key={g.title} className="ad-fgroup">
                  <h3>{g.title}</h3>
                  <div className="ad-fitems">
                    {g.items.map((it) => (
                      <div key={it} className="ad-fitem">
                        <span className="feat-dot" /> {it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section id="screenshots" className="ad-section">
              <h2 className="ad-h2">Screenshots</h2>
              <p className="ad-muted">See {app.name} in action.</p>
              <Shot app={app} label={`${app.name} — preview`} />
            </section>

            <section id="usecases" className="ad-section">
              <h2 className="ad-h2">Use Cases</h2>
              <div className="ad-usecases">
                {app.useCases.map((u) => (
                  <div key={u.title} className="ad-usecase">
                    <span className="ad-industry">{u.industry}</span>
                    <h3>{u.title}</h3>
                    <p>{u.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* ---------------- sidebar ---------------- */}
          <aside className="ad-sidebar">
            <div className="ad-box">
              <h4>Specifications</h4>
              <div className="ad-spec-list">
                {app.specs.map(([k, v]) => (
                  <div key={k} className="ad-spec-row">
                    <span className="ad-spec-k">{k}</span>
                    <span className="ad-spec-v">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="pricing" className="ad-box">
              <h4>Pricing</h4>
              <div className="ad-pricing">
                {PRICING.map((p) => (
                  <div key={p.name} className={`ad-tier${p.featured ? ' featured' : ''}`}>
                    <div className="ad-tier-head">
                      <div>
                        <div className="ad-tier-name">{p.name}</div>
                        <div className="ad-tier-sub">{p.sub}</div>
                      </div>
                      <div className="ad-tier-price">
                        {p.price}
                        {p.period && <span>{p.period}</span>}
                      </div>
                    </div>
                    <ul>
                      {p.features.map((f) => (
                        <li key={f}><span className="feat-dot" /> {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div id="integrations" className="ad-box">
              <h4>Integrations</h4>
              <div className="ad-integrations">
                {INTEGRATIONS.map((i) => (
                  <span key={i} className="ad-int">{i}</span>
                ))}
              </div>
            </div>

            <div className="ad-box">
              <h4>Links</h4>
              <div className="ad-links">
                <a href={app.url} target="_blank" rel="noopener noreferrer">↗ Visit website</a>
                <a href={app.url} target="_blank" rel="noopener noreferrer">↗ Open app</a>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}
