import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import { marked } from 'marked'
import '@/index.css'
import '@/config/mdEditorConfig'
import App from '@/App.jsx'
import { ActivityIndicatorProvider } from '@/contexts/ActivityIndicatorContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ensureLatestAppBuild } from '@/utils/pwaUpdate'

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'
const Router = import.meta.env.VITE_ELECTRON === 'true' ? HashRouter : BrowserRouter
const routerBasename = import.meta.env.VITE_ELECTRON === 'true' ? '/' : base
if (typeof window !== 'undefined') window.marked = marked

async function bootstrap() {
  const canRender = await ensureLatestAppBuild()
  if (!canRender) return

  const root = document.getElementById('root')
  if (!root) return

  createRoot(root).render(
    <StrictMode>
      <Router basename={routerBasename}>
        <ActivityIndicatorProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ActivityIndicatorProvider>
      </Router>
    </StrictMode>,
  )
}

bootstrap()
