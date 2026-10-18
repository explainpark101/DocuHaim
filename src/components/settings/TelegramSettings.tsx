import { useEffect, useState } from 'react';
import { LogOut, Save } from 'lucide-react';
import Button from '@/components/Button';
import { settingsSectionCardClass } from '@/utils/settingsSectionCard';
import { isTelegramShell } from '@/utils/telegram/telegramPlatform';
import { clearTelegramSession, loadTelegramSession, saveTelegramSession } from '@/utils/telegram/sessionStore';
import { logoutTelegram } from '@/utils/telegram/telegramClient';

export default function TelegramSettings() {
  const shell = isTelegramShell();
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [hasSession, setHasSession] = useState(false);
  const [hasHash, setHasHash] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!shell) return undefined;
    let cancelled = false;
    void loadTelegramSession().then((stored) => {
      if (cancelled || !stored) return;
      setApiId(String(stored.apiId));
      setHasHash(true);
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
        본인의 api_id / api_hash만 사용합니다. 자격 증명은 앱에 포함되지 않으며, 세션은 Stronghold에만
        저장됩니다. 연결하면 Telegram 이용 약관에 동의하는 것입니다.
      </p>
      {shell ? (
        <>
          <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            api_id
            <input
              className="mt-1 w-full rounded border bg-white/80 px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              inputMode="numeric"
              autoComplete="off"
              value={apiId}
              onChange={(event) => setApiId(event.target.value)}
            />
          </label>
          <label className="block text-xs font-semibold text-gray-600 dark:text-odp-muted">
            api_hash
            <input
              className="mt-1 w-full rounded border bg-white/80 px-3 py-2 text-sm dark:border-odp-borderStrong dark:bg-odp-bgSoft"
              type="password"
              autoComplete="off"
              value={apiHash}
              placeholder={hasHash ? '저장됨 — 변경 시 새 값 입력' : ''}
              onChange={(event) => setApiHash(event.target.value)}
            />
          </label>
          <p className="text-xs text-gray-600 dark:text-odp-muted">
            {hasSession
              ? '로그인 세션이 있습니다.'
              : '아직 로그인하지 않았습니다. Telegram 화면에서 전화번호와 인증 코드를 입력하세요. 코드는 문자로 요청합니다.'}
          </p>
          {notice ? <p className="text-xs text-sky-800 dark:text-sky-200">{notice}</p> : null}
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                void logoutTelegram().then(() => {
                  setHasSession(false);
                  setNotice('로그아웃했습니다.');
                });
              }}
            >
              <LogOut size={14} />
              로그아웃
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                const id = Number(apiId);
                const hash = apiHash.trim();
                if (!Number.isFinite(id) || id <= 0 || (!hash && !hasHash)) {
                  setNotice('api_id와 api_hash를 입력하세요.');
                  return;
                }
                void (async () => {
                  const prev = await loadTelegramSession();
                  const nextHash = hash || prev?.apiHash || '';
                  const keepSession = Boolean(prev && prev.apiId === id && prev.apiHash === nextHash && prev.session);
                  await saveTelegramSession({
                    apiId: id,
                    apiHash: nextHash,
                    session: keepSession ? prev!.session : '',
                  });
                  setHasHash(true);
                  setHasSession(keepSession);
                  setApiHash('');
                  setNotice('저장했습니다. Telegram 화면에서 로그인하세요.');
                })();
              }}
            >
              <Save size={14} />
              저장
            </Button>
          </div>
        </>
      ) : (
        <p className="text-xs text-gray-600 dark:text-odp-muted">
          데스크톱 또는 Android 앱에서만 연결할 수 있습니다.
        </p>
      )}
      <p className="text-xs text-gray-500 dark:text-odp-muted">
        API 자격 증명은{' '}
        <a
          href="https://my.telegram.org"
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 underline dark:text-sky-300"
        >
          my.telegram.org
        </a>
        에서 발급합니다. 로그아웃하지 않은 세션을 지울 때는 아래를 사용하지 말고 로그아웃을 누르세요.
      </p>
      {shell && hasHash && !hasSession ? (
        <Button
          type="button"
          variant="tertiary"
          onClick={() => {
            void clearTelegramSession().then(() => {
              setHasHash(false);
              setApiId('');
              setNotice('저장된 자격 증명을 지웠습니다.');
            });
          }}
        >
          <LogOut size={14} />
          자격 증명 지우기
        </Button>
      ) : null}
    </section>
  );
}
