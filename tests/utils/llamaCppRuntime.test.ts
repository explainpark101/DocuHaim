import { describe, expect, it } from 'vitest';
import {
  getLlamaCppRuntimeStatusSync,
  isLlamaCppRuntimeManagedByApp,
} from '@/utils/llm/llamaCppRuntime';

describe('llamaCppRuntime status', () => {
  it('defaults to stopped unmanaged state', () => {
    expect(isLlamaCppRuntimeManagedByApp()).toBe(false);
    expect(getLlamaCppRuntimeStatusSync()).toEqual({
      serverRunning: false,
      loaded: false,
      modelPath: null,
      baseUrl: null,
    });
  });
});

describe('LlamaCppServerStartAbortedError', () => {
  it('is detected by helper', async () => {
    const { isLlamaCppServerStartAbortedError, LlamaCppServerStartAbortedError } = await import(
      '@/utils/llm/llamaCppRuntime'
    );
    expect(isLlamaCppServerStartAbortedError(new LlamaCppServerStartAbortedError())).toBe(true);
    expect(isLlamaCppServerStartAbortedError(new Error('other'))).toBe(false);
  });
});
