import { describe, expect, it } from 'vitest';
import {
  normalizeMlxVlmImages,
  toMlxVlmWorkerImagePayload,
} from '@/utils/llm/mlxVlmImagePayload';

describe('normalizeMlxVlmImages', () => {
  it('filters invalid attachments and keeps valid ones', () => {
    expect(
      normalizeMlxVlmImages([
        { mimeType: 'image/png', dataBase64: 'abc123' },
        { mimeType: '', dataBase64: 'skip' },
        { mimeType: 'image/jpeg', dataBase64: '' },
        null as unknown as { mimeType: string; dataBase64: string },
      ]),
    ).toEqual([{ mimeType: 'image/png', dataBase64: 'abc123' }]);
  });

  it('returns empty list for non-array input', () => {
    expect(normalizeMlxVlmImages(undefined)).toEqual([]);
    expect(normalizeMlxVlmImages(null)).toEqual([]);
  });
});

describe('toMlxVlmWorkerImagePayload', () => {
  it('maps camelCase inputs to worker snake_case keys', () => {
    expect(
      toMlxVlmWorkerImagePayload([
        { mimeType: ' image/png ', dataBase64: ' dGVzdA== ' },
        { mimeType: 'image/jpeg', dataBase64: 'abc' },
      ]),
    ).toEqual([
      { mime_type: 'image/png', data_base64: 'dGVzdA==' },
      { mime_type: 'image/jpeg', data_base64: 'abc' },
    ]);
  });
});
