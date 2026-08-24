// @vitest-environment node
import puppeteer, { type Browser, type Page } from 'puppeteer';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { PrintPagedHarnessResult } from './printPagedHarness';
import { startViteTestServer, stopViteTestServer } from './viteTestServer';

const HARNESS_PATH = '/src/test/puppeteer/printPagedHarness.html';
const HOOK_TIMEOUT_MS = 120_000;

let baseUrl = '';
let browser: Browser;

async function launchPuppeteerBrowser(): Promise<Browser> {
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };

  try {
    return await puppeteer.launch(launchOptions);
  } catch {
    return puppeteer.launch({
      ...launchOptions,
      channel: 'chrome',
    });
  }
}

beforeAll(async () => {
  baseUrl = await startViteTestServer();
  browser = await launchPuppeteerBrowser();
}, HOOK_TIMEOUT_MS);

afterAll(async () => {
  await browser?.close();
  await stopViteTestServer();
}, HOOK_TIMEOUT_MS);

async function openHarnessPage(): Promise<Page> {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}${HARNESS_PATH}`, {
    waitUntil: 'networkidle0',
    timeout: HOOK_TIMEOUT_MS,
  });
  await page.waitForFunction(
    () => window.__printPagedHarnessReady === true && typeof window.__runDownloadSessionPagedTest === 'function',
    { timeout: HOOK_TIMEOUT_MS },
  );
  return page;
}

describe('Paged.js (puppeteer + download session)', () => {
  it('paginates a two-line markdown file from a download session', async () => {
    const page = await openHarnessPage();

    const result = await page.evaluate(async (): Promise<PrintPagedHarnessResult> => {
      if (!window.__runDownloadSessionPagedTest) {
        throw new Error('download session harness runner missing');
      }
      return window.__runDownloadSessionPagedTest();
    });

    expect(result.sessionPath).toBe('simple.md');
    expect(result.pageCount).toBeGreaterThanOrEqual(1);
    expect(result.pagesInDom).toBeGreaterThanOrEqual(1);
    expect(result.text).toContain('Hello');
    expect(result.text).toContain('Plain paragraph');
    expect(result.bodyPageAttrs).toEqual(
      result.bodyPageAttrs.map((_, index) => String(index)),
    );
    expect(result.hasSource).toBe(false);
    expect(result.hasWrapper).toBe(false);

    await page.close();
  });
});
