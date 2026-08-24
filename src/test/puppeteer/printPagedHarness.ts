import '@/styles/exportPDF.css';
import '@/styles/md-editor-rt/style.css';
import { buildPrintLayoutCssVars, DEFAULT_PRINT_PAGE_LAYOUT } from '@/utils/printPageLayout';
import {
  PRINT_BODY_PAGE_ATTR,
  renderMarkdownToPagedPreview,
} from '@/utils/printPagedJs';
import { buildPrintTestContentStyles } from '../fixtures/printTestContentStyles';
import {
  buildSimpleMdDownloadSession,
  readSessionMarkdown,
  SIMPLE_MD_SESSION_PATH,
} from '../fixtures/simpleSessionWorkspace';

export type PrintPagedHarnessResult = {
  pageCount: number;
  pagesInDom: number;
  text: string;
  bodyPageAttrs: string[];
  hasSource: boolean;
  hasWrapper: boolean;
  sessionPath: string | null;
};

declare global {
  interface Window {
    __printPagedHarnessReady?: boolean;
    __runDownloadSessionPagedTest?: () => Promise<PrintPagedHarnessResult>;
  }
}

const vars = buildPrintLayoutCssVars(DEFAULT_PRINT_PAGE_LAYOUT);
for (const [key, value] of Object.entries(vars)) {
  document.documentElement.style.setProperty(key, value);
}

async function paginateMarkdownInHarness(
  markdown: string,
  sessionPath: string | null = null,
): Promise<PrintPagedHarnessResult> {
  const pagesHost = document.getElementById('pages-host');
  if (!pagesHost) {
    throw new Error('pages-host element missing');
  }

  pagesHost.replaceChildren();

  const { pageCount } = await renderMarkdownToPagedPreview({
    markdown,
    pagesHost,
    pageSizeId: 'a4',
    contentStyles: buildPrintTestContentStyles(),
  });

  const pages = [...pagesHost.querySelectorAll('.pagedjs_page')];
  return {
    pageCount,
    pagesInDom: pages.length,
    text: pagesHost.textContent ?? '',
    bodyPageAttrs: pages.map((page) => page.getAttribute(PRINT_BODY_PAGE_ATTR) ?? ''),
    hasSource: Boolean(pagesHost.querySelector('[data-export-pdf-paged-source]')),
    hasWrapper: Boolean(pagesHost.querySelector('.pagedjs-wrapper')),
    sessionPath,
  };
}

window.__runDownloadSessionPagedTest = async (): Promise<PrintPagedHarnessResult> => {
  const workspace = buildSimpleMdDownloadSession();
  const markdown = readSessionMarkdown(workspace, SIMPLE_MD_SESSION_PATH);
  return paginateMarkdownInHarness(markdown, SIMPLE_MD_SESSION_PATH);
};

window.__printPagedHarnessReady = true;
