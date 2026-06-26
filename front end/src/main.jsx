import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AgentProfile from './AgentProfile.jsx'
import InternalDetail from './InternalDetail.jsx'
import ToolkitHub from './ToolkitHub.jsx'
import { HUB_PATH } from './internal.js'
import './index.css'
import './detail.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile/:slug" element={<AgentProfile />} />
        <Route path={HUB_PATH} element={<ToolkitHub />} />
        <Route path="/internal/:slug" element={<InternalDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
