import { Buffer } from 'buffer';

const scope = globalThis as typeof globalThis & {
  Buffer?: typeof Buffer;
};

/** Node's Buffer is missing in the browser. gramjs calls it while modules evaluate. */
export function installBrowserBuffer(): typeof Buffer {
  if (typeof scope.Buffer === 'undefined') {
    scope.Buffer = Buffer;
  }
  return scope.Buffer ?? Buffer;
}

installBrowserBuffer();
