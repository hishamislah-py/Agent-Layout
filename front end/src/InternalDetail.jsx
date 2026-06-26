import { useParams, useNavigate, Link } from 'react-router-dom'
import { INTERNAL_AGENTS, INTERNAL_SKILLS, openInternal } from './internal.js'

// Flat lookup across internal agents, their sub-agents and internal skills.
function findItem(slug) {
  for (const a of INTERNAL_AGENTS) {
    if (a.slug === slug) return { item: a, kind: 'Internal Agent', subAgents: a.subAgents || [] }
    for (const s of a.subAgents || []) {
      if (s.slug === slug) {
        return {
          item: { icon: '🔧', accent: a.accent, short: 'Placeholder — sub-agent content to be added.', ...s },
          kind: 'Sub-agent',
          parent: a,
        }
      }
    }
  }
  for (const s of INTERNAL_SKILLS) {
    if (s.slug === slug) return { item: s, kind: 'Internal Skill' }
  }
  return null
}

export default function InternalDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const found = findItem(slug)

  if (!found) {
    return (
      <div className="internal-page" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Not found</h1>
        <p className="apps-sub" style={{ marginBottom: '1.5rem' }}>
          No internal item matches &ldquo;{slug}&rdquo;.
        </p>
        <Link className="grad" to="/">← Back to all agents</Link>
      </div>
    )
  }

  const { item, kind, subAgents = [], parent } = found

  return (
    <div className="internal-page" style={{ '--accent': item.accent || '#f5c010' }}>
      <header className="internal-bar">
        <button className="internal-back" onClick={() => navigate(-1)}>← Back</button>
      </header>

      <div className="internal-body">
        <div className="internal-head">
          <span className="internal-icon">{item.icon || '🧩'}</span>
          <div>
            <p className="internal-kind">{kind}</p>
            <h1>{item.name}</h1>
          </div>
        </div>

        <p className="internal-desc">{item.short || 'Content to be added.'}</p>

        <div className="internal-placeholder">
          Detailed content for this {kind.toLowerCase()} will be added soon.
        </div>

        {subAgents.length > 0 && (
          <div className="internal-subs">
            <h2>Sub-agents ({subAgents.length})</h2>
            <div className="sub-chips">
              {subAgents.map((s) => (
                <button key={s.slug} className="sub-chip" onClick={() => openInternal(s, navigate)}>
                  {s.name}
                  {s.href && /^https?:/i.test(s.href) && <span className="sub-chip-ext">↗</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {parent && (
          <Link className="internal-parent-link" to={`/internal/${parent.slug}`}>
            ← Part of {parent.name}
          </Link>
        )}
      </div>
    </div>
  )
}
