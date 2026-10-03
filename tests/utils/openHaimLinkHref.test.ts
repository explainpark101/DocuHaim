import { afterEach, describe, expect, it, vi } from 'vitest';

const openHaimViewPath = vi.fn();
const isDesktopApp = vi.fn(() => false);

vi.mock('@/utils/haimOpenViewPath', () => ({
  openHaimViewPath: (...args: unknown[]) => openHaimViewPath(...args),
}));

vi.mock('@/utils/isDesktopApp', () => ({
  isDesktopApp: () => isDesktopApp(),
}));

describe('openHaimLinkHref', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
    openHaimViewPath.mockReset();
    isDesktopApp.mockReset();
    isDesktopApp.mockReturnValue(false);
  });

  it('opens docuhaim paths in-app', async () => {
    const { openHaimLinkHref } = await import('@/utils/openHaimLinkHref');
    openHaimLinkHref('docuhaim://notes/a.md');
    expect(openHaimViewPath).toHaveBeenCalledWith('notes/a.md');
  });

  it('opens http(s) via temporary anchor click', async () => {
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
});
