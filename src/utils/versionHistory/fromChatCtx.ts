import { createChatBackend } from '@/utils/chatWithMyself/backends';
import type { ChatStorageCtx } from '@/utils/chatWithMyself/backends';
import {
  createVersionHistoryContext,
  type VersionHistoryContext,
} from '@/utils/versionHistory/index';

/** Build VersionHistoryContext from chat storage ctx. */
export function versionHistoryContextFromChat(
  ctx: ChatStorageCtx,
): VersionHistoryContext {
  const chatBackend = createChatBackend(ctx);
  return createVersionHistoryContext({
    storageMode: ctx.mode,
    getS3Client: () => ctx.client ?? null,
    bucket: ctx.bucket || '',
    getVaultBackend: () => null,
    chatBackend,
  });
}
