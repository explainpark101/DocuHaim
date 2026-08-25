import { useCallback, useEffect, useState } from 'react';
import { RadioGroup } from 'radix-ui';
import { IconFingerprint, IconKey, IconLock } from '@/components/icons';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { getWebAuthnEncryptLabel } from '@/utils/webauthnLabel';
import { isDesktopApp } from '@/utils/isDesktopApp';
import {
  disableDesktopAppEntryLock,
  enableDesktopBiometricEntryLock,
  enableDesktopPasswordEntryLock,
  formatEntryLockError,
  resolveDesktopAppEntryLockMode,
  type DesktopAppEntryLockMode,
} from '@/utils/desktopAppEntryLock';
import { isDesktopBiometricAvailable } from '@/utils/desktopBiometricUnlock';
import { isBiometricUserCancelError } from '@/utils/tauriBiometricLock';
import { SetPasswordModal } from '@/components/modals/SetPasswordModal';
import { ConfirmModal } from '@/components/modals/ConfirmModal';

const ENTRY_LOCK_LOADING_TOAST = '암호설정 불러오는 중';

type DesktopAppEntryLockSettingsProps = {
  s3Creds: Record<string, unknown>;
  webdavConfig?: {
    endpoint?: string;
    username?: string;
    password?: string;
    basePath?: string;
  };
  onModeChanged?: (mode: DesktopAppEntryLockMode) => void;
};

const MODE_OPTIONS: Array<{
  value: DesktopAppEntryLockMode;
  label: string;
  description: string;
  icon: typeof IconLock;
}> = [
  {
    value: 'off',
    label: '사용 안 함',
    description: '앱을 열면 저장된 연결 정보를 바로 불러옵니다.',
    icon: IconLock,
  },
  {
    value: 'password',
    label: '비밀번호',
    description: '앱 입장 시 마스터 비밀번호를 입력합니다.',
    icon: IconKey,
  },
  {
    value: 'biometric',
    label: '생체 인증',
    description: 'Touch ID, Windows Hello 등으로 앱을 잠금 해제합니다.',
    icon: IconFingerprint,
  },
];

export default function DesktopAppEntryLockSettings({
  s3Creds,
  webdavConfig,
  onModeChanged,
}: DesktopAppEntryLockSettingsProps) {
  const { lock: lockApp } = useAuth() as { lock: () => void };
  const { showToast, dismissToast } = useToast();
  const [mode, setMode] = useState<DesktopAppEntryLockMode>('off');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [busy, setBusy] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [disableConfirmOpen, setDisableConfirmOpen] = useState(false);
  const biometricLabel = getWebAuthnEncryptLabel();

  const withLoadingToast = useCallback(
    async <T,>(task: () => Promise<T>): Promise<T> => {
      showToast({ message: ENTRY_LOCK_LOADING_TOAST, icon: 'loading', durationMs: 0 });
      try {
        return await task();
      } finally {
        dismissToast();
      }
    },
    [dismissToast, showToast],
  );

  useEffect(() => {
    if (!isDesktopApp()) return;
    let cancelled = false;
    void (async () => {
      try {
        const [resolved, bio] = await withLoadingToast(() =>
          Promise.all([resolveDesktopAppEntryLockMode(), isDesktopBiometricAvailable()]),
        );
        if (cancelled) return;
        setMode(resolved);
        setBiometricAvailable(bio);
      } catch {
        if (!cancelled) {
          setMode('off');
          setBiometricAvailable(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [withLoadingToast]);

  if (!isDesktopApp()) return null;

  const applyMode = async (next: DesktopAppEntryLockMode) => {
    if (busy || next === mode) return;
    setBusy(true);
    try {
      if (next === 'off') {
        await withLoadingToast(() => disableDesktopAppEntryLock(s3Creds, webdavConfig));
      } else if (next === 'password') {
        setPasswordModalOpen(true);
        return;
      } else {
        await withLoadingToast(() => enableDesktopBiometricEntryLock(s3Creds));
      }
      setMode(next);
      onModeChanged?.(next);
    } catch (err) {
      if (next === 'biometric' && isBiometricUserCancelError(err)) return;
      alert(formatEntryLockError(err, '입장 잠금 설정에 실패했습니다.'));
    } finally {
      setBusy(false);
    }
  };

  const handlePasswordSubmit = async (password: string) => {
    setBusy(true);
    try {
      await withLoadingToast(() =>
        enableDesktopPasswordEntryLock(password, s3Creds, webdavConfig),
      );
      setMode('password');
      onModeChanged?.('password');
      setPasswordModalOpen(false);
    } catch (err) {
      alert(formatEntryLockError(err, '비밀번호 잠금 설정에 실패했습니다.'));
    } finally {
      setBusy(false);
    }
  };

  const handleDisableConfirm = async () => {
    setDisableConfirmOpen(false);
    setBusy(true);
    try {
      await withLoadingToast(() => disableDesktopAppEntryLock(s3Creds, webdavConfig));
      setMode('off');
      onModeChanged?.('off');
    } catch (err) {
      alert(formatEntryLockError(err, '입장 잠금 해제에 실패했습니다.'));
    } finally {
      setBusy(false);
    }
  };

  const handleManualLock = () => {
    if (mode !== 'password' || busy) return;
    lockApp();
  };

  return (
    <>
      <div
        id="settings-desktop-entry-lock"
        tabIndex={-1}
        className="scroll-mt-4 rounded-lg border border-blue-200 bg-blue-50/70 p-4 dark:border-blue-900/60 dark:bg-blue-950/30"
      >
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="flex min-w-0 items-center gap-2 text-sm font-bold text-gray-700 dark:text-odp-fgStrong">
            <IconLock size={16} />
            앱 입장 잠금 (Tauri)
          </h3>
          {mode === 'password' ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="shrink-0"
              disabled={busy}
              onClick={handleManualLock}
              aria-label="앱 잠금"
            >
              <IconLock size={14} />
              잠금
            </Button>
          ) : null}
        </div>
        <p className="mb-3 text-xs leading-relaxed text-gray-600 dark:text-odp-muted">
          데스크톱 앱을 열 때 비밀번호 또는 {biometricLabel}로 잠금 해제할 수 있습니다. 앱을
          새로 켜거나 잠금 버튼을 눌렀을 때만 인증이 필요합니다.
        </p>

        <RadioGroup.Root
          value={mode}
          onValueChange={(value) => {
            const next = value as DesktopAppEntryLockMode;
            if (next === 'off' && mode !== 'off') {
              setDisableConfirmOpen(true);
              return;
            }
            void applyMode(next);
          }}
          className="space-y-2"
          disabled={busy}
        >
          {MODE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const disabled =
              option.value === 'biometric' && !biometricAvailable;
            const label =
              option.value === 'biometric' && biometricAvailable
                ? biometricLabel
                : option.label;
            const description =
              option.value === 'biometric' && biometricAvailable
                ? `${biometricLabel}로 앱을 잠금 해제합니다.`
                : option.description;

            return (
              <label
                key={option.value}
                className={[
                  'flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition',
                  mode === option.value
                    ? 'border-blue-400 bg-white shadow-sm dark:border-blue-500 dark:bg-odp-bgSoft'
                    : 'border-gray-200 bg-white/70 dark:border-odp-borderStrong dark:bg-odp-surface/60',
                  disabled ? 'cursor-not-allowed opacity-50' : 'hover:border-blue-300',
                ].join(' ')}
              >
                <RadioGroup.Item
                  value={option.value}
                  disabled={disabled || busy}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-400 bg-white outline-none data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:border-odp-borderStrong dark:bg-odp-bgSoft"
                  aria-label={label}
                >
                  <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white" />
                </RadioGroup.Item>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-odp-fg">
                    <Icon size={14} />
                    {label}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-gray-500 dark:text-odp-muted">
                    {description}
                  </span>
                  {disabled && (
                    <span className="mt-1 block text-[11px] text-amber-700 dark:text-amber-300">
                      이 기기에서는 생체 인증을 사용할 수 없습니다.
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </RadioGroup.Root>

        {mode !== 'off' && (
          <p className="mt-3 text-[11px] text-gray-500 dark:text-odp-muted">
            {mode === 'password'
              ? '비밀번호 모드가 켜져 있습니다. 앱을 다시 열 때 비밀번호가 필요합니다.'
              : `${biometricLabel} 모드가 켜져 있습니다.`}
          </p>
        )}
      </div>

      <SetPasswordModal
        isOpen={passwordModalOpen}
        masterPassword=""
        onCancel={() => {
          setPasswordModalOpen(false);
        }}
        onSubmit={(password: string) => {
          void handlePasswordSubmit(password);
        }}
      />

      <ConfirmModal
        isOpen={disableConfirmOpen}
        title="입장 잠금 해제"
        message="앱 입장 잠금을 끄면 다음 실행부터 비밀번호·생체 인증 없이 연결 정보를 불러옵니다."
        confirmLabel="사용 해제"
        cancelLabel="취소"
        variant="danger"
        onConfirm={() => {
          void handleDisableConfirm();
        }}
        onCancel={() => setDisableConfirmOpen(false)}
      />
    </>
  );
}
