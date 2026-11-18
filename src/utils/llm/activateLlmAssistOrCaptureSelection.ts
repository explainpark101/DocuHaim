type LlmAssistActivationTarget = {
  captureSelectionToChat?: (() => boolean) | undefined;
  toggleAssist?: (() => void) | undefined;
} | null | undefined;

/** Prefer adding the live selection as a chat reference; otherwise toggle the panel. */
export function activateLlmAssistOrCaptureSelection(
  session: LlmAssistActivationTarget,
): void {
  if (session?.captureSelectionToChat?.()) return;
  session?.toggleAssist?.();
}
