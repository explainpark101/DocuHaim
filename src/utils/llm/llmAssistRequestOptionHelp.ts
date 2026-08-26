export type LlmAssistRequestOptionHelp = {
  /** Short text for Radix Tooltip. */
  summary: string;
  /** Longer explanation for the help modal. */
  detail: string;
  /** Value field placeholder (expected JSON/type). */
  valuePlaceholder: string;
};

const HELP_BY_KEY: Record<string, LlmAssistRequestOptionHelp> = {
  temperature: {
    summary: '출력 무작위성(창의성)을 조절합니다.',
    detail:
      '낮을수록 결정적이고 일관된 답변, 높을수록 다양하고 창의적인 답변이 나옵니다. 일반적으로 0~2 범위를 사용하며, top_p와 동시에 크게 조정하지 않는 것이 좋습니다.',
    valuePlaceholder: 'number (예: 0.4)',
  },
  top_p: {
    summary: '누적 확률 상위 토큰만 샘플링합니다.',
    detail:
      'nucleus sampling으로, 누적 확률이 top_p 이하인 토큰 집합에서만 다음 토큰을 고릅니다. 0~1 범위이며 temperature 대신 이 값만 조정하는 경우가 많습니다.',
    valuePlaceholder: 'number (예: 0.9)',
  },
  top_k: {
    summary: '상위 K개 토큰만 후보로 제한합니다.',
    detail:
      '가장 확률이 높은 K개 토큰만 다음 토큰 후보로 사용합니다. OpenAI 공식 API에는 없고 vLLM 등 로컬 추론 서버에서 흔히 지원합니다. 0 또는 -1은 비활성화를 의미하는 경우가 많습니다.',
    valuePlaceholder: 'number (예: 40)',
  },
  min_p: {
    summary: '최고 확률 대비 낮은 토큰을 제외합니다.',
    detail:
      '최고 확률 토큰 × min_p보다 낮은 확률의 토큰을 후보에서 제거합니다. vLLM 등에서 지원하는 최소 확률 샘플링 방식입니다.',
    valuePlaceholder: 'number (예: 0.05)',
  },
  typical_p: {
    summary: 'typical sampling으로 흔한 토큰을 선호합니다.',
    detail:
      '각 토큰의 정보 이론적 기대값과 실제 확률 차이를 기준으로 샘플링합니다. 로컬 추론 엔진에서 지원하는 경우가 있으며, 모델/서버마다 동작이 다를 수 있습니다.',
    valuePlaceholder: 'number (예: 0.95)',
  },
  max_tokens: {
    summary: '생성할 최대 토큰 수를 제한합니다.',
    detail:
      '완성(completion)에 허용되는 최대 토큰 수입니다. OpenAI 호환 API에서 가장 흔한 길이 제한 필드이며, 비용과 응답 길이를 직접 제어합니다.',
    valuePlaceholder: 'number (예: 1024)',
  },
  max_completion_tokens: {
    summary: '완성 토큰 상한(신규 OpenAI 스타일)입니다.',
    detail:
      '일부 최신 모델/API는 max_tokens 대신 max_completion_tokens를 사용합니다. 서버가 둘 중 하나만 인식할 수 있으므로 문서를 확인하세요.',
    valuePlaceholder: 'number (예: 1024)',
  },
  n: {
    summary: '한 요청에서 생성할 응답 개수입니다.',
    detail:
      '기본값은 1입니다. 1보다 크면 여러 completion을 반환하며, 토큰 사용량과 비용이 그만큼 늘어납니다.',
    valuePlaceholder: 'number (예: 1)',
  },
  frequency_penalty: {
    summary: '이미 자주 나온 토큰의 재등장을 억제합니다.',
    detail:
      '생성 텍스트에서 등장 빈도가 높은 토큰에 패널티를 줍니다. 반복 표현을 줄이고 싶을 때 사용합니다.',
    valuePlaceholder: 'number (예: 0.5)',
  },
  presence_penalty: {
    summary: '한 번이라도 나온 토큰의 재등장을 억제합니다.',
    detail:
      '이미 등장한 토큰(주제/단어)의 재사용을 줄여 새로운 표현이나 주제로 이동하도록 유도합니다.',
    valuePlaceholder: 'number (예: 0.5)',
  },
  repetition_penalty: {
    summary: '반복 토큰에 대한 일반 패널티입니다.',
    detail:
      'Hugging Face / vLLM 스타일 추론에서 흔합니다. 1.0이면 패널티 없음, 1보다 크면 반복을 억제합니다. OpenAI 표준 필드는 아닙니다.',
    valuePlaceholder: 'number (예: 1.1)',
  },
  seed: {
    summary: '샘플링 시드로 재현성을 높입니다.',
    detail:
      '같은 seed와 동일 조건이면 비슷한 결과를 기대할 수 있지만, 서버/모델/병렬 처리에 따라 완전한 재현은 보장되지 않을 수 있습니다.',
    valuePlaceholder: 'number (예: 42)',
  },
  min_tokens: {
    summary: '최소 생성 토큰 수를 지정합니다.',
    detail:
      'EOS나 stop 조건이 나오기 전까지 최소한 이 토큰 수만큼은 생성하도록 합니다. vLLM 등 로컬 추론에서 지원하는 경우가 있습니다.',
    valuePlaceholder: 'number (예: 1)',
  },
  stop: {
    summary: '지정 문자열이 나오면 생성을 중단합니다.',
    detail:
      '문자열 하나 또는 배열을 지정할 수 있습니다. 해당 시퀀스가 출력되면 생성이 종료됩니다.',
    valuePlaceholder: 'string | string[] (예: "\\n")',
  },
  stop_token_ids: {
    summary: '지정 토큰 ID가 나오면 생성을 중단합니다.',
    detail:
      '문자열 stop 대신 토큰 ID로 중단 조건을 지정합니다. vLLM 등 로컬 추론 확장 옵션입니다.',
    valuePlaceholder: 'number[] (예: [128001])',
  },
  ignore_eos: {
    summary: 'EOS 토큰을 무시하고 계속 생성합니다.',
    detail:
      '모델의 종료(EOS) 토큰을 만나도 다른 중단 조건(max_tokens, stop 등)까지 생성을 이어갑니다.',
    valuePlaceholder: 'boolean (예: true)',
  },
  logprobs: {
    summary: '토큰별 로그 확률을 반환합니다.',
    detail:
      'true이면 각 출력 토큰의 log probability 정보를 응답에 포함합니다. 디버깅이나 확률 분석에 사용합니다.',
    valuePlaceholder: 'boolean (예: true)',
  },
  top_logprobs: {
    summary: '각 위치에서 상위 대안 토큰 logprob를 반환합니다.',
    detail:
      'logprobs가 켜져 있을 때, 각 토큰 위치마다 상위 N개 대안의 log probability를 함께 받을 수 있습니다.',
    valuePlaceholder: 'number (예: 5)',
  },
  prompt_logprobs: {
    summary: '프롬프트 토큰의 logprob를 반환합니다.',
    detail:
      '입력 프롬프트 각 토큰에 대한 log probability를 응답에 포함합니다. vLLM 등 로컬 추론 확장입니다.',
    valuePlaceholder: 'number (예: 0)',
  },
  verbosity: {
    summary: '출력 상세도 수준을 조절합니다.',
    detail:
      '일부 OpenAI 모델에서 low / medium / high로 응답 길이·상세도를 조절합니다. 지원 모델과 값은 제공자마다 다릅니다.',
    valuePlaceholder: '"low" | "medium" | "high"',
  },
  reasoning_effort: {
    summary: '추론(사고) 모델의 노력 수준을 설정합니다.',
    detail:
      'reasoning-capable 모델에서 내부 추론 깊이를 none / low / medium / high 등으로 조절합니다. 정확한 값과 의미는 모델·제공자에 따라 다릅니다.',
    valuePlaceholder: '"none" | "low" | "medium" | "high"',
  },
  thinking_token_budget: {
    summary: '내부 사고(thinking) 토큰 예산을 지정합니다.',
    detail:
      '추론/사고 구간에 할당할 최대 토큰 수입니다. 로컬 추론 엔진이나 thinking 모델에서 지원하는 경우가 있습니다.',
    valuePlaceholder: 'number (예: 1024)',
  },
  include_reasoning: {
    summary: '응답에 추론/사고 내용을 포함할지 설정합니다.',
    detail:
      '모델이 내부 reasoning을 별도 필드로 반환하도록 요청합니다. 제공자·모델 지원 여부에 따라 동작이 달라집니다.',
    valuePlaceholder: 'boolean (예: true)',
  },
  use_beam_search: {
    summary: '샘플링 대신 빔 서치를 사용합니다.',
    detail:
      '확률적 샘플링 대신 빔 서치로 여러 후보 경로를 탐색합니다. 주로 vLLM 등 로컬 추론에서 지원하며, 생성 속도와 비용이 달라질 수 있습니다.',
    valuePlaceholder: 'boolean (예: false)',
  },
  length_penalty: {
    summary: '빔 서치 시 시퀀스 길이 패널티를 적용합니다.',
    detail:
      'use_beam_search가 켜져 있을 때 긴/짧은 시퀀스를 선호하도록 점수를 조정합니다. 1.0이 중립에 가깝습니다.',
    valuePlaceholder: 'number (예: 1.0)',
  },
  response_format: {
    summary: '출력 형식(JSON 등)을 지정합니다.',
    detail:
      '예: { "type": "text" }, { "type": "json_object" }, json_schema 등. 구조화된 출력이 필요할 때 사용하며, 모델이 해당 형식을 지원해야 합니다.',
    valuePlaceholder: 'object (예: {"type":"json_object"})',
  },
  user: {
    summary: '최종 사용자 식별자(제공자 메타데이터)입니다.',
    detail:
      'OpenAI 호환 API의 end-user ID 필드입니다. 남용 방지·감사 목적으로 제공자가 사용할 수 있으며, 앱 동작 자체를 바꾸지는 않습니다.',
    valuePlaceholder: 'string (예: "user-123")',
  },
  truncate_prompt_tokens: {
    summary: '프롬프트를 최대 토큰 수로 잘라냅니다.',
    detail:
      '컨텍스트가 길 때 앞/뒤를 잘라 모델 한도에 맞춥니다. -1은 잘라내지 않음을 의미하는 구현도 있습니다.',
    valuePlaceholder: 'number (예: 4096)',
  },
  truncation_side: {
    summary: '프롬프트를 자를 때 left 또는 right를 선택합니다.',
    detail:
      'truncate_prompt_tokens와 함께 사용합니다. left는 앞부분을, right는 뒷부분을 유지하는 식으로 잘라냅니다.',
    valuePlaceholder: '"left" | "right"',
  },
  skip_special_tokens: {
    summary: '디코딩 시 특수 토큰을 출력에서 제거합니다.',
    detail:
      'BOS/EOS 등 특수 토큰을 최종 텍스트에 포함하지 않도록 합니다. 로컬 추론 엔진에서 흔한 옵션입니다.',
    valuePlaceholder: 'boolean (예: true)',
  },
  echo: {
    summary: '입력 프롬프트를 응답에 함께 반환합니다.',
    detail:
      'completion API에서 프롬프트와 생성 결과를 한 번에 받을 때 사용합니다. 채팅 API에서는 덜 흔합니다.',
    valuePlaceholder: 'boolean (예: false)',
  },
};

const CUSTOM_KEY_HELP: LlmAssistRequestOptionHelp = {
  summary: '사용자 정의 옵션 키입니다.',
  detail:
    '제안 목록에 없는 key도 OpenAI 호환 요청 본문에 그대로 합쳐집니다. 서버/모델이 지원하는지는 제공자 문서를 확인하세요. 값은 JSON 리터럴(숫자, 불리언, 배열, 객체) 또는 문자열로 입력할 수 있습니다.',
  valuePlaceholder: 'JSON 값 (예: 0.4, true, "text", [1,2])',
};

const EMPTY_KEY_HELP: LlmAssistRequestOptionHelp = {
  summary: '옵션 키를 선택하거나 입력하세요.',
  detail:
    '제안 목록에서 key를 고르거나 직접 입력한 뒤 value를 설정합니다. key가 비어 있으면 요청에 포함되지 않습니다.',
  valuePlaceholder: 'value (키 선택 후 형식 표시)',
};

export function getRequestOptionHelp(key: string): LlmAssistRequestOptionHelp {
  const trimmed = key.trim();
  if (!trimmed) return EMPTY_KEY_HELP;
  const known = HELP_BY_KEY[trimmed];
  if (known) return known;
  return {
    summary: `사용자 정의 옵션 "${trimmed}"입니다.`,
    detail: `${CUSTOM_KEY_HELP.detail}\n\n현재 key: ${trimmed}`,
    valuePlaceholder: CUSTOM_KEY_HELP.valuePlaceholder,
  };
}

export function getRequestOptionValuePlaceholder(key: string): string {
  return getRequestOptionHelp(key).valuePlaceholder;
}

export function buildRequestOptionGoogleSearchUrl(key: string): string {
  const trimmed = key.trim();
  const query = trimmed
    ? `OpenAI API ${trimmed} parameter LLM`
    : 'OpenAI chat completion API parameters';
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
