import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/effects.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 40, fontFamily: 'monospace' }}>Loading…</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
