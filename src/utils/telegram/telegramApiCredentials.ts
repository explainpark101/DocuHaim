export type TelegramApiCredentialInput = {
  apiId: string;
  apiHash: string;
  phone: string;
};

export type TelegramApiCredentials = {
  apiId: number;
  apiHash: string;
  phone: string;
};

const API_ID_MAX = 2_147_483_647;

export function parseTelegramApiCredentials(
  input: TelegramApiCredentialInput,
): { ok: true; value: TelegramApiCredentials } | { ok: false; error: string } {
  const apiIdText = input.apiId.trim();
  if (!/^\d+$/.test(apiIdText)) {
    return { ok: false, error: 'API ID는 숫자입니다.' };
  }
  const apiId = Number(apiIdText);
  if (!Number.isSafeInteger(apiId) || apiId <= 0 || apiId > API_ID_MAX) {
    return { ok: false, error: 'API ID는 숫자입니다.' };
  }

  const apiHash = input.apiHash.trim().toLowerCase();
  if (!/^[a-f0-9]{32}$/.test(apiHash)) {
    return { ok: false, error: 'API Hash는 32자리 영문과 숫자입니다.' };
  }

  const phone = input.phone.replace(/[\s-]/g, '');
  if (!phone.startsWith('+') || phone.length < 8 || !/^\+\d+$/.test(phone)) {
    return { ok: false, error: '전화번호는 국가 코드를 포함해 입력하세요. 예: +821012345678' };
  }

  return { ok: true, value: { apiId, apiHash, phone } };
}
