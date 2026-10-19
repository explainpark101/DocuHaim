const MARK = '__HAIM_BUFFER__';

/**
 * gramjs references the Node global `Buffer` at module scope
 * (`AbridgedPacketCodec.tag = Buffer.from(...)`). Give each file a real binding
 * so that reference does not throw before `globalThis.Buffer` is assigned.
 */
export function rewriteTelegramBufferGlobals(code: string): string | null {
  if (code.includes(MARK)) return null;
  const bareBuffer = /(?<![\w$.])Buffer\b/g;
  if (!bareBuffer.test(code)) return null;
  bareBuffer.lastIndex = 0;
  const next = code.replace(bareBuffer, MARK);
  // CJS require: gramjs ships CommonJS. An ESM import here breaks Vite's CJS transform.
  return `var ${MARK} = require("buffer").Buffer;\n${next}`;
}
