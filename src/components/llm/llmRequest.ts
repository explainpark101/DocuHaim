/**
 * OpenAI-compatible LLM chat completion request.
 *
 * Designed as a superset of:
 * - OpenAI Chat Completions
 * - vLLM OpenAI-compatible API
 * - SGLang-style OpenAI-compatible APIs
 * - Other OpenAI-compatible inference servers
 *
 * Not every model/server supports every option.
 */
export interface LLMRequest {
    // ===========================================================================
    // Model
    // ===========================================================================
  
    /** Model identifier, e.g. "gpt-5", "Qwen3-8B", "meta-llama/Llama-3.1-8B-Instruct" */
    model: string;
  
    // ===========================================================================
    // Input
    // ===========================================================================
  
    /**
     * Conversation messages.
     *
     * Usually contains:
     * - system
     * - developer
     * - user
     * - assistant
     * - tool
     */
    messages: ChatMessage[];
  
    /**
     * Optional system/developer instructions.
     *
     * Some OpenAI-compatible servers expose these through messages only,
     * so this field is not universally supported.
     */
    instructions?: string;
  
    // ===========================================================================
    // Generation / Sampling
    // ===========================================================================
  
    /**
     * Number of completions to generate.
     *
     * n = 1 is the normal setting.
     *
     * Increasing this multiplies generation cost.
     */
    n?: number;
  
    /**
     * Sampling temperature.
     *
     * Lower:
     *   more deterministic / focused
     *
     * Higher:
     *   more random / diverse
     *
     * Typical range: 0 ~ 2.
     */
    temperature?: number;
  
    /**
     * Nucleus sampling.
     *
     * Only tokens within the cumulative probability mass are considered.
     *
     * Typical range: 0 ~ 1.
     *
     * Usually tune this OR temperature rather than both.
     */
    top_p?: number;
  
    /**
     * Top-K sampling.
     *
     * Limits candidate tokens to the K most probable tokens.
     *
     * Not part of the official OpenAI API.
     * Commonly supported by vLLM / local inference engines.
     *
     * 0 or -1 commonly means "disabled / all tokens".
     */
    top_k?: number;
  
    /**
     * Minimum probability sampling.
     *
     * Tokens whose probability is below:
     *
     *   min_p * probability_of_best_token
     *
     * are discarded.
     *
     * Common in vLLM and other local inference engines.
     */
    min_p?: number;
  
    /**
     * Penalizes tokens according to their frequency in generated text.
     *
     * Higher values discourage repetition.
     */
    frequency_penalty?: number;
  
    /**
     * Penalizes tokens that have already appeared.
     *
     * Positive values encourage introducing new tokens/topics.
     */
    presence_penalty?: number;
  
    /**
     * General repetition penalty.
     *
     * Common in Hugging Face / vLLM-style inference.
     *
     * 1.0 = no penalty.
     * > 1.0 = discourage repetition.
     *
     * Not part of the standard OpenAI API.
     */
    repetition_penalty?: number;
  
    /**
     * Bias the probability of specific token IDs.
     *
     * Map:
     *   token ID -> bias
     *
     * Positive values increase likelihood.
     * Negative values decrease likelihood.
     */
    logit_bias?: Record<string, number>;
  
    /**
     * Random seed for reproducible sampling.
     *
     * Reproducibility is not guaranteed across all servers/models.
     */
    seed?: number;
  
    // ===========================================================================
    // Length
    // ===========================================================================
  
    /**
     * Maximum number of generated tokens.
     *
     * OpenAI-compatible servers commonly use this field.
     */
    max_tokens?: number;
  
    /**
     * Newer OpenAI-style name for the maximum number of completion tokens.
     *
     * Some models/APIs prefer this over max_tokens.
     */
    max_completion_tokens?: number;
  
    /**
     * Minimum number of generated tokens before EOS/stop.
     *
     * Commonly supported by vLLM/local inference engines.
     */
    min_tokens?: number;
  
    /**
     * Stop generation when one of these strings is generated.
     *
     * Some servers accept a single string as well.
     */
    stop?: string | string[];
  
    /**
     * Stop generation when one of these token IDs is generated.
     *
     * vLLM/local inference extension.
     */
    stop_token_ids?: number[];
  
    /**
     * Ignore the model's EOS token.
     *
     * Generation continues until another stopping condition is reached.
     */
    ignore_eos?: boolean;
  
    // ===========================================================================
    // Output formatting
    // ===========================================================================
  
    /**
     * Controls the output format.
     *
     * Examples:
     *   { type: "text" }
     *   { type: "json_object" }
     *   { type: "json_schema", json_schema: {...} }
     */
    response_format?: ResponseFormat;
  
    /**
     * Controls the amount of detail in text output.
     *
     * Supported by some OpenAI models/APIs.
     */
    verbosity?: "low" | "medium" | "high";
  
    // ===========================================================================
    // Log probabilities
    // ===========================================================================
  
    /**
     * Whether to return token log probabilities.
     */
    logprobs?: boolean;
  
    /**
     * Number of alternative token log probabilities to return.
     *
     * Usually 0 ~ 20 depending on implementation.
     */
    top_logprobs?: number;
  
    /**
     * Number of log probabilities to return for each prompt token.
     *
     * vLLM/local inference extension.
     */
    prompt_logprobs?: number;
  
    /**
     * Return log probabilities for specific token IDs.
     *
     * vLLM/local inference extension.
     */
    logprob_token_ids?: number[];
  
    // ===========================================================================
    // Streaming
    // ===========================================================================
  
    /**
     * Stream the generated response using SSE.
     */
    stream?: boolean;
  
    /**
     * Additional streaming configuration.
     */
    stream_options?: StreamOptions;
  
    /**
     * Number of tokens between streamed chunks.
     *
     * vLLM extension.
     */
    stream_interval?: number;
  
    // ===========================================================================
    // Tool / Function Calling
    // ===========================================================================
  
    /**
     * Tools available to the model.
     */
    tools?: ToolDefinition[];
  
    /**
     * Controls whether/how the model should call tools.
     *
     * Examples:
     *   "none"
     *   "auto"
     *   "required"
     *   { type: "function", function: { name: "search" } }
     */
    tool_choice?: ToolChoice;
  
    /**
     * Whether the model may call multiple tools in parallel.
     */
    parallel_tool_calls?: boolean;
  
    // ===========================================================================
    // Reasoning
    // ===========================================================================
  
    /**
     * Controls reasoning effort for reasoning-capable models.
     *
     * Typical values:
     *   low
     *   medium
     *   high
     *
     * Exact values are model/provider dependent.
     */
    reasoning_effort?: "none" | "low" | "medium" | "high";
  
    /**
     * Maximum number of tokens allocated to internal reasoning/thinking.
     *
     * Common in local inference engines.
     */
    thinking_token_budget?: number;
  
    /**
     * Whether reasoning/thinking content should be included in the response.
     *
     * Provider-dependent.
     */
    include_reasoning?: boolean;
  
    // ===========================================================================
    // Beam Search
    // ===========================================================================
  
    /**
     * Enable beam search instead of normal sampling.
     *
     * Mainly a local inference/vLLM extension.
     */
    use_beam_search?: boolean;
  
    /**
     * Beam-search length penalty.
     *
     * Mainly relevant when use_beam_search = true.
     */
    length_penalty?: number;
  
    // ===========================================================================
    // Token filtering
    // ===========================================================================
  
    /**
     * Only allow specific token IDs to be generated.
     *
     * vLLM/local inference extension.
     */
    allowed_token_ids?: number[];
  
    /**
     * Token sequences that should not be generated.
     *
     * vLLM/local inference extension.
     */
    bad_words?: string[];
  
    // ===========================================================================
    // Special-token handling
    // ===========================================================================
  
    /**
     * Whether special tokens should be removed from decoded output.
     *
     * Common in local inference engines.
     */
    skip_special_tokens?: boolean;
  
    /**
     * Whether spaces should be inserted between decoded special tokens.
     */
    spaces_between_special_tokens?: boolean;
  
    /**
     * Include the stop string itself in the returned output.
     */
    include_stop_str_in_output?: boolean;
  
    // ===========================================================================
    // Prompt handling
    // ===========================================================================
  
    /**
     * Maximum number of prompt tokens to retain/truncate.
     *
     * Common vLLM extension.
     *
     * -1 may mean no truncation depending on implementation.
     */
    truncate_prompt_tokens?: number;
  
    /**
     * Which side of the prompt should be truncated.
     */
    truncation_side?: "left" | "right";
  
    // ===========================================================================
    // Echo
    // ===========================================================================
  
    /**
     * Return the input prompt together with the generated completion.
     *
     * Mainly relevant to completion/local inference APIs.
     */
    echo?: boolean;
  
    // ===========================================================================
    // User / Request metadata
    // ===========================================================================
  
    /**
     * Identifier for the end user.
     *
     * OpenAI-compatible but provider-specific in behavior.
     */
    user?: string;
  
    /**
     * Application-defined metadata.
     *
     * Provider support varies.
     */
    metadata?: Record<string, string>;
  
    /**
     * Stable identifier used for prompt caching.
     *
     * Provider-specific.
     */
    prompt_cache_key?: string;
  
    /**
     * Cache retention policy.
     *
     * Provider/model dependent.
     */
    prompt_cache_retention?: string;
  
    // ===========================================================================
    // Service / Processing
    // ===========================================================================
  
    /**
     * Requested service tier.
     *
     * Provider-specific.
     */
    service_tier?: string;
  
    /**
     * Request timeout is normally an HTTP-client option rather than
     * an LLM request-body option, but may be useful in a unified interface.
     */
    timeout?: number;
  
    // ===========================================================================
    // vLLM-specific extensions
    // ===========================================================================
  
    /**
     * vLLM custom extension arguments.
     *
     * Allows arbitrary server-specific parameters.
     */
    vllm_xargs?: Record<
      string,
      string | number | boolean | Array<string | number | boolean>
    >;
  
    /**
     * KV-cache transfer parameters.
     *
     * vLLM distributed/disaggregated serving extension.
     */
    kv_transfer_params?: Record<string, unknown>;
  
    /**
     * EC transfer parameters.
     *
     * vLLM distributed serving extension.
     */
    ec_transfer_params?: Record<string, unknown>;
  
    /**
     * Custom extension arguments.
     *
     * Useful when building a provider-agnostic wrapper.
     */
    extra_body?: Record<string, unknown>;
  }
  
  
  // =============================================================================
  // Messages
  // =============================================================================
  
  export type ChatMessage =
    | SystemMessage
    | DeveloperMessage
    | UserMessage
    | AssistantMessage
    | ToolMessage;
  
  
  export interface SystemMessage {
    role: "system";
    content: string | ContentPart[];
    name?: string;
  }
  
  
  export interface DeveloperMessage {
    role: "developer";
    content: string | ContentPart[];
    name?: string;
  }
  
  
  export interface UserMessage {
    role: "user";
    content: string | ContentPart[];
    name?: string;
  }
  
  
  export interface AssistantMessage {
    role: "assistant";
  
    content?: string | ContentPart[];
  
    /** Tool calls requested by the assistant. */
    tool_calls?: ToolCall[];
  
    /** Legacy function-call representation. */
    function_call?: {
      name: string;
      arguments: string;
    };
  
    name?: string;
  }
  
  
  export interface ToolMessage {
    role: "tool";
  
    /** ID of the tool call being answered. */
    tool_call_id: string;
  
    content: string | ContentPart[];
  }
  
  
  // =============================================================================
  // Multimodal content
  // =============================================================================
  
  export type ContentPart =
    | TextContent
    | ImageContent
    | AudioContent
    | VideoContent;
  
  
  export interface TextContent {
    type: "text";
    text: string;
  }
  
  
  export interface ImageContent {
    type: "image_url";
  
    image_url: {
      url: string;
  
      /**
       * Image detail level.
       *
       * Typical OpenAI values:
       * auto | low | high
       *
       * Not all OpenAI-compatible servers support this.
       */
      detail?: "auto" | "low" | "high";
    };
  }
  
  
  export interface AudioContent {
    type: "input_audio";
  
    input_audio: {
      /** Base64-encoded audio data. */
      data: string;
  
      /** Audio format, e.g. wav / mp3. */
      format: string;
    };
  }
  
  
  export interface VideoContent {
    type: "video_url";
  
    video_url: {
      url: string;
    };
  }
  
  
  // =============================================================================
  // Tool Calling
  // =============================================================================
  
  export interface ToolDefinition {
    type: "function";
  
    function: {
      name: string;
  
      description?: string;
  
      /**
       * JSON Schema describing function arguments.
       */
      parameters?: Record<string, unknown>;
  
      /**
       * Whether the model may generate parallel calls.
       */
      strict?: boolean;
    };
  }
  
  
  export type ToolChoice =
    | "none"
    | "auto"
    | "required"
    | {
        type: "function";
        function: {
          name: string;
        };
      };
  
  
  export interface ToolCall {
    id: string;
  
    type: "function";
  
    function: {
      name: string;
  
      /**
       * JSON-encoded function arguments.
       */
      arguments: string;
    };
  }
  
  
  // =============================================================================
  // Structured Output
  // =============================================================================
  
  export type ResponseFormat =
    | {
        type: "text";
      }
    | {
        type: "json_object";
      }
    | {
        type: "json_schema";
  
        json_schema: {
          name: string;
  
          description?: string;
  
          schema: Record<string, unknown>;
  
          strict?: boolean;
        };
      };
  
  
  // =============================================================================
  // Streaming
  // =============================================================================
  
  export interface StreamOptions {
    /**
     * Whether usage/token statistics should be included
     * in the final streaming chunk.
     */
    include_usage?: boolean;
  
    /**
     * Provider-specific stream obfuscation option.
     */
    include_obfuscation?: boolean;
}