import { describe, expect, it } from 'vitest';
import {
  MLX_LM_EXTERNAL_BIND_HOST,
  MLX_LM_LOCAL_CLIENT_HOST,
  resolveMlxLmClientHost,
  resolveMlxLmConnectionSummary,
  resolveMlxLmExternalBaseUrlHint,
  resolveMlxLmOpenAiBaseUrl,
  resolveMlxLmServerBindHost,
} from '@/utils/llm/mlxLmSettingsStore';

describe('mlxLm external access helpers', () => {
  it('binds to all interfaces when external access is enabled', () => {
    expect(
      resolveMlxLmServerBindHost({
        host: MLX_LM_LOCAL_CLIENT_HOST,
        allowExternalAccess: true,
      }),
    ).toBe(MLX_LM_EXTERNAL_BIND_HOST);
  });

  it('keeps local bind host when external access is disabled', () => {
    expect(
      resolveMlxLmServerBindHost({
        host: '127.0.0.1',
        allowExternalAccess: false,
      }),
    ).toBe('127.0.0.1');
  });

  it('uses localhost for in-app client requests when external access is enabled', () => {
    expect(
      resolveMlxLmClientHost({
        host: MLX_LM_EXTERNAL_BIND_HOST,
        allowExternalAccess: true,
      }),
    ).toBe(MLX_LM_LOCAL_CLIENT_HOST);
  });

  it('builds external endpoint hint for other devices', () => {
    expect(resolveMlxLmExternalBaseUrlHint({ port: 8080, allowExternalAccess: true })).toBe(
      'http://<this-machine-ip>:8080/v1',
    );
    expect(resolveMlxLmExternalBaseUrlHint({ port: 8080, allowExternalAccess: false })).toBeNull();
  });

  it('summarizes connection settings', () => {
    expect(
      resolveMlxLmConnectionSummary({
        host: MLX_LM_LOCAL_CLIENT_HOST,
        port: 8080,
        allowExternalAccess: true,
      }),
    ).toBe('0.0.0.0:8080 (외부 접속 허용)');
  });

  it('keeps OpenAI base URL on localhost when server binds externally', () => {
    expect(
      resolveMlxLmOpenAiBaseUrl({
        host: MLX_LM_LOCAL_CLIENT_HOST,
        port: 8080,
        allowExternalAccess: true,
      }),
    ).toBe('http://127.0.0.1:8080/v1');
  });
});
