import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router'
import '@/index.css'
import '@/config/mdEditorConfig'
import App from '@/App'
import { ActivityIndicatorProvider } from '@/contexts/ActivityIndicatorContext'
import { AlertModalProvider } from '@/contexts/AlertModalContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { ensureLatestAppBuild } from '@/utils/pwaUpdate'
import { initEditorAutocompleteDomFlag } from '@/utils/editorAutocompleteSettings'
import { initTouchLongPressHaptics } from '@/utils/initTouchLongPressHaptics'
import { initMdEditorCodeCopy } from '@/utils/initMdEditorCodeCopy'
import { isDesktopApp } from '@/utils/isDesktopApp'
import { startDesktopOpenFilesBridge } from '@/utils/desktopOpenFiles'

initEditorAutocompleteDomFlag()
initTouchLongPressHaptics()
initMdEditorCodeCopy()
void startDesktopOpenFilesBridge()

const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'
const isDesktop = isDesktopApp()
const routerBasename = isDesktop ? '/' : base

/**
 * Hosts often SPA-fallback `/docs` to this app shell. VitePress lives at `/docs/`.
 * If we landed on a docs URL as the React shell, retry with a trailing slash or stop.
 */
function bailIfSpaShellOnDocsPath(): boolean {
  if (isDesktop || typeof window === 'undefined') return false
  const pathname = window.location.pathname || '/'
  const prefix = base === '/' ? '' : base
  const docsRoot = `${prefix}/docs`
  if (pathname !== docsRoot && !pathname.startsWith(`${docsRoot}/`)) return false

  if (!pathname.endsWith('/')) {
    window.location.replace(`${pathname}/${window.location.search}${window.location.hash}`)
    return true
  }

  const root = document.getElementById('root')
  if (!root) return true
  root.replaceChildren()
  const box = document.createElement('div')
  box.style.cssText =
    'font-family:system-ui,sans-serif;max-width:36rem;margin:3rem auto;padding:0 1rem;line-height:1.5'
  box.innerHTML =
    '<h1 style="font-size:1.25rem">Docs not found</h1>' +
    '<p>This URL is reserved for the VitePress site under <code>dist/docs/</code>, ' +
    'but the app shell was served instead (SPA fallback or missing docs build).</p>' +
    '<p>Ensure <code>bun install --cwd docs && bun run build</code>, open <code>/docs/</code> ' +
    '(trailing slash), and exclude <code>/docs/*</code> from SPA rewrites on the host.</p>'
  root.appendChild(box)
  return true
}

function AppShell() {
  return (
    <ActivityIndicatorProvider>
      <AlertModalProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </AlertModalProvider>
    </ActivityIndicatorProvider>
  )
}

const router = (isDesktop ? createHashRouter : createBrowserRouter)(
  [{ path: '/*', Component: AppShell }],
  { basename: routerBasename },
)

async function bootstrap(): Promise<void> {
  if (bailIfSpaShellOnDocsPath()) return

  const canRender = await ensureLatestAppBuild()
  if (!canRender) return

  // Tell the controlling SW (PWA or coi-serviceworker) to use credentialless COEP.
  // Same message protocol as https://github.com/gzuidhof/coi-serviceworker
  try {
    navigator.serviceWorker?.controller?.postMessage({
      type: 'coepCredentialless',
      value: true,
    })
  } catch {
    // ignore
  }

  const root = document.getElementById('root')
  if (!root) return

  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

void bootstrap()
