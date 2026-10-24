import React from 'react'
import ReactDOM from 'react-dom/client'

// Fontes auto-hospedadas (woff2, font-display: swap) — sem pedidos a CDNs.
import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'

import './index.css'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
