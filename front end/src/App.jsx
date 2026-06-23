import ScrollDiscs from './ScrollDiscs.jsx'
import AppCards from './AppCards.jsx'
import RotatingText from './RotatingText.jsx'

export default function App() {
  const scrollToMore = () => {
    document.getElementById('more')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">
      <ScrollDiscs />

      {/* Hero */}
      <header className="hero">
        <div className="hero-inner">
          <h1>
            Discover <RotatingText />
            <br />
            that <span className="grad">work for you</span>
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
      <AppCards />

      <section className="more-section">
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
