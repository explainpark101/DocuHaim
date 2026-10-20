const SAFE_ERROR_MAX = 180;

const GENERIC_CODES = new Set([
  'BAD_REQUEST',
  'FLOOD',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'AUTH_KEY',
  'INTERNAL',
  'Timeout',
  'ERROR_SEE_OTHER',
]);

const SESSION_DEAD_CODES = new Set([
  'AUTH_KEY_UNREGISTERED',
  'AUTH_KEY_INVALID',
  'SESSION_REVOKED',
  'SESSION_EXPIRED',
  'USER_DEACTIVATED',
  'USER_DEACTIVATED_BAN',
]);

type ErrorLike = {
  message?: string;
  errorMessage?: string;
};

function clip(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length <= SAFE_ERROR_MAX) return trimmed;
  return `${trimmed.slice(0, SAFE_ERROR_MAX - 1)}…`;
}

function asErrorLike(err: unknown): ErrorLike {
  if (typeof err === 'string') return { message: err };
  if (!err || typeof err !== 'object') return {};
  const rec = err as ErrorLike;
  return {
    ...(typeof rec.message === 'string' ? { message: rec.message } : {}),
    ...(typeof rec.errorMessage === 'string' ? { errorMessage: rec.errorMessage } : {}),
  };
}

function codeFromText(text: string): string {
  return text.match(/\b([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)\b/)?.[1] ?? '';
}

/** MTProto code from `Error.message`, then a non-generic `errorMessage`. */
export function telegramMtprotoCode(err: unknown): string {
  const like = asErrorLike(err);
  const fromMessage = like.message ? codeFromText(like.message) : '';
  if (fromMessage && !GENERIC_CODES.has(fromMessage)) return fromMessage;
  const fromField = like.errorMessage ?? '';
  if (fromField && !GENERIC_CODES.has(fromField)) return fromField;
  return fromMessage || fromField;
}

export function isTelegramSessionDead(err: unknown): boolean {
  return SESSION_DEAD_CODES.has(telegramMtprotoCode(err));
}

function mapCode(code: string): string {
  if (code === 'PHONE_CODE_INVALID') return '인증 코드가 올바르지 않습니다.';
  if (code === 'PHONE_CODE_EXPIRED') return '인증 코드가 만료되었습니다. 전화번호를 다시 입력하세요.';
  if (code === 'PHONE_NUMBER_INVALID') return '전화번호는 국가 코드를 포함해 입력하세요. 예: +821012345678';
  if (code === 'PHONE_NUMBER_BANNED' || code === 'PHONE_NUMBER_FLOOD') {
    return '이 번호로는 지금 로그인할 수 없습니다.';
  }
  if (code === 'PASSWORD_HASH_INVALID') return '2단계 비밀번호가 올바르지 않습니다.';
  const flood = /^FLOOD_WAIT_(\d+)$/.exec(code);
  if (flood?.[1]) return `요청이 많습니다. ${flood[1]}초 후 다시 시도하세요.`;
  if (code === 'FLOOD_WAIT' || code === 'FLOOD') return '요청이 많습니다. 잠시 후 다시 시도하세요.';
  if (
    code === 'AUTH_KEY_UNREGISTERED'
    || code === 'AUTH_KEY_INVALID'
    || code === 'SESSION_REVOKED'
    || code === 'SESSION_EXPIRED'
  ) {
    return '이 기기의 Telegram 세션이 만료되었습니다. 다시 로그인하세요.';
  }
  if (code === 'USER_DEACTIVATED' || code === 'USER_DEACTIVATED_BAN') {
    return '이 계정으로는 로그인할 수 없습니다.';
  }
  if (code === 'PEER_ID_INVALID') return '대화를 찾을 수 없습니다.';
  if (code === 'CHAT_WRITE_FORBIDDEN' || code === 'USER_BANNED_IN_CHANNEL') {
    return '이 대화에는 메시지를 보낼 수 없습니다.';
  }
  if (code === 'CHANNEL_PRIVATE') return '비공개 채널이라 열 수 없습니다.';
  if (code === 'MESSAGE_ID_INVALID') return '메시지를 찾을 수 없습니다.';
  if (code === 'FILE_REFERENCE_EXPIRED' || code === 'MEDIA_EMPTY') {
    return '파일을 받지 못했습니다. 다시 시도하세요.';
  }
  if (code === 'RESTART_AUTH') return '문자로 인증 코드를 다시 요청합니다.';
  return '';
}

export function formatTelegramError(err: unknown, fallback: string): string {
  const like = asErrorLike(err);
  const message = like.message ?? '';
  const mapped = mapCode(telegramMtprotoCode(err));
  if (mapped) return clip(mapped);
  const external = message.match(/Module "([^"]+)" has been externalized/);
  const moduleName = external?.[1];
  if (moduleName) return clip(`이 환경에서 Node 모듈 "${moduleName}"을 사용할 수 없습니다.`);
  if (message === 'Code is empty' || message === 'Password is empty') return '값을 입력하세요.';
  if (message === 'First name is required') return '이름을 입력하세요.';
  if (message === 'Telegram login cancelled') return message;
  if (message.trim()) return clip(message.trim());
  return fallback;
}
