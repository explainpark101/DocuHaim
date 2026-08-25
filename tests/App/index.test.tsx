import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/App/MainApp', () => ({
  MainApp: () => createElement('div', { 'data-main-app': '1' }, 'main'),
}));

vi.mock('@/pages/LlmAssistPopoutPage', () => ({
  default: () => createElement('div', { 'data-llm-popout': '1' }, 'popout'),
}));

describe('App entry routing', () => {
  it('renders MainApp for the default shell route', async () => {
    const { default: App } = await import('@/App');
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: ['/'] }, createElement(App)),
    );
    expect(html).toContain('data-main-app="1"');
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
    // Path branch: popout layout, not MainApp.
    expect(html).toContain('llm-assist-popout-layout');
    expect(html).not.toContain('data-main-app');
    // React.lazy + Suspense: static markup shows RouteSuspenseFallback until the
    // chunk resolves (jsdom not required for this routing guarantee).
    expect(html).toContain('로딩 중');
  });
});
