import { describe, expect, it } from 'vitest';
import { matchAppCommands, matchAppCommandsRanked } from '@/utils/advancedSearch/commands';

describe('matchAppCommands palette visibility', () => {
  it('orders content-search above settings on empty query', () => {
    const ids = matchAppCommands('').map((cmd) => cmd.id);
    const contentIdx = ids.indexOf('content-search');
    const settingsIdx = ids.indexOf('settings');
    expect(contentIdx).toBeGreaterThanOrEqual(0);
    expect(settingsIdx).toBeGreaterThanOrEqual(0);
    expect(contentIdx).toBeLessThan(settingsIdx);
  });

  it('hides settings section commands until query is non-empty', () => {
    const emptyIds = matchAppCommands('').map((cmd) => cmd.id);
    expect(emptyIds).toContain('settings');
    expect(emptyIds.some((id) => id.startsWith('settings-'))).toBe(false);

    const searched = matchAppCommands('저장소').map((cmd) => cmd.id);
    expect(searched.some((id) => id.startsWith('settings-'))).toBe(true);
  });

  it('shows chat section commands only when chat tab is active', () => {
    const inactive = matchAppCommands('', { chatTabActive: false }).map((cmd) => cmd.id);
    expect(inactive).toContain('chat');
    expect(inactive.some((id) => id.startsWith('chat-'))).toBe(false);

    const active = matchAppCommands('', { chatTabActive: true }).map((cmd) => cmd.id);
    expect(active.some((id) => id.startsWith('chat-'))).toBe(true);
  });

  it('hides chat section commands while searching when chat tab is inactive', () => {
    const hits = matchAppCommandsRanked('채팅 설정', { chatTabActive: false });
    expect(hits.some(({ command }) => command.id.startsWith('chat-'))).toBe(false);
  });
});
