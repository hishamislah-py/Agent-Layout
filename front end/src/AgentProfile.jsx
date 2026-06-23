import { useParams, useNavigate, Link } from 'react-router-dom'
import { AGENTS } from './agents.js'

export default function AgentProfile() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const app = AGENTS.find((a) => a.slug === slug)

  if (!app) {
    return (
      <div className="page" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Agent not found</h1>
        <p className="apps-sub" style={{ marginBottom: '1.5rem' }}>
          We couldn&rsquo;t find an agent for &ldquo;{slug}&rdquo;.
        </p>
        <Link className="grad" to="/">← Back to all agents</Link>
      </div>
    )
  }

  return (
    <div className="embed-page" style={{ '--accent': app.accent }}>
      <header className="embed-bar">
        <button className="embed-back" onClick={() => navigate('/')}>← Back</button>
        <div className="embed-id"></div>
        <a className="embed-open" href={app.url} target="_blank" rel="noopener noreferrer">
          Open in new tab ↗
        </a>
      </header>

      <iframe
        className="embed-frame"
        src={app.url}
        title={`${app.name} — live app`}
        allow="clipboard-write; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals"
      />
    </div>
  )
}
