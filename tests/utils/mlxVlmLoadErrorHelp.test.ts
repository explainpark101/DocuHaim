import { describe, expect, it } from 'vitest';
import {
  buildMlxVlmLoadFailureAlertMessage,
  buildMlxVlmRedownloadPasteInput,
  resolveMlxVlmLoadFailure,
  shouldSuggestMlxVlmRedownload,
} from '@/utils/llm/mlxVlmLoadErrorHelp';

describe('mlxVlmLoadErrorHelp', () => {
  it('suggests redownload for worker load failures', () => {
    expect(shouldSuggestMlxVlmRedownload('load failed: No such file or directory')).toBe(true);
    expect(shouldSuggestMlxVlmRedownload('MLX-VLM model did not load in time.')).toBe(true);
  });

  it('skips redownload hint for install/setup errors', () => {
    expect(
      shouldSuggestMlxVlmRedownload(
        'MLX-VLM needs jinja2 for chat templates. Run: uv tool install --force mlx-vlm --with jinja2',
      ),
    ).toBe(false);
    expect(shouldSuggestMlxVlmRedownload('Select a model before starting MLX-VLM.')).toBe(false);
  });

  it('builds alert copy with model id and recovery steps', () => {
    const message = buildMlxVlmLoadFailureAlertMessage(
      new Error('load failed: corrupted safetensors'),
      'mlx-community/Qwen2-VL-2B-Instruct-4bit',
    );
    expect(message).toContain('load failed: corrupted safetensors');
    expect(message).toContain('mlx-community/Qwen2-VL-2B-Instruct-4bit');
    expect(message).toContain('다시 다운로드');
  });

  it('resolveMlxVlmLoadFailure falls back to default message', () => {
    expect(resolveMlxVlmLoadFailure(null).message).toBe('MLX-VLM 모델 로드에 실패했습니다.');
  });

  it('buildMlxVlmRedownloadPasteInput normalizes repo ids', () => {
    expect(buildMlxVlmRedownloadPasteInput('mlx-community/foo')).toBe(
      'https://huggingface.co/mlx-community/foo',
    );
    expect(buildMlxVlmRedownloadPasteInput('https://huggingface.co/bar/baz')).toBe(
      'https://huggingface.co/bar/baz',
    );
  });
});
