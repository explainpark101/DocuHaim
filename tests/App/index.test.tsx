import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/App/AppProviders', () => ({
  AppProviders: ({ children }: { children: React.ReactNode }) =>
    createElement('div', { 'data-app-providers': '1' }, children),
}));

vi.mock('@/App/AppShellView', () => ({
  AppShellView: () => createElement('div', { 'data-app-shell': '1' }, 'shell'),
}));

vi.mock('@/pages/LlmAssistPopoutPage', () => ({
  default: () => createElement('div', { 'data-llm-popout': '1' }, 'popout'),
}));

describe('App entry routing', () => {
  it('renders AppProviders + AppShellView for the default shell route', async () => {
    const { default: App } = await import('@/App');
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: ['/'] }, createElement(App)),
    );
    expect(html).toContain('data-app-providers="1"');
    expect(html).toContain('data-app-shell="1"');
    expect(html).not.toContain('llm-assist-popout-layout');
  });

  it('selects the LLM assist popout shell on /llm-assist-popout', async () => {
    const { default: App } = await import('@/App');
    const html = renderToStaticMarkup(
      createElement(
        MemoryRouter,
        { initialEntries: ['/llm-assist-popout'] },
        createElement(App),
      ),
    );
    expect(html).toContain('llm-assist-popout-layout');
    expect(html).not.toContain('data-app-shell');
    expect(html).toContain('로딩 중');
  });
});
