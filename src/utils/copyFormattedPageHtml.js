const COPY_ROOT_SELECTORS = [
  '.novel-editor-surface',
  '.md-editor-preview',
];

const STRIP_SELECTORS = [
  'script',
  'style',
  'button',
  '[contenteditable="false"]',
  '.md-editor-code-action',
  '.md-editor-code-head',
  '.md-preview-heading-fold-chevron',
  '[data-transform-handle]',
  '[data-haim-table-resize-handle]',
  '[data-haim-table-resize-overlay]',
];

const INLINE_STYLE_PROPS = [
  'background-color',
  'border',
  'border-collapse',
  'border-color',
  'border-radius',
  'border-style',
  'border-width',
  'box-sizing',
  'color',
  'display',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'height',
  'line-height',
  'list-style-position',
  'list-style-type',
  'margin',
  'margin-bottom',
  'margin-left',
  'margin-right',
  'margin-top',
  'max-width',
  'min-height',
  'object-fit',
  'overflow-wrap',
  'padding',
  'padding-bottom',
  'padding-left',
  'padding-right',
  'padding-top',
  'text-align',
  'text-decoration',
  'vertical-align',
  'white-space',
  'width',
  'word-break',
];

function findCopyRoot(scope = document) {
  for (const selector of COPY_ROOT_SELECTORS) {
    const roots = [...scope.querySelectorAll(selector)];
    const visible = roots.find((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    });
    if (visible) return visible;
  }
  return null;
}

function stripEditorOnlyNodes(root) {
  root.querySelectorAll(STRIP_SELECTORS.join(',')).forEach((node) => node.remove());
  [root, ...root.querySelectorAll('[class]')].forEach((node) => {
    node.className = String(node.className || '')
      .split(/\s+/)
      .filter((name) => name && !/^dark:/.test(name) && name !== 'dark' && name !== 'md-editor-dark')
      .join(' ');
  });
}

function copyDocumentStylesInto(doc) {
  [...document.querySelectorAll('style, link[rel="stylesheet"]')].forEach((node) => {
    doc.head.appendChild(node.cloneNode(true));
  });
}

function createLightModeFrame() {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.tabIndex = -1;
  iframe.style.cssText = [
    'position:fixed',
    'left:-10000px',
    'top:0',
    'width:900px',
    'height:1200px',
    'opacity:0',
    'pointer-events:none',
  ].join(';');
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    iframe.remove();
    throw new Error('복사용 문서를 만들 수 없습니다.');
  }

  doc.open();
  doc.write('<!doctype html><html><head></head><body></body></html>');
  doc.close();
  doc.documentElement.className = '';
  doc.body.className = '';
  doc.body.style.cssText = 'margin:0;background:#ffffff;color:#111827;';
  copyDocumentStylesInto(doc);
  return iframe;
}

async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(reader.error || new Error('이미지를 읽을 수 없습니다.'));
    reader.readAsDataURL(blob);
  });
}

async function imageSrcToDataUrl(src) {
  if (!src || /^data:/i.test(src)) return src;
  const absolute = new URL(src, window.location.href).href;
  const response = await fetch(absolute, { credentials: 'include', cache: 'force-cache' });
  if (!response.ok) throw new Error(`이미지 다운로드 실패 (${response.status})`);
  return blobToDataUrl(await response.blob());
}

async function inlineImages(root) {
  const imgs = [...root.querySelectorAll('img')];
  await Promise.all(imgs.map(async (img) => {
    const src = img.getAttribute('src') || img.src || '';
    if (!src) return;
    try {
      const dataUrl = await imageSrcToDataUrl(src);
      if (dataUrl) {
        img.setAttribute('src', dataUrl);
        img.removeAttribute('srcset');
        img.removeAttribute('data-storage-hydrating');
        img.removeAttribute('data-storage-hydrated');
      }
    } catch {
      // Keep the original src if the browser refuses to fetch a remote image.
    }
  }));
}

function inlineComputedStyles(sourceRoot, targetRoot) {
  const sourceNodes = [sourceRoot, ...sourceRoot.querySelectorAll('*')];
  const targetNodes = [targetRoot, ...targetRoot.querySelectorAll('*')];

  sourceNodes.forEach((source, index) => {
    const target = targetNodes[index];
    if (!(target instanceof targetRoot.ownerDocument.defaultView.HTMLElement)) return;
    const style = sourceRoot.ownerDocument.defaultView.getComputedStyle(source);
    const inline = INLINE_STYLE_PROPS
      .map((prop) => {
        const value = style.getPropertyValue(prop);
        return value ? `${prop}:${value}` : '';
      })
      .filter(Boolean)
      .join(';');
    if (inline) target.setAttribute('style', inline);
  });
}

function normalizeForPaste(root) {
  root.querySelectorAll('[contenteditable]').forEach((node) => node.removeAttribute('contenteditable'));
  root.querySelectorAll('[role="button"], [aria-label], [aria-hidden], [data-state]').forEach((node) => {
    node.removeAttribute('role');
    node.removeAttribute('aria-label');
    node.removeAttribute('aria-hidden');
    node.removeAttribute('data-state');
  });
  root.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    if (input.checked) input.setAttribute('checked', 'checked');
    else input.removeAttribute('checked');
    input.setAttribute('disabled', 'disabled');
  });
}

async function writeHtmlClipboard(html, text) {
  if (navigator.clipboard?.write && window.ClipboardItem) {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ]);
    return;
  }

  const selection = window.getSelection();
  const previousRanges = [];
  if (selection) {
    for (let i = 0; i < selection.rangeCount; i += 1) {
      previousRanges.push(selection.getRangeAt(i));
    }
  }

  const holder = document.createElement('div');
  holder.style.cssText = 'position:fixed;left:-10000px;top:0;width:900px;';
  holder.innerHTML = html;
  document.body.appendChild(holder);

  const range = document.createRange();
  range.selectNodeContents(holder);
  selection?.removeAllRanges();
  selection?.addRange(range);
  const ok = document.execCommand('copy');
  holder.remove();
  selection?.removeAllRanges();
  previousRanges.forEach((r) => selection?.addRange(r));
  if (!ok) throw new Error('브라우저가 HTML 클립보드 쓰기를 거부했습니다.');
}

export async function copyCurrentPageAsFormattedHtml(scope = document) {
  const sourceRoot = findCopyRoot(scope);
  if (!sourceRoot) {
    throw new Error('복사할 렌더링 영역을 찾지 못했습니다.');
  }

  const iframe = createLightModeFrame();
  try {
    const doc = iframe.contentDocument;
    const clone = sourceRoot.cloneNode(true);
    stripEditorOnlyNodes(clone);
    normalizeForPaste(clone);
    clone.classList.add('md-editor-preview');
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#111827';
    doc.body.appendChild(clone);

    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    inlineComputedStyles(clone, clone);
    await inlineImages(clone);

    const html = [
      '<div style="background:#ffffff;color:#111827;">',
      clone.innerHTML,
      '</div>',
    ].join('');
    const text = clone.innerText || sourceRoot.innerText || '';
    await writeHtmlClipboard(html, text);
    return { html, text };
  } finally {
    iframe.remove();
  }
}
