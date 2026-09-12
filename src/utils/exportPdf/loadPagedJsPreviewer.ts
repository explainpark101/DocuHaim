/**
 * Load paged.js Previewer with crash guards.
 *
 * paged.js 0.4.x createBreakToken can call findElement(null) (getAttribute on null).
 * Vite also patches sources via transform + optimizeDeps esbuild plugin; this runtime
 * guard covers the Layout prototype when the relative module is the same instance.
 */

type PagedPreviewerCtor = new () => {
  preview: (
    content?: HTMLElement | DocumentFragment | string | null,
    stylesheets?: Array<string | Record<string, string>> | null,
    renderTo?: HTMLElement | null,
  ) => Promise<{ total?: number }>;
  polisher?: { destroy?: () => void };
};

type LayoutCtor = {
  prototype: {
    createBreakToken: (this: unknown, ...args: unknown[]) => unknown;
  };
};

let patchApplied = false;

function installCreateBreakTokenGuard(Layout: LayoutCtor): void {
  const original = Layout.prototype.createBreakToken;
  if (typeof original !== 'function') return;
  if ((original as { __s3haimPatched?: boolean }).__s3haimPatched) return;

  function patchedCreateBreakToken(this: unknown, ...args: unknown[]) {
    try {
      return original.apply(this, args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (
        message.includes('getAttribute')
        || message.includes('of null')
        || message.includes('of undefined')
        || message.includes('createTreeWalker')
        || message.includes('nextSibling')
        || message.includes('parentElement')
      ) {
        console.warn(
          '[pagedjs] createBreakToken recovered from null findElement',
          error,
        );
        return undefined;
      }
      throw error;
    }
  }
  (patchedCreateBreakToken as { __s3haimPatched?: boolean }).__s3haimPatched = true;
  Layout.prototype.createBreakToken = patchedCreateBreakToken;
}

async function applyPagedJsBreakTokenGuard(): Promise<void> {
  if (patchApplied) return;
  try {
    const layoutMod = (await import(
      '../../../node_modules/pagedjs/src/chunker/layout.js'
    )) as { default: LayoutCtor };
    installCreateBreakTokenGuard(layoutMod.default);
  } catch (error) {
    // Prebundled / exports-blocked paths still rely on Vite source transforms.
    console.warn('[pagedjs] runtime Layout guard skipped', error);
  }
  patchApplied = true;
}

export async function loadPagedJsPreviewer(): Promise<PagedPreviewerCtor> {
  await applyPagedJsBreakTokenGuard();
  const mod = await import('pagedjs');
  return mod.Previewer as PagedPreviewerCtor;
}
