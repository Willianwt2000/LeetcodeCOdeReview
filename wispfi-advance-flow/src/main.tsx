import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config' // Initialize i18n before app renders
import ErrorBoundary from './components/ErrorBoundary'
import { HelmetProvider } from 'react-helmet-async'

console.log('[main] Mounting React app with i18n support')

// HubSpot form script loading is now handled by individual form components

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

setTimeout(() => console.log('[main] App rendered tick'), 0)

