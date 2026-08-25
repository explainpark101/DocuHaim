import { useContext } from 'react';
import {
  ChatIntegrationContext,
  type ChatIntegrationValue,
} from '@/App/context/ChatIntegrationContext';

export function useChatIntegration(): ChatIntegrationValue {
  const ctx = useContext(ChatIntegrationContext);
  if (!ctx) throw new Error('useChatIntegration must be used within AppLogicProvider');
  return ctx;
}
