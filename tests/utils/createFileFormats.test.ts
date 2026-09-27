import { describe, expect, it } from 'vitest';
import {
  applyCreateFileFormat,
  detectCreateFileFormat,
  ensureCreateFileExtension,
  stripCreateFileExtension,
} from '@/utils/createFileFormats';
import { resolveCreateItemPath } from '@/utils/createItemPath';

describe('createFileFormats composite suffixes', () => {
  it('strips full and intermediate composite suffixes', () => {
    expect(stripCreateFileExtension('note.enc.md')).toBe('note');
    expect(stripCreateFileExtension('note.enc')).toBe('note');
    expect(stripCreateFileExtension('note.quiz.md')).toBe('note');
    expect(stripCreateFileExtension('note.quiz')).toBe('note');
    expect(stripCreateFileExtension('note.md')).toBe('note');
    expect(stripCreateFileExtension('note')).toBe('note');
  });

  it('detects format from partial .enc / .quiz suffixes', () => {
    expect(detectCreateFileFormat('note.enc').id).toBe('enc.md');
    expect(detectCreateFileFormat('note.quiz').id).toBe('quiz.md');
    expect(detectCreateFileFormat('note.enc.md').id).toBe('enc.md');
    expect(detectCreateFileFormat('note').id).toBe('md');
  });

  it('completes .enc / .quiz to .enc.md / .quiz.md without doubling', () => {
    expect(ensureCreateFileExtension('note.enc', 'md')).toBe('note.enc.md');
    expect(ensureCreateFileExtension('note.enc', 'enc.md')).toBe('note.enc.md');
    expect(ensureCreateFileExtension('note.quiz', 'md')).toBe('note.quiz.md');
    expect(ensureCreateFileExtension('note.quiz', 'quiz.md')).toBe(
      'note.quiz.md',
    );
    expect(ensureCreateFileExtension('note', 'enc.md')).toBe('note.enc.md');
    expect(ensureCreateFileExtension('note.enc.md', 'enc.md')).toBe(
      'note.enc.md',
    );
  });

  it('applyCreateFileFormat does not produce .enc.enc.md', () => {
    expect(applyCreateFileFormat('note.enc', 'enc.md')).toBe('note.enc.md');
    expect(applyCreateFileFormat('note.quiz', 'quiz.md')).toBe('note.quiz.md');
    expect(applyCreateFileFormat('note.enc.md', 'md')).toBe('note.md');
  });

  it('resolveCreateItemPath completes partial composite suffixes', () => {
    const enc = resolveCreateItemPath('', 'secret.enc', 'file', {
      fileFormat: 'md',
    });
    expect(enc.ok && enc.baseName).toBe('secret.enc.md');

    const quiz = resolveCreateItemPath('', 'drill.quiz', 'file', {
      fileFormat: 'md',
    });
    expect(quiz.ok && quiz.baseName).toBe('drill.quiz.md');

    // After badge switches to enc.md, resolving the same typed name stays correct.
    const encAgain = resolveCreateItemPath('', 'secret.enc', 'file', {
      fileFormat: 'enc.md',
    });
    expect(encAgain.ok && encAgain.baseName).toBe('secret.enc.md');
  });
});
