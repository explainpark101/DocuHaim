/**
 * Merge a streaming text segment into accumulated output.
 * Handles both per-token deltas and servers that send full accumulated text each chunk.
 */
export function mergeLlmStreamChunk(previous: string, segment: string): string {
  if (!segment) return previous;
  if (!previous) return segment;
  if (segment.length >= previous.length && segment.startsWith(previous)) {
    return segment;
  }
  return previous + segment;
}
