import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import App from './App.jsx'
import AgentProfile from './AgentProfile.jsx'
import InternalDetail from './InternalDetail.jsx'
import ToolkitHub from './ToolkitHub.jsx'
import InternalSkills from './InternalSkills.jsx'
import { HUB_PATH, SKILLS_PATH } from './internal.js'
import './index.css'
import './detail.css'

// Per-history-entry scroll positions. Module-level so they survive route
// remounts. Browsers can't auto-restore scroll in an SPA because the new route
// renders after the browser would restore, so we manage it ourselves.
const scrollPositions = new Map()

// Forward navigation (clicking a link/card) starts at the top; back/forward
// (POP) restores where the user was — e.g. returning from an agent profile
// lands back on the "Explore our AI Agents" section, not the top of the page.
function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const liveY = useRef(0) // current scroll position, kept live by the listener
  const prevKey = useRef(location.key)

  // Save the OUTGOING page's scroll position the moment the route key changes,
  // here in render — i.e. before the commit clamps scrollY on a shorter page and
  // before any unreliable scroll event. Reading a ref and writing the module map
  // is idempotent, so StrictMode's double render is harmless.
  if (prevKey.current !== location.key) {
    scrollPositions.set(prevKey.current, liveY.current)
    prevKey.current = location.key
  }

  // One persistent listener that just tracks the live scroll position.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    const onScroll = () => { liveY.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On navigation: POP (back/forward) restores the saved position; PUSH (a new
  // link/card) starts at the top; REPLACE (e.g. changing the category filter,
  // which only rewrites the query string) leaves the scroll alone.
  useEffect(() => {
    if (navType === 'REPLACE') return

    if (navType !== 'POP') {
      window.scrollTo(0, 0)
      liveY.current = 0
      return
    }

    // The page grows to full height over several frames (fonts, the 3D canvas,
    // images), so a single scrollTo lands short. Re-apply across frames until we
    // actually reach the saved offset (document tall enough) or we give up.
    const saved = scrollPositions.get(location.key)
    if (saved == null) return
    let frame
    let tries = 0
    const step = () => {
      window.scrollTo(0, saved)
      liveY.current = window.scrollY
      tries += 1
      if (Math.abs(window.scrollY - saved) > 2 && tries < 120) {
        frame = requestAnimationFrame(step)
      }
    }
    frame = requestAnimationFrame(step)
    return () => { if (frame) cancelAnimationFrame(frame) }
  }, [location.key, navType])

  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile/:slug" element={<AgentProfile />} />
        <Route path={HUB_PATH} element={<ToolkitHub />} />
        <Route path={SKILLS_PATH} element={<InternalSkills />} />
        <Route path="/internal/:slug" element={<InternalDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
