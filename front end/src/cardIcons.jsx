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
