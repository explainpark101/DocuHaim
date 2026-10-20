import { describe, expect, it } from 'vitest';
import {
  formatTelegramError,
  isTelegramSessionDead,
  telegramMtprotoCode,
} from '@/utils/telegram/telegramError';

describe('telegramMtprotoCode', () => {
  it('reads the specific code when GramJS overwrites errorMessage', () => {
    const err = Object.assign(new Error('400: PHONE_CODE_INVALID (caused by auth.SignIn)'), {
      errorMessage: 'BAD_REQUEST',
    });
    expect(telegramMtprotoCode(err)).toBe('PHONE_CODE_INVALID');
    expect(formatTelegramError(err, '실패')).toBe('인증 코드가 올바르지 않습니다.');
  });

  it('reads FLOOD_WAIT seconds from the message', () => {
    const err = Object.assign(new Error('420: FLOOD_WAIT_32 (caused by messages.SendMessage)'), {
      errorMessage: 'FLOOD',
    });
    expect(formatTelegramError(err, '실패')).toBe('요청이 많습니다. 32초 후 다시 시도하세요.');
  });
});

describe('isTelegramSessionDead', () => {
  it('treats revoked auth as a dead session even when errorMessage is generic', () => {
    const err = Object.assign(new Error('401: AUTH_KEY_UNREGISTERED (caused by updates.GetState)'), {
      errorMessage: 'UNAUTHORIZED',
    });
    expect(isTelegramSessionDead(err)).toBe(true);
    expect(formatTelegramError(err, '실패')).toBe('이 기기의 Telegram 세션이 만료되었습니다. 다시 로그인하세요.');
  });

  it('leaves network failures on the saved session', () => {
    expect(isTelegramSessionDead(new Error('WebSocket was closed'))).toBe(false);
  });
});

describe('formatTelegramError', () => {
  it('explains an externalized Node module', () => {
    const err = new Error('Module "util" has been externalized for browser compatibility.');
    expect(formatTelegramError(err, '실패')).toBe('이 환경에서 Node 모듈 "util"을 사용할 수 없습니다.');
  });

  it('keeps login cancellation and falls back when the error is empty', () => {
    expect(formatTelegramError(new Error('Telegram login cancelled'), '실패')).toBe('Telegram login cancelled');
    expect(formatTelegramError(new Error('   '), '실패')).toBe('실패');
  });

  it('clips long unknown messages', () => {
    const err = new Error('x'.repeat(200));
    const text = formatTelegramError(err, '실패');
    expect(text.endsWith('…')).toBe(true);
    expect(text.length).toBe(180);
  });
});
