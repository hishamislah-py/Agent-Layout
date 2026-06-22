import Discs from './Discs.jsx'

export default function App() {
  const scrollToMore = () => {
    document.getElementById('more')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">
      {/* Announcement bar */}
      <div className="announce">
        <span className="announce-icon">✦</span>
        <span>
          Just Announced: Scale closes Series F funding round at $13.8B valuation led by Accel.
        </span>
        <a href="#" className="announce-link">
          Read More →
        </a>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">scale</div>
        <ul className="nav-links">
          <li>Products</li>
          <li>Government</li>
          <li>Customers</li>
          <li>Resources</li>
        </ul>
        <div className="nav-right">
          <button className="btn btn-outline">Book a Demo →</button>
          <a href="#" className="login">Log In</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <Discs />

        <div className="hero-inner">
          <h1>
            Power <span className="grad">Generative AI</span>
            <br />
            With Your Data
          </h1>
          <p className="sub">
            Make the best models with the best data. Scale Data Engine leverages your enterprise data,
            <br />
            and with Scale GenAI Platform, safely unlocks the value of AI.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={scrollToMore}>
              Show More →
            </button>
          </div>
        </div>
      </header>

      {/* Below the fold — revealed by "Show More" */}
      <section id="more" className="more-section">
        <p className="works-with">
          Scale works with <a href="#">Generative AI Companies</a>, U.S. Government Agencies &amp; Enterprises
        </p>

        <div className="logos">
          <span className="brand">⊞ Microsoft</span>
          <span className="brand">∞ Meta</span>
          <span className="brand">⊛ OpenAI</span>
          <span className="brand">✿ cohere</span>
          <span className="brand">◈ NVIDIA</span>
          <span className="brand brand-bold">Adept</span>
          <span className="brand brand-bold">character.ai</span>
        </div>
      </section>
    </div>
  )
}
