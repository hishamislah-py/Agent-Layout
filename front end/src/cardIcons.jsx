// PNG line-icons for the agent cards, keyed by agent slug.
// Used only on the card face (AppCards); the emoji in agents.js still drives
// everywhere else. PNGs live in ./assets/icons/<slug>.png (accent-coloured).
const modules = import.meta.glob('./assets/icons/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

// build a { slug: url } map from the file paths
export const CARD_ICONS = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const slug = path.split('/').pop().replace('.png', '')
    return [slug, url]
  })
)

// Inline stroke-SVG icons, keyed by agent slug. Unlike the PNGs above, these
// inherit the card's --accent via currentColor, so no per-agent colour is baked
// in. Rendered on the card face in preference to the emoji fallback.
export const CARD_ICON_SVGS = {
  'infra-iq': (
    <svg className="card-icon-img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4" width="17" height="6" rx="1.8" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.8" />
      <circle cx="7" cy="7" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="7" cy="17" r="1.05" fill="currentColor" stroke="none" />
      <path d="M11 7h6M11 17h6" />
    </svg>
  ),
}
