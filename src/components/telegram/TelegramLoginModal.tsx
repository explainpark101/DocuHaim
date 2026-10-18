import { useState } from 'react';
import { KeyRound, LogIn, Smartphone } from 'lucide-react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconX } from '@/components/icons';
import type { TelegramConnectionStatus } from '@/utils/telegram/types';

type TelegramLoginModalProps = {
  status: TelegramConnectionStatus;
  error: string | null;
  loginHint: string | null;
  codeViaApp: boolean;
  onSubmitCredentials: (apiId: number, apiHash: string) => void;
  onSubmitField: (value: string) => void;
  onRequestSms: () => void;
  onClose: () => void;
};

export default function TelegramLoginModal({
  status,
  error,
  loginHint,
  codeViaApp,
  onSubmitCredentials,
  onSubmitField,
  onRequestSms,
  onClose,
}: TelegramLoginModalProps) {
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [value, setValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const credentials = status === 'need-credentials';
  const naming = status === 'need-name';
  const title = credentials
    ? 'Telegram API 자격 증명'
    : status === 'need-phone'
      ? '전화번호'
      : status === 'need-code'
        ? '로그인 코드'
        : naming
          ? '이름'
          : '2단계 비밀번호';

  return (
    <Modal isOpen contentClassName="max-w-md max-h-[90vh]" onClose={onClose}>
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          if (credentials) {
            onSubmitCredentials(Number(apiId), apiHash);
            return;
          }
          if (naming) {
            onSubmitField(`${firstName.trim()}\n${lastName.trim()}`);
            return;
          }
          onSubmitField(value);
          setValue('');
        }}
      >
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">{title}</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            전화번호, 인증 코드, 2단계 비밀번호는 이 화면에서 입력합니다. 로그인하면 Telegram 이용
            약관에 동의하게 됩니다.
          </p>
        </header>
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
          {credentials ? (
            <>
              <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                api_id
                <input
                  className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  inputMode="numeric"
                  autoComplete="off"
                  value={apiId}
                  onChange={(event) => setApiId(event.target.value)}
                />
              </label>
              <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                api_hash
                <input
                  className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  type="password"
                  autoComplete="off"
                  value={apiHash}
                  onChange={(event) => setApiHash(event.target.value)}
                />
              </label>
            </>
          ) : naming ? (
            <>
              <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                이름
                <input
                  className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </label>
              <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
                성
                <input
                  className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </label>
            </>
          ) : (
            <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
              {title}
              <input
                className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                type={status === 'need-password' ? 'password' : 'text'}
                inputMode={status === 'need-phone' ? 'tel' : status === 'need-code' ? 'numeric' : undefined}
                autoComplete={status === 'need-code' ? 'one-time-code' : 'off'}
                placeholder={status === 'need-phone' ? '+821012345678' : undefined}
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </label>
          )}
          {loginHint ? <p className="text-xs text-gray-600 dark:text-odp-muted">{loginHint}</p> : null}
          {status === 'need-code' && codeViaApp ? (
            <Button type="button" variant="tertiary" onClick={onRequestSms}>
              <Smartphone size={14} />
              문자로 다시 받기
            </Button>
          ) : null}
          {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
        </div>
        <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <Button type="button" variant="secondary" onClick={onClose}>
            <IconX size={14} />
            닫기
          </Button>
          <Button type="submit" variant="primary">
            {credentials ? <KeyRound size={14} /> : <LogIn size={14} />}
            계속
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
