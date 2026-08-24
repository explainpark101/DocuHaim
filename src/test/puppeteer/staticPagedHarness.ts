export type StaticPagedHarnessResult = {
  pageCount: number;
  pagesInDom: number;
  text: string;
};

declare global {
  interface Window {
    __staticPagedHarnessReady?: boolean;
    __runStaticPagedTest?: () => Promise<StaticPagedHarnessResult>;
  }
}

window.__runStaticPagedTest = async (): Promise<StaticPagedHarnessResult> => {
  const pagesHost = document.getElementById('pages-host');
  if (!pagesHost) {
    throw new Error('pages-host element missing');
  }

  pagesHost.replaceChildren();
  pagesHost.style.width = '718px';

  const wrapper = document.createElement('div');
  wrapper.className = 'pagedjs-wrapper';

  const preview = document.createElement('div');
  preview.className = 'md-editor-preview';
  preview.innerHTML = '<h1>Hello</h1><p>Plain paragraph.</p>';
  wrapper.appendChild(preview);
  pagesHost.appendChild(wrapper);

  const { Previewer } = await import('pagedjs');
  const previewer = new Previewer();
  const flow = await previewer.preview(
    pagesHost,
    [{
      'inline://minimal': '@page { size: A4; margin: 10mm; }',
    }],
    pagesHost,
  );

  const pages = [...pagesHost.querySelectorAll('.pagedjs_page')];
  return {
    pageCount: Math.max(1, flow.total),
    pagesInDom: pages.length,
    text: pagesHost.textContent ?? '',
  };
};

window.__staticPagedHarnessReady = true;
