import { beforeEach } from 'vitest';
import { buildPrintLayoutCssVars, DEFAULT_PRINT_PAGE_LAYOUT } from '@/utils/printPageLayout';

const INNER_WIDTH_PX = 718;
const INNER_HEIGHT_PX = 1047;

function stubDomLayout(): void {
  const rect = (): DOMRect => ({
    x: 0,
    y: 0,
    width: INNER_WIDTH_PX,
    height: INNER_HEIGHT_PX,
    top: 0,
    left: 0,
    right: INNER_WIDTH_PX,
    bottom: INNER_HEIGHT_PX,
    toJSON: () => ({}),
  });

  Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
    return rect();
  };

  Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
    configurable: true,
    get() {
      return INNER_WIDTH_PX;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return INNER_HEIGHT_PX;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    get() {
      return INNER_WIDTH_PX;
    },
  });

  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get() {
      return INNER_WIDTH_PX;
    },
  });
}

beforeEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';

  const vars = buildPrintLayoutCssVars(DEFAULT_PRINT_PAGE_LAYOUT);
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(key, value);
  }

  stubDomLayout();
});
