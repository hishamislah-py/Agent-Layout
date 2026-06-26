// Placeholder data for the Internal section (internal agents/sub-agents and
// internal skills). Counts and real content are TBD — replace these stub
// entries when the actual list is shared. Each internal agent may have
// sub-agents.
//
// Per item you can add an optional `href` once its individual page exists:
//   - external URL (e.g. 'https://docs.openclaw.ai/...') → opens in a new tab
//   - bundled page  (e.g. '/internal/discovery-agent.html' in public/) → full page
// If `href` is omitted, the card/chip opens the in-app /internal/<slug>
// overview page instead. So this is drop-in: just set `href` later.

// Display name + route for this section (the "Toolkit" page).
export const HUB_NAME = 'Internal Agents'
export const HUB_PATH = '/toolkit'

// Open an internal item: external href → new tab, bundled href → full page,
// otherwise the in-app /internal/<slug> overview page.
export function openInternal(item, navigate) {
  const href = item.href
  if (href) {
    if (/^https?:/i.test(href)) window.open(href, '_blank', 'noopener,noreferrer')
    else window.location.assign(href)
  } else {
    navigate(`/internal/${item.slug}`)
  }
}
export const INTERNAL_AGENTS = [
  {
    name: 'Orchestration Manager',
    slug: 'orchestration-manager',
    icon: '🧭',
    accent: '#F5C010',
    short: 'Placeholder — internal manager agent. Content to be added.',
    subAgents: [
      { name: 'Discovery', slug: 'discovery', href: '/discovery-agent.html' },
      { name: 'Executor', slug: 'executor' },
      { name: 'Evaluator', slug: 'evaluator' },
    ],
  },
  {
    name: 'Data Pipeline Agent',
    slug: 'data-pipeline-agent',
    icon: '🛠️',
    accent: '#FBD75B',
    short: 'Placeholder — internal agent. Content to be added.',
    subAgents: [
      { name: 'Ingest', slug: 'ingest' },
      { name: 'Transform', slug: 'transform' },
      { name: 'Load', slug: 'load' },
    ],
  },
  {
    name: 'Knowledge Base Agent',
    slug: 'knowledge-base-agent',
    icon: '📚',
    accent: '#E0A40C',
    short: 'Placeholder — internal agent. Content to be added.',
    subAgents: [],
  },
]

export const INTERNAL_SKILLS = [
  {
    name: 'Document Parser',
    slug: 'document-parser',
    icon: '📄',
    accent: '#C8920A',
    short: 'Placeholder — internal skill. Content to be added.',
  },
  {
    name: 'PII Redactor',
    slug: 'pii-redactor',
    icon: '🛡️',
    accent: '#EAB308',
    short: 'Placeholder — internal skill. Content to be added.',
  },
  {
    name: 'Sentiment Scorer',
    slug: 'sentiment-scorer',
    icon: '📊',
    accent: '#D9A41A',
    short: 'Placeholder — internal skill. Content to be added.',
  },
]
