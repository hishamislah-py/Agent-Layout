import { useNavigate } from 'react-router-dom'
import ScrollDiscs from './ScrollDiscs.jsx'
import AppCards from './AppCards.jsx'
import RotatingText from './RotatingText.jsx'
import { HUB_NAME, HUB_PATH, SKILLS_PATH } from './internal.js'

export default function App() {
  const navigate = useNavigate()
  // Drive the scroll with a fixed-duration eased JS animation instead of the
  // browser's native smooth scroll, which is inconsistent across machines (often
  // instant on desktop). A gradual scroll is what makes the disc fly-off /
  // background transition play, so this keeps it smooth on every screen size.
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const startY = window.scrollY
    const targetY = el.getBoundingClientRect().top + startY
    const dist = targetY - startY
    if (Math.abs(dist) < 2) return
    const duration = 1000
    const root = document.documentElement.style
    const prevBehavior = root.scrollBehavior
    root.scrollBehavior = 'auto' // don't let CSS smooth fight the JS animation
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
    let start = null
    const step = (ts) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      window.scrollTo(0, startY + dist * ease(p))
      if (p < 1) requestAnimationFrame(step)
      else root.scrollBehavior = prevBehavior
    }
    requestAnimationFrame(step)
  }
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="page">
      <ScrollDiscs />

      {/* Brand logo — top-left */}
      <a className="site-logo" href="/" aria-label="ART home">
        <img src="/logo1%20(1).png" alt="ART" />
      </a>

      {/* Hero */}
      <header className="hero">
        <div className="hero-inner">
          <h1>
            Discover <RotatingText />
            <br />
            that <span className="grad">work for you</span>
          </h1>
          <p className="sub">
            Smart AI agents that work alongside you, handling the busywork so your team can focus on what matters.
            <br />
            Find the right one, put it to work, and watch it get things done.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => scrollTo('start')}>
              Show More
            </button>
          </div>
        </div>
      </header>

      {/* Gateway — three huge clickable cards into the three areas */}
      <section id="start" className="gateway">
        <div className="gateway-inner">
          <p className="apps-eyebrow">GET STARTED</p>
          <h2 className="gw-heading">
            Where would you like to <span className="grad">start</span>?
          </h2>
          <div className="gateway-grid">
            <button className="gw-card" style={{ '--accent': '#F5C010' }} onMouseMove={onMove} onClick={() => scrollTo('more')}>
              <span className="gw-icon"><img src="/gateway/ai-agents.png" alt="" /></span>
              <h3 className="gw-title">AI Agents</h3>
              <p className="gw-desc">Explore our suite of production-ready AI agents across HR, finance, support and more.</p>
              <span className="gw-cta">Browse agents</span>
            </button>
            <button className="gw-card" style={{ '--accent': '#FBD75B' }} onMouseMove={onMove} onClick={() => navigate(HUB_PATH)}>
              <span className="gw-icon"><img src="/gateway/internal-agents.png" alt="" /></span>
              <h3 className="gw-title">{HUB_NAME}</h3>
              <p className="gw-desc">Internal agents that power the platform.</p>
              <span className="gw-cta">Open {HUB_NAME}</span>
            </button>
            <button className="gw-card" style={{ '--accent': '#EAB308' }} onMouseMove={onMove} onClick={() => navigate(SKILLS_PATH)}>
              <span className="gw-icon"><img src="/gateway/internal-skills.png" alt="" /></span>
              <h3 className="gw-title">Internal Skills Catalog</h3>
              <p className="gw-desc">Reusable capabilities the engineering agents build on.</p>
              <span className="gw-cta">View skills</span>
            </button>
            <button className="gw-card" style={{ '--accent': '#E0A40C' }} onMouseMove={onMove} onClick={() => { window.location.href = '/skill-library.html' }}>
              <span className="gw-icon"><img src="/gateway/external-skills.png" alt="" /></span>
              <h3 className="gw-title">Skill Library</h3>
              <p className="gw-desc">A curated catalog of open-source Agent Skills and MCP servers.</p>
              <span className="gw-cta">View catalog</span>
            </button>
          </div>
        </div>
      </section>

      <AppCards />
    </div>
  )
}
