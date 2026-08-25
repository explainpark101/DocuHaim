import { useState, useEffect } from 'react';
import { IconLock, IconFingerprint } from '@/components/icons';
import { getWebAuthnEncryptLabel } from '@/utils/webauthnLabel';
import { isDesktopApp } from '@/utils/isDesktopApp';
import Modal from '@/components/modals/Modal';

export function AuthModal({ isOpen, onUnlock, onUnlockWithWebAuthn, onCloseWithoutUnlock, canUnlockWithWebAuthn, isPasswordMode = true, autoPromptWebAuthn = true, fileInputRef }) {
  const [webauthnLoading, setWebauthnLoading] = useState(false);
  const webauthnLabel = getWebAuthnEncryptLabel();

  // Auto-prompt on open (web / legacy). Tauri entry lock requires an explicit button tap.
  useEffect(() => {
    if (!autoPromptWebAuthn || !isOpen || !canUnlockWithWebAuthn || !onUnlockWithWebAuthn) return;
    const timer = setTimeout(() => {
      setWebauthnLoading(true);
      let promise;
      try {
        promise = onUnlockWithWebAuthn();
      } catch (e) {
        setWebauthnLoading(false);
        if (e?.message && !/cancel|abort|user|denied|dismissed/i.test(String(e.message))) {
          alert(e?.message || `${webauthnLabel} 인증에 실패했습니다.`);
        }
        return;
      }
      Promise.resolve(promise)
        .catch((e) => {
          if (e?.message && !/cancel|abort|user|denied|dismissed/i.test(String(e.message))) {
            alert(e?.message || `${webauthnLabel} 인증에 실패했습니다.`);
          }
        })
        .finally(() => setWebauthnLoading(false));
    }, isDesktopApp() ? 400 : 300);
    return () => clearTimeout(timer);
  }, [autoPromptWebAuthn, isOpen, canUnlockWithWebAuthn, onUnlockWithWebAuthn, webauthnLabel]);

  // Safari: startAuthentication must run in native click context with no async work before it.
  // Call WebAuthn flow first (sync until credentials.get), then set loading and await.
  const handleWebAuthnUnlock = async () => {
    if (!onUnlockWithWebAuthn || !canUnlockWithWebAuthn) return;
    let promise;
    try {
      promise = onUnlockWithWebAuthn();
    } catch (e) {
      alert(e?.message || `${webauthnLabel} 인증에 실패했습니다.`);
      return;
    }
    setWebauthnLoading(true);
    try {
      await promise;
    } catch (e) {
      alert(e?.message || `${webauthnLabel} 인증에 실패했습니다.`);
    } finally {
      setWebauthnLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseWithoutUnlock}>
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <IconLock size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-odp-fgStrong mb-2">저장소 잠금 해제</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {canUnlockWithWebAuthn
            ? `등록한 ${webauthnLabel}로 해제하거나, 아래에서 백업 파일을 불러오세요.`
            : '마스터 비밀번호를 입력하거나, 아래에서 백업 파일을 불러오세요.'}
        </p>

        {canUnlockWithWebAuthn && (
          <button
            type="button"
            onClick={handleWebAuthnUnlock}
            disabled={webauthnLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition shadow-sm mb-4"
            aria-label={`${webauthnLabel}(으)로 잠금 해제`}
          >
            <IconFingerprint className="w-5 h-5 shrink-0" />
            {webauthnLoading ? '인증 중…' : `${webauthnLabel}(으)로 잠금 해제`}
          </button>
        )}

        {isPasswordMode && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUnlock(e.target.password.value);
            }}
          >
            <input
              type="password"
              name="password"
              required
              autoFocus={!canUnlockWithWebAuthn}
              placeholder="마스터 비밀번호"
              className="w-full border border-gray-300 dark:border-odp-borderStrong bg-white dark:bg-odp-bgSoft text-gray-800 dark:text-odp-fgStrong rounded-lg px-4 py-3 text-center mb-4 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 dark:focus:ring-odp-warningText transition"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-3 rounded-lg transition shadow-sm mb-4"
            >
              비밀번호로 잠금 해제
            </button>
          </form>
        )}

        <div className="flex gap-3 justify-center items-center">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-[#f0f0f0] underline transition"
          >
            백업 파일(.json) 불러오기
          </button>

          {onCloseWithoutUnlock && (
            <button
              type="button"
              onClick={onCloseWithoutUnlock}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-odp-fgStrong underline transition"
            >
              로그인 없이 새로 시작
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

