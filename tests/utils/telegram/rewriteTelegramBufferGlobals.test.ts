import { describe, expect, it } from 'vitest';
import { rewriteTelegramBufferGlobals } from '@/utils/telegram/rewriteTelegramBufferGlobals';
import {
  classifyTelegramNodeStub,
  isTelegramInspectModule,
  TELEGRAM_EMPTY_BROWSER_STUB,
  TELEGRAM_INSPECT_BROWSER_STUB,
  TELEGRAM_OS_BROWSER_STUB,
} from '@/utils/telegram/telegramBrowserShim';

describe('rewriteTelegramBufferGlobals', () => {
  it('binds bare Buffer references used at gramjs module scope', () => {
    const out = rewriteTelegramBufferGlobals(
      'AbridgedPacketCodec.tag = Buffer.from("ef", "hex");\n',
    );
    expect(out).toContain('var __HAIM_BUFFER__ = require("buffer").Buffer;');
    expect(out).toContain('__HAIM_BUFFER__.from("ef", "hex")');
    const body = out?.split('\n').slice(1).join('\n') ?? '';
    expect(body).not.toMatch(/(?<![\w$.])Buffer\b/);
  });

  it('leaves identifiers that only end with Buffer', () => {
    const out = rewriteTelegramBufferGlobals(
      'exports.readBigIntFromBuffer = readBigIntFromBuffer;\nfunction readBigIntFromBuffer(buffer) {\n  return Buffer.from(buffer);\n}\n',
    );
    expect(out).toContain('exports.readBigIntFromBuffer = readBigIntFromBuffer;');
    expect(out).toContain('function readBigIntFromBuffer(buffer)');
    expect(out).toContain('return __HAIM_BUFFER__.from(buffer);');
  });

  it('does not rewrite twice', () => {
    const once = rewriteTelegramBufferGlobals('Buffer.alloc(0);');
    expect(once).not.toBeNull();
    expect(rewriteTelegramBufferGlobals(once ?? '')).toBeNull();
  });

  it('skips files that do not use Buffer', () => {
    expect(rewriteTelegramBufferGlobals('export const version = "1";\n')).toBeNull();
  });
});

describe('classifyTelegramNodeStub', () => {
  const extensions = '/proj/node_modules/telegram/extensions/PromisedNetSockets.js';
  const client = '/proj/node_modules/telegram/client/downloads.js';

  it('stubs net, socks, and fs wrappers', () => {
    expect(classifyTelegramNodeStub('./net', extensions)).toBe('empty');
    expect(classifyTelegramNodeStub('./socks.js', extensions)).toBe('empty');
    expect(classifyTelegramNodeStub('./fs', client)).toBe('empty');
    expect(classifyTelegramNodeStub('/proj/node_modules/telegram/client/fs.js')).toBe('empty');
  });

  it('replaces os and path wrappers', () => {
    expect(classifyTelegramNodeStub('./os', client)).toBe('os');
    expect(classifyTelegramNodeStub('../client/path.js', extensions)).toBe('path');
  });

  it('leaves app imports and node builtins alone', () => {
    expect(classifyTelegramNodeStub('net', extensions)).toBeNull();
    expect(classifyTelegramNodeStub('./net', '/proj/src/app.js')).toBeNull();
    expect(classifyTelegramNodeStub('buffer')).toBeNull();
  });
});

describe('telegram browser stubs', () => {
  it('replaces gramjs inspect.js without Node util', () => {
    expect(isTelegramInspectModule('C:\\proj\\node_modules\\telegram\\inspect.js')).toBe(true);
    expect(isTelegramInspectModule('/proj/node_modules/telegram/inspect.js?v=1')).toBe(true);
    expect(isTelegramInspectModule('/proj/node_modules/telegram/client/TelegramClient.js')).toBe(false);
    expect(TELEGRAM_INSPECT_BROWSER_STUB).not.toMatch(/require\(["']util["']\)/);
    expect(TELEGRAM_INSPECT_BROWSER_STUB).toContain('inspect.custom = custom');
    expect(TELEGRAM_INSPECT_BROWSER_STUB).toContain('Symbol.for("nodejs.util.inspect.custom")');
    expect(TELEGRAM_INSPECT_BROWSER_STUB).toContain('exports.inspect = inspect');
  });

  it('is ESM so virtual modules do not reference the CommonJS module global', () => {
    expect(TELEGRAM_EMPTY_BROWSER_STUB).not.toMatch(/\bmodule\b/);
    expect(TELEGRAM_EMPTY_BROWSER_STUB).not.toMatch(/\brequire\b/);
    expect(TELEGRAM_OS_BROWSER_STUB).not.toMatch(/\bmodule\b/);
    expect(TELEGRAM_OS_BROWSER_STUB).not.toMatch(/\brequire\b/);
    expect(TELEGRAM_OS_BROWSER_STUB).toContain('export default');
    expect(TELEGRAM_OS_BROWSER_STUB).toContain('function type()');
    expect(TELEGRAM_OS_BROWSER_STUB).toContain('function release()');
  });
});
