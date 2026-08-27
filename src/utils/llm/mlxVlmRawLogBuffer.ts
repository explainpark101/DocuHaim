export type MlxVlmLogLine = {
  id: number;
  text: string;
};

/** In-progress tqdm line uses a stable id so virtua can update one row. */
export const MLX_VLM_LOG_IN_PROGRESS_LINE_ID = 0;

export class MlxVlmRawLogBuffer {
  private lineSeq = 0;
  private lines: MlxVlmLogLine[] = [];
  private currentLine = '';
  private readonly maxLines: number;

  constructor(maxLines = 4000) {
    this.maxLines = maxLines;
  }

  reset(): void {
    this.lineSeq = 0;
    this.lines = [];
    this.currentLine = '';
  }

  append(chunk: string): void {
    for (const char of String(chunk || '')) {
      if (char === '\r') {
        this.currentLine = '';
        continue;
      }
      if (char === '\n') {
        this.commitCurrentLine();
        continue;
      }
      this.currentLine += char;
    }
  }

  getLines(): readonly MlxVlmLogLine[] {
    if (!this.currentLine) return this.lines;
    return [...this.lines, { id: MLX_VLM_LOG_IN_PROGRESS_LINE_ID, text: this.currentLine }];
  }

  joinText(): string {
    const lines = this.getLines();
    if (!lines.length) return '';
    return `${lines.map((line) => line.text).join('\n')}\n`;
  }

  private commitCurrentLine(): void {
    if (!this.currentLine) return;
    this.lines.push({ id: ++this.lineSeq, text: this.currentLine });
    this.currentLine = '';
    if (this.lines.length > this.maxLines) {
      this.lines = this.lines.slice(this.lines.length - this.maxLines);
    }
  }
}
