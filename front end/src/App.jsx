import { useNavigate } from 'react-router-dom'
import ScrollDiscs from './ScrollDiscs.jsx'
import AppCards from './AppCards.jsx'
import RotatingText from './RotatingText.jsx'
import { HUB_NAME, HUB_PATH } from './internal.js'

export default function App() {
  const navigate = useNavigate()
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
              <p className="gw-desc">Internal agents and skills that power the platform.</p>
              <span className="gw-cta">Open {HUB_NAME}</span>
            </button>
            <button className="gw-card" style={{ '--accent': '#E0A40C' }} onMouseMove={onMove} onClick={() => { window.location.href = '/external-agents.html' }}>
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
