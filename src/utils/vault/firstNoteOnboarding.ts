const FIRST_NOTE_PROMPT_DONE_KEY = 's3haim_first_note_prompt_done';

export function hasCompletedFirstNotePrompt(): boolean {
  try {
    if (typeof window === 'undefined') return true;
    return window.localStorage.getItem(FIRST_NOTE_PROMPT_DONE_KEY) === '1';
  } catch {
    return true;
  }
}

export function markFirstNotePromptDone(): void {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FIRST_NOTE_PROMPT_DONE_KEY, '1');
  } catch {
    /* ignore */
  }
}
