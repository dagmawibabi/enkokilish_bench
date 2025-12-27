import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const modelsToBenchmark = [
  // { name: "gpt-oss-20b", input: "openai/gpt-oss-20b" },
  // { name: "trinity-mini", input: "arcee-ai/trinity-mini" },
  // { name: "deepseek-v3.2", input: "deepseek/deepseek-v3.2" },
  // { name: "llama-3.1-8b", input: "meta/llama-3.1-8b" },
  // { name: "nova-lite", input: "amazon/nova-lite" },
  // { name: "grok-4-fast-non-reasoning", input: "xai/grok-4-fast-non-reasoning" },
  // {
  //   name: "gemini-2.5-flash-lite",
  //   input: "google/gemini-2.5-flash-lite",
  // },
  // { name: "gemini-2.5-flash", input: "google/gemini-2.5-flash" },
  // { name: "gemini-2.0-flash-lite", input: "google/gemini-2.0-flash-lite" },
  // { name: "gemini-3-flash", input: "google/gemini-3-flash" },
  // {
  //   name: "olmo-3.1-32b-think",
  //   input: openrouter("allenai/olmo-3.1-32b-think:free"),
  // },
  // -------- SCORED ZERO
  // {
  //   name: "nemotron-3-nano-30b-a3b",
  //   input: openrouter("nvidia/nemotron-3-nano-30b-a3b:free"),
  // },
  // {
  //   name: "qwen3-coder",
  //   input: openrouter("qwen/qwen3-coder:free"),
  // },
  // {
  //   name: "kimi-k2",
  //   input: openrouter("moonshotai/kimi-k2:free"),
  // },
  // {
  //   name: "gemma-3n-e2b-it",
  //   input: openrouter("gemma-3n-e2b-it:free"),
  // },
  // ---------
  // {
  //   name: "devstral-2512",
  //   input: openrouter("mistralai/devstral-2512:free"),
  // },
  {
    name: "glm-4.5-air",
    input: openrouter("z-ai/glm-4.5-air:free"),
  },
];
