export function buildLlmTransformPrompt({
  instruction,
  selectedText,
  hasImages,
}: {
  instruction: string;
  selectedText?: string;
  hasImages?: boolean;
}): string {
  const trimmedInstruction = (instruction || '').trim();
  const trimmedSelection = (selectedText || '').trim();
  const lines = [trimmedInstruction, '', '---'];

  if (hasImages && trimmedSelection) {
    lines.push(
      '첨부된 이미지와 아래 사용자가 선택한 텍스트를 참고하여 지시사항에 따라 결과만 출력하세요. 설명이나 부가 코멘트는 최소화하세요.',
      '',
      trimmedSelection,
    );
  } else if (hasImages) {
    lines.push(
      '첨부된 이미지를 참고하여 지시사항에 따라 결과만 출력하세요. 설명이나 부가 코멘트는 최소화하세요.',
    );
  } else {
    lines.push(
      '아래는 사용자가 선택한 텍스트입니다. 지시사항에 따라 결과만 출력하세요. 설명이나 부가 코멘트는 최소화하세요.',
      '',
      trimmedSelection,
    );
  }

  return lines.join('\n');
}
