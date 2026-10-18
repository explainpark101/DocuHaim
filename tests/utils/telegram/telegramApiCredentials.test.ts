import { describe, expect, it } from 'vitest';
import { parseTelegramApiCredentials } from '@/utils/telegram/telegramApiCredentials';

const HASH = '0123456789abcdef0123456789abcdef';

describe('parseTelegramApiCredentials', () => {
  it('accepts api id, api hash, and an international phone number', () => {
    const parsed = parseTelegramApiCredentials({
      apiId: '123456',
      apiHash: HASH.toUpperCase(),
      phone: '+82 10-1234-5678',
    });
    expect(parsed).toEqual({
      ok: true,
      value: { apiId: 123456, apiHash: HASH, phone: '+821012345678' },
    });
  });

  it('rejects a short api hash', () => {
    const parsed = parseTelegramApiCredentials({
      apiId: '123456',
      apiHash: 'abcd',
      phone: '+821012345678',
    });
    expect(parsed.ok).toBe(false);
  });

  it('rejects a phone number without a country code', () => {
    const parsed = parseTelegramApiCredentials({
      apiId: '123456',
      apiHash: HASH,
      phone: '01012345678',
    });
    expect(parsed.ok).toBe(false);
  });
});
