import path from 'node:path';
import type { Plugin } from 'vite';
import { rewriteTelegramBufferGlobals } from '../src/utils/telegram/rewriteTelegramBufferGlobals';
import {
  classifyTelegramNodeStub,
  isTelegramInspectModule,
  isTelegramRollupHelperId,
  TELEGRAM_EMPTY_BROWSER_STUB,
  TELEGRAM_INSPECT_BROWSER_STUB,
  TELEGRAM_OS_BROWSER_STUB,
} from '../src/utils/telegram/telegramBrowserShim';

const EMPTY_STUB_ID = '\0telegram-browser-empty';
const OS_STUB_ID = '\0telegram-browser-os';

function isTelegramJs(id: string): boolean {
  if (isTelegramRollupHelperId(id)) return false;
  const clean = id.split('?')[0]?.replace(/\\/g, '/') ?? '';
  return clean.includes('/node_modules/telegram/') && clean.endsWith('.js');
}

function isTelegramImporter(importer: string | undefined): boolean {
  return (importer ?? '').replace(/\\/g, '/').includes('/node_modules/telegram/');
}

/** Browser shims for gramjs: npm `buffer`, WebCrypto `crypto`, and Node-only wrappers. */
export function telegramBrowserShimsPlugin(rootDir: string): Plugin {
  const bufferEntry = path.resolve(rootDir, 'node_modules/buffer/index.js');
  const cryptoEntry = path.resolve(rootDir, 'node_modules/telegram/crypto/crypto.js');
  const pathEntry = path.resolve(rootDir, 'node_modules/path-browserify/index.js');
  return {
    name: 'telegram-browser-shims',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source === 'buffer' || source === 'node:buffer') return bufferEntry;
      if ((source === 'crypto' || source === 'node:crypto') && isTelegramImporter(importer)) {
        return cryptoEntry;
      }
      const stub = classifyTelegramNodeStub(source, importer);
      if (stub === 'empty') return EMPTY_STUB_ID;
      if (stub === 'os') return OS_STUB_ID;
      if (stub === 'path') return pathEntry;
      return null;
    },
    load(id) {
      if (id === EMPTY_STUB_ID) return TELEGRAM_EMPTY_BROWSER_STUB;
      if (id === OS_STUB_ID) return TELEGRAM_OS_BROWSER_STUB;
      return null;
    },
    transform(code, id) {
      if (isTelegramInspectModule(id)) {
        return { code: TELEGRAM_INSPECT_BROWSER_STUB, map: null };
      }
      if (!isTelegramJs(id)) return null;
      const next = rewriteTelegramBufferGlobals(code);
      if (next == null) return null;
      return { code: next, map: null };
    },
  };
}
