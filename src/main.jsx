import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router'
import { marked } from 'marked'
import '@/index.css'
import '@/config/mdEditorConfig'
import App from '@/App.jsx'
import { ActivityIndicatorProvider } from '@/contexts/ActivityIndicatorContext'
import { AlertModalProvider } from '@/contexts/AlertModalContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ensureLatestAppBuild } from '@/utils/pwaUpdate'

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'
const isElectron = import.meta.env.VITE_ELECTRON === 'true'
const routerBasename = isElectron ? '/' : base
if (typeof window !== 'undefined') window.marked = marked

function AppShell() {
  return (
    <ActivityIndicatorProvider>
      <AlertModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlertModalProvider>
    </ActivityIndicatorProvider>
  )
}

const router = (isElectron ? createHashRouter : createBrowserRouter)(
  [{ path: '/*', Component: AppShell }],
  { basename: routerBasename },
)

async function bootstrap() {
  const canRender = await ensureLatestAppBuild()
  if (!canRender) return

  const root = document.getElementById('root')
  if (!root) return

  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

bootstrap()
