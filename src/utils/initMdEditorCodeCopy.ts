import { copyText } from '@/utils/shared/copyText';

const SUCCESS_CLASS = 'is-copy-success';
const SUCCESS_MS = 1500;
const INIT_FLAG = '__mdEditorCodeCopyInit';

function codeTextFromCopyButton(btn: HTMLElement): string {
  const codeRoot = btn.closest('.md-editor-code');
  if (!codeRoot) return '';
  const codeEl =
    codeRoot.querySelector('input:checked + pre code')
    || codeRoot.querySelector('pre code');
  return codeEl?.textContent ?? '';
}

/**
 * Code-block copy: icon button click → clipboard + toast + brief green icon.
 * Capture-phase so we own the action (md-editor-rt's text/tips handler is skipped).
 */
export function initMdEditorCodeCopy(): void {
  if (typeof document === 'undefined') return;
  const w = window as Window & { [INIT_FLAG]?: boolean };
  if (w[INIT_FLAG]) return;
  w[INIT_FLAG] = true;

  document.addEventListener(
    'click',
    (event) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest('.md-editor-copy-button');
      if (!(btn instanceof HTMLElement)) return;
      if (!btn.closest('.md-editor-preview, .md-editor')) return;

      event.preventDefault();
      event.stopPropagation();

      const text = codeTextFromCopyButton(btn);
      if (!text) return;

      void (async () => {
        const ok = await copyText(text, { message: '코드 복사됨' });
        if (!ok) return;

        btn.classList.add(SUCCESS_CLASS);
        const prevTips = btn.getAttribute('data-tips');
        btn.setAttribute('data-tips', '복사됨');
        window.setTimeout(() => {
          btn.classList.remove(SUCCESS_CLASS);
          if (prevTips != null) btn.setAttribute('data-tips', prevTips);
        }, SUCCESS_MS);
      })();
    },
    true,
  );
}
