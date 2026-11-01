import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { installReactPerformanceDetail } from './lib/react-performance-detail.js'
import { installDiagnostics } from './lib/diagnostics.js'
import { version } from '../package.json'

const removeDiagnosticListeners = installDiagnostics({ version })
if (import.meta.hot) import.meta.hot.dispose(removeDiagnosticListeners)

if (import.meta.env.DEV) installReactPerformanceDetail({ development: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
