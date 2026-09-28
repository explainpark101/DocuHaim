import { describe, expect, it } from 'vitest';
import {
  filterHaimSlashCommands,
  HAIM_SLASH_COMMANDS,
} from '@/components/haimEditor/slashCommands/haimSlashCommandItems';

describe('filterHaimSlashCommands', () => {
  it('returns all items for empty query', () => {
    expect(filterHaimSlashCommands('').length).toBe(HAIM_SLASH_COMMANDS.length);
  });

  it('matches Korean labels', () => {
    const hits = filterHaimSlashCommands('굵게');
    expect(hits.some((h) => h.id === 'bold')).toBe(true);
  });

  it('matches English labels and keywords', () => {
    const bold = filterHaimSlashCommands('bold');
    expect(bold.some((h) => h.id === 'bold')).toBe(true);

    const italic = filterHaimSlashCommands('italic');
    expect(italic.some((h) => h.id === 'italic')).toBe(true);

    const h3 = filterHaimSlashCommands('heading 3');
    expect(h3.some((h) => h.id === 'heading-3')).toBe(true);
  });

  it('matches h1–h10', () => {
    for (let level = 1; level <= 10; level += 1) {
      const byKo = filterHaimSlashCommands(`제목 ${level}`);
      const byEn = filterHaimSlashCommands(`h${level}`);
      expect(byKo.some((h) => h.id === `heading-${level}`)).toBe(true);
      expect(byEn.some((h) => h.id === `heading-${level}`)).toBe(true);
    }
  });

  it('matches multi-word Korean and English', () => {
    expect(filterHaimSlashCommands('할 일').some((h) => h.id === 'task-list')).toBe(
      true,
    );
    expect(
      filterHaimSlashCommands('task list').some((h) => h.id === 'task-list'),
    ).toBe(true);
  });

  it('matches picture as an image alias', () => {
    const hits = filterHaimSlashCommands('picture');
    expect(hits.some((h) => h.id === 'image-upload')).toBe(true);
    expect(hits.some((h) => h.id === 'image-link')).toBe(true);
    expect(hits.some((h) => h.id === 'image-clip')).toBe(true);
  });
});
