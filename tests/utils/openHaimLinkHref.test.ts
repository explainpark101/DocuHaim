import { afterEach, describe, expect, it, vi } from 'vitest';

const openHaimViewPath = vi.fn((..._args: unknown[]) => undefined);
const isDesktopApp = vi.fn(() => false);
const isTauriAndroid = vi.fn(() => false);
const openDesktopExternalUrl = vi.fn(async (_href: string) => undefined);

vi.mock('@/utils/haimOpenViewPath', () => ({
  openHaimViewPath: (...args: unknown[]) => openHaimViewPath(...args),
}));

vi.mock('@/utils/isDesktopApp', () => ({
  isDesktopApp: () => isDesktopApp(),
}));

vi.mock('@/utils/tauriPlatform', () => ({
  isTauriAndroid: () => isTauriAndroid(),
}));

vi.mock('@/utils/shared/initDesktopExternalLinks', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/utils/shared/initDesktopExternalLinks')>();
  return {
    ...actual,
    openDesktopExternalUrl: (href: string) => openDesktopExternalUrl(href),
  };
});

describe('openHaimLinkHref', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
    openHaimViewPath.mockReset();
    isDesktopApp.mockReset();
    isDesktopApp.mockReturnValue(false);
    isTauriAndroid.mockReset();
    isTauriAndroid.mockReturnValue(false);
    openDesktopExternalUrl.mockReset();
  });

  it('opens docuhaim paths in-app', async () => {
    const { openHaimLinkHref } = await import('@/utils/openHaimLinkHref');
    openHaimLinkHref('docuhaim://notes/a.md');
    expect(openHaimViewPath).toHaveBeenCalledWith('notes/a.md');
  });

  it('opens http(s) via temporary anchor click on web', async () => {
    const click = vi.fn();
    const remove = vi.fn();
    const anchor = {
      href: '',
      target: '',
      rel: '',
      style: { display: '' },
      click,
      remove,
    };
    const appendChild = vi.fn();
    vi.stubGlobal('document', {
      createElement: vi.fn(() => anchor),
      body: { appendChild },
    });

    const { openHaimLinkHref } = await import('@/utils/openHaimLinkHref');
    openHaimLinkHref('https://example.com/x', { target: '_blank' });

    expect(appendChild).toHaveBeenCalledWith(anchor);
    expect(anchor.href).toBe('https://example.com/x');
    expect(anchor.target).toBe('_blank');
    expect(anchor.rel).toBe('noopener noreferrer');
    expect(click).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('opens http(s) via desktop external opener in Tauri shells', async () => {
    isDesktopApp.mockReturnValue(true);
    const { openHaimLinkHref } = await import('@/utils/openHaimLinkHref');
    openHaimLinkHref('https://example.com/x', { target: '_blank' });
    expect(openDesktopExternalUrl).toHaveBeenCalledWith('https://example.com/x');
  });
});
