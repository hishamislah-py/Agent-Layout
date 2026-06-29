import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import AgentProfile from './AgentProfile.jsx'
import InternalDetail from './InternalDetail.jsx'
import ToolkitHub from './ToolkitHub.jsx'
import InternalSkills from './InternalSkills.jsx'
import { HUB_PATH, SKILLS_PATH } from './internal.js'
import './index.css'
import './detail.css'

// Reset scroll to the top on every route change (React Router keeps the
// previous scroll position otherwise).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
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
