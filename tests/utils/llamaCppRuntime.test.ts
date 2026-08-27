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
