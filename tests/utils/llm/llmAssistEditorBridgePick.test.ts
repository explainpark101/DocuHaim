import { describe, expect, it } from 'vitest';
import {
  EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
  pickLlmAssistEditorBridge,
  type LlmAssistBridgePickMemory,
} from '@/utils/llm/llmAssistEditorBridgePick';

type Bridge = { id: string };

function candidate(options: {
  ownerId: number;
  id: string;
  documentKey?: string;
  editorRef?: object;
  keyboardFocused?: boolean;
}) {
  return {
    ownerId: options.ownerId,
    bridge: { id: options.id } satisfies Bridge,
    documentKey: options.documentKey ?? null,
    editorRef: options.editorRef ?? null,
    keyboardFocused: Boolean(options.keyboardFocused),
  };
}

describe('pickLlmAssistEditorBridge', () => {
  it('keeps the first pane when a later pane registers without keyboard focus', () => {
    const first = pickLlmAssistEditorBridge(
      [candidate({ ownerId: 1, id: 'a', documentKey: 's3:a.md' })],
      EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
    );
    const second = pickLlmAssistEditorBridge(
      [
        candidate({ ownerId: 1, id: 'a', documentKey: 's3:a.md' }),
        candidate({ ownerId: 2, id: 'b', documentKey: 's3:b.md' }),
      ],
      first.memory,
    );
    expect(second.bridge?.id).toBe('a');
  });

  it('switches to the pane that has keyboard focus', () => {
    const refA = {};
    const refB = {};
    let memory: LlmAssistBridgePickMemory = EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY;
    memory = pickLlmAssistEditorBridge(
      [
        candidate({ ownerId: 1, id: 'a', documentKey: 's3:a.md', editorRef: refA }),
        candidate({ ownerId: 2, id: 'b', documentKey: 's3:b.md', editorRef: refB }),
      ],
      memory,
    ).memory;
    const focused = pickLlmAssistEditorBridge(
      [
        candidate({ ownerId: 1, id: 'a', documentKey: 's3:a.md', editorRef: refA }),
        candidate({
          ownerId: 2,
          id: 'b',
          documentKey: 's3:b.md',
          editorRef: refB,
          keyboardFocused: true,
        }),
      ],
      memory,
    );
    expect(focused.bridge?.id).toBe('b');
  });

  it('does not follow a hover re-register of the other pane', () => {
    const refA = {};
    const refB = {};
    const focused = pickLlmAssistEditorBridge(
      [
        candidate({
          ownerId: 1,
          id: 'a',
          documentKey: 's3:a.md',
          editorRef: refA,
          keyboardFocused: true,
        }),
        candidate({ ownerId: 2, id: 'b', documentKey: 's3:b.md', editorRef: refB }),
      ],
      EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
    );
    const hovered = pickLlmAssistEditorBridge(
      [
        candidate({ ownerId: 1, id: 'a', documentKey: 's3:a.md', editorRef: refA }),
        candidate({ ownerId: 3, id: 'b-hover', documentKey: 's3:b.md', editorRef: refB }),
      ],
      focused.memory,
    );
    expect(hovered.bridge?.id).toBe('a');
  });

  it('keeps the same editor after it re-registers while the panel has focus', () => {
    const refA = {};
    const focused = pickLlmAssistEditorBridge(
      [
        candidate({
          ownerId: 1,
          id: 'a',
          documentKey: 's3:a.md',
          editorRef: refA,
          keyboardFocused: true,
        }),
        candidate({ ownerId: 2, id: 'b', documentKey: 's3:b.md', editorRef: {} }),
      ],
      EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
    );
    const reregistered = pickLlmAssistEditorBridge(
      [
        candidate({ ownerId: 4, id: 'a-next', documentKey: 's3:a.md', editorRef: refA }),
        candidate({ ownerId: 2, id: 'b', documentKey: 's3:b.md', editorRef: {} }),
      ],
      focused.memory,
    );
    expect(reregistered.bridge?.id).toBe('a-next');
  });

  it('follows documentKey when the focused editor is demoted to a new bridge', () => {
    const focused = pickLlmAssistEditorBridge(
      [
        candidate({
          ownerId: 1,
          id: 'a-live',
          documentKey: 's3:a.md',
          editorRef: {},
          keyboardFocused: true,
        }),
      ],
      EMPTY_LLM_ASSIST_BRIDGE_PICK_MEMORY,
    );
    const demoted = pickLlmAssistEditorBridge(
      [
        candidate({
          ownerId: 5,
          id: 'a-demoted',
          documentKey: 's3:a.md',
          editorRef: { current: null },
        }),
        candidate({ ownerId: 2, id: 'b', documentKey: 's3:b.md', editorRef: {} }),
      ],
      focused.memory,
    );
    expect(demoted.bridge?.id).toBe('a-demoted');
  });
});
