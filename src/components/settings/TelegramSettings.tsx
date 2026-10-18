import { useEffect, useState } from 'react';
import { ExternalLink, LogOut } from 'lucide-react';
import Button from '@/components/Button';
import { settingsSectionCardClass } from '@/utils/settingsSectionCard';
import { isDesktopApp } from '@/utils/isDesktopApp';
import { openDesktopExternalUrl } from '@/utils/shared/initDesktopExternalLinks';
import { isTelegramShell } from '@/utils/telegram/telegramPlatform';
import { loadTelegramSession } from '@/utils/telegram/sessionStore';
import { logoutTelegram } from '@/utils/telegram/telegramClient';

const TELEGRAM_LINKS = [
  { href: 'https://my.telegram.org/auth?to=apps', label: 'my.telegram.org 로그인' },
  { href: 'https://my.telegram.org/apps', label: 'API development tools' },
  { href: 'https://core.telegram.org/api/obtaining_api_id', label: 'API ID 안내' },
  { href: 'https://telegram.org/tos', label: 'Telegram 이용 약관' },
  { href: 'https://core.telegram.org/api/terms', label: 'API 이용 약관' },
] as const;

function openShortcut(href: string): void {
  if (!isDesktopApp()) {
    window.open(href, '_blank', 'noopener,noreferrer');
    return;
  }
  void openDesktopExternalUrl(href);
}

export default function TelegramSettings() {
  const shell = isTelegramShell();
  const [hasSession, setHasSession] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!shell) return undefined;
    let cancelled = false;
    void loadTelegramSession().then((stored) => {
      if (cancelled || !stored) return;
      setHasSession(Boolean(stored.session));
    });
    return () => {
      cancelled = true;
    };
  }, [shell]);

  return (
    <section id="settings-telegram" className={settingsSectionCardClass('sky')} aria-label="Telegram">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-odp-fgStrong">Telegram</h3>
      <p className="text-xs text-gray-600 dark:text-odp-muted">
        휴대폰 번호를 입력하면 Telegram 서버가 확인하고, 연결 정보와 로그인 세션은 이 기기의
        Stronghold에만 저장됩니다. 로그인하면 Telegram 이용 약관에 동의하는 것입니다.
      </p>
      <div className="flex flex-col gap-1">
        {TELEGRAM_LINKS.map((link) => (
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
      {shell ? (
        <>
          <p className="text-xs text-gray-600 dark:text-odp-muted">
            {hasSession
              ? '이 기기에 로그인되어 있습니다.'
              : '아직 로그인하지 않았습니다. Telegram 화면에서 휴대폰 번호를 확인하거나 API ID와 API Hash를 직접 입력하세요.'}
          </p>
          {notice ? <p className="text-xs text-sky-800 dark:text-sky-200">{notice}</p> : null}
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                void logoutTelegram().then(() => {
                  setHasSession(false);
                  setNotice('이 기기에서 로그아웃했습니다.');
                });
              }}
            >
              <LogOut size={14} />
              로그아웃
            </Button>
          </div>
        </>
      ) : (
        <p className="text-xs text-gray-600 dark:text-odp-muted">
          데스크톱 또는 Android 앱에서만 연결할 수 있습니다.
        </p>
      )}
    </section>
  );
}
