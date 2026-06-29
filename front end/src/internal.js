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
export const HUB_NAME = 'Engineering Agents'
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
// One flat list of engineering agents — no agent/sub-agent nesting.
export const INTERNAL_AGENTS = [
  {
    name: 'Migration Pipeline',
    slug: 'migration-pipeline',
    icon: '🔄',
    accent: '#F5C010',
    short: 'Migrates legacy applications to a modern stack while preserving exact behavior.',
    href: '/migration-agents.html',
  },
  {
    name: 'Onboarding Portal',
    slug: 'onboarding-portal',
    icon: '🚪',
    accent: '#FBD75B',
    short: 'Delivers features from architecture through review and documentation.',
    href: '/onboarding-agents.html',
  },
  {
    name: 'Discovery',
    slug: 'discovery',
    icon: '🔍',
    accent: '#FBD75B',
    short: 'Analyzes legacy source code and catalogs its business rules and dependencies.',
    href: '/discovery-agent.html',
  },
]

export const INTERNAL_SKILLS = [
  {
    name: 'Greenfield Skills',
    slug: 'greenfield-skills',
    icon: '🧰',
    accent: '#F2C94C',
    short: 'Reusable capabilities spanning code generation, review, reasoning and documentation.',
    href: '/skills-greenfield.html',
  },
]
