/**
 * Auth context — unlock state, S3 creds, lock/unlock handlers.
 * Persists unlock session via authSession (same-tab refresh restore).
 */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { clearAuthSession } from '@/utils/authSession';
import type { LlmProviderProfile } from '@/utils/llmProviderProfiles';

export type AuthS3Creds = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  endpoint: string;
  googleAiStudioApiKey: string;
  openaiCompatibleBaseUrl: string;
  openaiCompatibleApiKey: string;
  llmProviderProfiles: LlmProviderProfile[];
  imgbbApiKey: string;
};

export type AuthContextValue = {
  isUnlocked: boolean;
  setIsUnlocked: Dispatch<SetStateAction<boolean>>;
  showAuthModal: boolean;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
  showSetPasswordModal: boolean;
  setShowSetPasswordModal: Dispatch<SetStateAction<boolean>>;
  masterPassword: string;
  setMasterPassword: Dispatch<SetStateAction<string>>;
  s3Creds: AuthS3Creds;
  setS3Creds: Dispatch<SetStateAction<AuthS3Creds>>;
  unlock: (creds: AuthS3Creds, password?: string) => void;
  proceedWithoutStoredCreds: () => void;
  lock: () => void;
  appLockPromptManual: boolean;
};

const initialCreds: AuthS3Creds = {
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

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [s3Creds, setS3Creds] = useState<AuthS3Creds>(initialCreds);
  /** True when the user explicitly locked the app (settings / Advanced Search). */
  const [appLockPromptManual, setAppLockPromptManual] = useState(false);

  const unlock = useCallback((creds: AuthS3Creds, password = '') => {
    setS3Creds(creds);
    setMasterPassword(password);
    setIsUnlocked(true);
    setShowAuthModal(false);
    setAppLockPromptManual(false);
  }, []);

  /** Close modal and use empty creds; stored localStorage blob is unchanged. */
  const proceedWithoutStoredCreds = useCallback(() => {
    setS3Creds(initialCreds);
    setMasterPassword('');
    setIsUnlocked(true);
    setShowAuthModal(false);
    setAppLockPromptManual(false);
  }, []);

  const lock = useCallback(() => {
    clearAuthSession();
    setIsUnlocked(false);
    setAppLockPromptManual(true);
    setShowAuthModal(true);
    setS3Creds(initialCreds);
    setMasterPassword('');
  }, []);

  const value: AuthContextValue = {
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
    appLockPromptManual,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
