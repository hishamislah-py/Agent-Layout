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
            <button className="btn btn-primary" onClick={scrollToMore}>
              Show More →
            </button>
          </div>
        </div>
      </header>

      {/* Below the fold — revealed by "Show More" */}
      <AppCards />
    </div>
  )
}
