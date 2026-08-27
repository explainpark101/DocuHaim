import { shutdownManagedLlamaCppServer } from '@/utils/llm/llamaCppShell';

/** Stop app-managed local LLM servers before desktop quit. */
export async function shutdownManagedLlmServersOnQuit(): Promise<void> {
  await shutdownManagedLlamaCppServer();
}
