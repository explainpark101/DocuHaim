import { useState } from 'react';
import { ExternalLink, KeyRound, LogIn, Smartphone } from 'lucide-react';
import { Form, Tabs } from 'radix-ui';
import Modal from '@/components/modals/Modal';
import Button from '@/components/Button';
import { IconX } from '@/components/icons';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { openDesktopExternalUrl } from '@/utils/shared/initDesktopExternalLinks';
import type { TelegramApiCredentialInput } from '@/utils/telegram/telegramApiCredentials';
import type { TelegramConnectionStatus } from '@/utils/telegram/types';

type TelegramLoginModalProps = {
  status: TelegramConnectionStatus;
  error: string | null;
  loginHint: string | null;
  codeViaApp: boolean;
  onSubmitField: (value: string) => void;
  onSubmitApi: (input: TelegramApiCredentialInput) => void;
  onRequestSms: () => void;
  onClose: () => void;
};

const TAB_TRIGGER_CLASS =
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 text-xs font-medium outline-none transition data-[state=inactive]:text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=inactive]:text-odp-muted dark:data-[state=active]:text-white';

const LABEL_CLASS = 'block text-xs font-semibold text-gray-600 dark:text-odp-muted';
const INPUT_CLASS =
  'mt-1 w-full rounded border px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft';

const PHONE_LINKS = [
  { href: 'https://telegram.org/tos', label: 'Telegram 이용 약관' },
  { href: 'https://core.telegram.org/api/terms', label: 'API 이용 약관' },
] as const;

const API_LINKS = [
  { href: 'https://my.telegram.org/auth?to=apps', label: 'my.telegram.org 로그인' },
  { href: 'https://my.telegram.org/apps', label: 'API development tools' },
  { href: 'https://core.telegram.org/api/obtaining_api_id', label: 'API ID 안내' },
  { href: 'https://core.telegram.org/api/terms', label: 'API 이용 약관' },
] as const;

function openShortcut(href: string): void {
  if (!isDesktopApp()) {
    window.open(href, '_blank', 'noopener,noreferrer');
    return;
  }
  void openDesktopExternalUrl(href);
}

function ShortcutLinks({ links }: { links: ReadonlyArray<{ href: string; label: string }> }) {
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => (
        <Button
          key={link.href}
          type="button"
          variant="tertiary"
          className="justify-start px-2"
          onClick={() => openShortcut(link.href)}
        >
          <ExternalLink size={14} />
          {link.label}
        </Button>
      ))}
    </div>
  );
}

export default function TelegramLoginModal({
  status,
  error,
  loginHint,
  codeViaApp,
  onSubmitField,
  onSubmitApi,
  onRequestSms,
  onClose,
}: TelegramLoginModalProps) {
  const [value, setValue] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tab, setTab] = useState<'phone' | 'api'>('phone');
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [apiPhone, setApiPhone] = useState('');
  const naming = status === 'need-name';
  const chooseMethod = status === 'need-phone';
  const title =
    status === 'need-phone'
      ? 'Telegram'
      : status === 'need-code'
        ? '확인 코드'
        : naming
          ? '이름'
          : '2단계 비밀번호';

  const footer = (
    <footer className="flex shrink-0 justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
      <Button type="button" variant="secondary" onClick={onClose}>
        <IconX size={14} />
        닫기
      </Button>
      <Button type="submit" variant="primary">
        <LogIn size={14} />
        계속
      </Button>
    </footer>
  );

  const phoneFields = (
    <>
      {naming ? (
        <>
          <label className={LABEL_CLASS}>
            이름
            <input
              className={INPUT_CLASS}
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </label>
          <label className={LABEL_CLASS}>
            성
            <input
              className={INPUT_CLASS}
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </>
      ) : (
        <label className={LABEL_CLASS}>
          {status === 'need-phone' ? '전화번호' : title}
          <input
            className={INPUT_CLASS}
            type={status === 'need-password' ? 'password' : 'text'}
            inputMode={status === 'need-phone' ? 'tel' : status === 'need-code' ? 'numeric' : undefined}
            autoComplete={status === 'need-code' ? 'one-time-code' : 'off'}
            placeholder={status === 'need-phone' ? '+821012345678' : undefined}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
      )}
      {status === 'need-phone' ? <ShortcutLinks links={PHONE_LINKS} /> : null}
      {loginHint ? <p className="text-xs text-gray-600 dark:text-odp-muted">{loginHint}</p> : null}
      {status === 'need-code' && codeViaApp ? (
        <Button type="button" variant="tertiary" onClick={onRequestSms}>
          <Smartphone size={14} />
          문자로 다시 받기
        </Button>
      ) : null}
      {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
    </>
  );

  return (
    <Modal isOpen contentClassName="max-w-md max-h-[90vh]" onClose={onClose}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-gray-200 px-6 py-4 dark:border-odp-borderSoft">
          <h2 className="text-base font-semibold text-gray-900 dark:text-odp-fgStrong">{title}</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-odp-muted">
            {chooseMethod
              ? '번호를 확인하거나, my.telegram.org에서 받은 API ID와 API Hash를 직접 입력할 수 있습니다. 로그인하면 Telegram 이용 약관에 동의하게 됩니다.'
              : '휴대폰 번호를 입력하면 Telegram 서버가 확인합니다. 확인이 끝나면 이 기기에 자동으로 저장됩니다. 로그인하면 Telegram 이용 약관에 동의하게 됩니다.'}
          </p>
        </header>
        {chooseMethod ? (
          <Tabs.Root
            value={tab}
            onValueChange={(next) => setTab(next === 'api' ? 'api' : 'phone')}
            className="flex min-h-0 flex-1 flex-col"
          >
            <Tabs.List className="mx-6 mt-3 flex shrink-0 gap-1 rounded-md border border-gray-200 p-0.5 dark:border-odp-borderSoft">
              <Tabs.Trigger value="phone" className={TAB_TRIGGER_CLASS}>
                <Smartphone size={13} aria-hidden />
                전화번호
              </Tabs.Trigger>
              <Tabs.Trigger value="api" className={TAB_TRIGGER_CLASS}>
                <KeyRound size={13} aria-hidden />
                API 키 입력
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="phone" className="flex min-h-0 flex-1 flex-col outline-none">
              <form
                className="flex min-h-0 flex-1 flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmitField(value);
                  setValue('');
                }}
              >
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">{phoneFields}</div>
                {footer}
              </form>
            </Tabs.Content>
            <Tabs.Content value="api" className="flex min-h-0 flex-1 flex-col outline-none">
              <Form.Root
                className="flex min-h-0 flex-1 flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                  onSubmitApi({ apiId, apiHash, phone: apiPhone });
                }}
              >
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
                  <p className="text-xs text-gray-600 dark:text-odp-muted">
                    my.telegram.org의 API development tools에 있는 App api_id와 App api_hash입니다. 이 기기에만 저장됩니다.
                  </p>
                  <ShortcutLinks links={API_LINKS} />
                  <Form.Field name="apiId" className={LABEL_CLASS}>
                    <Form.Label>API ID</Form.Label>
                    <Form.Control asChild>
                      <input
                        className={INPUT_CLASS}
                        inputMode="numeric"
                        autoComplete="off"
                        value={apiId}
                        onChange={(event) => setApiId(event.target.value)}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field name="apiHash" className={LABEL_CLASS}>
                    <Form.Label>API Hash</Form.Label>
                    <Form.Control asChild>
                      <input
                        className={`${INPUT_CLASS} font-mono`}
                        autoComplete="off"
                        spellCheck={false}
                        value={apiHash}
                        onChange={(event) => setApiHash(event.target.value)}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Field name="phone" className={LABEL_CLASS}>
                    <Form.Label>전화번호</Form.Label>
                    <Form.Control asChild>
                      <input
                        className={INPUT_CLASS}
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+821012345678"
                        value={apiPhone}
                        onChange={(event) => setApiPhone(event.target.value)}
                      />
                    </Form.Control>
                  </Form.Field>
                  {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
                </div>
                {footer}
              </Form.Root>
            </Tabs.Content>
          </Tabs.Root>
        ) : (
          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              if (naming) {
                onSubmitField(`${firstName.trim()}\n${lastName.trim()}`);
                return;
              }
              onSubmitField(value);
              setValue('');
            }}
          >
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">{phoneFields}</div>
            {footer}
          </form>
        )}
      </div>
    </Modal>
  );
}
