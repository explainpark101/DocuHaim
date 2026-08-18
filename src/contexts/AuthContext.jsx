/**
 * 인증 Context
 * - 잠금 해제 상태, S3 인증 정보 등을 유지
 * - /export-pdf 등 다른 라우트로 이동 후 돌아와도 재잠금 해제 불필요
 * - sessionStorage에 잠금 해제 세션을 두어 같은 탭에서 새로고침해도 자동 복원
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { clearAuthSession, saveAuthSession } from '@/utils/authSession';

const AuthContext = createContext(null);

const initialCreds = {
  accessKeyId: '',
  secretAccessKey: '',
  region: 'ap-northeast-2',
  bucket: '',
  endpoint: '',
  googleAiStudioApiKey: '',
  openaiCompatibleBaseUrl: '',
  openaiCompatibleApiKey: '',
  llmProviderProfiles: [],
  imgbbApiKey: '',
};

export function AuthProvider({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [s3Creds, setS3Creds] = useState(initialCreds);

  useEffect(() => {
    if (!isUnlocked) return;
    void saveAuthSession({ creds: s3Creds, password: masterPassword });
  }, [isUnlocked, s3Creds, masterPassword]);

  const unlock = useCallback((creds, password = '') => {
    setS3Creds(creds);
    setMasterPassword(password);
    setIsUnlocked(true);
    setShowAuthModal(false);
  }, []);

  /** 잠금 해제 없이 모달만 닫고, 빈 연결정보로 앱 사용(설정에서 새로 입력 가능). 기존 localStorage 저장값은 유지. */
  const proceedWithoutStoredCreds = useCallback(() => {
    setS3Creds(initialCreds);
    setMasterPassword('');
    setIsUnlocked(true);
    setShowAuthModal(false);
  }, []);

  const lock = useCallback(() => {
    clearAuthSession();
    setIsUnlocked(false);
    setShowAuthModal(true);
    setS3Creds(initialCreds);
    setMasterPassword('');
  }, []);

  const value = {
    isUnlocked,
    setIsUnlocked,
    showAuthModal,
    setShowAuthModal,
    showSetPasswordModal,
    setShowSetPasswordModal,
    masterPassword,
    setMasterPassword,
    s3Creds,
    setS3Creds,
    unlock,
    proceedWithoutStoredCreds,
    lock,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
