import { evalite } from "evalite";
import { generateText } from "ai";
import { contains } from "evalite/scorers/deterministic";
import { enkokilish_dataset } from "../datasets/enkokilish";
import { riddles_dataset } from "../datasets/riddles";
import { reportTrace } from "evalite/traces";
import { modelsToBenchmark } from "../eval_config/models_to_benchmark";
import { systemPrompt, systemPrompt2 } from "../eval_config/system_prompt";

// Import Dataset
const dataset = riddles_dataset; // enkokilish_dataset; // riddles_dataset;

// Benchmark
evalite.each(modelsToBenchmark)("Enkokilish Bench", {
  data: async () => dataset,
  task: async (input, model) => {
    try {
      const result = await generateText({
        model: model,
        system: systemPrompt2, // systemPrompt2
        prompt: input,
      });

      reportTrace({
        start: 0,
        end: 100,
        input: { prompt: input },
        output: { result: result },
        usage: {
          inputTokens: result.usage.inputTokens || 0,
          outputTokens: result.usage.outputTokens || 0,
          totalTokens: result.usage.totalTokens || 0,
        },
      });

      return result;
    } catch (err) {
      // fallback object to keep evalite alive
      return {
        text: "",
        error: String(err?.message || err),
        usage: {
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
        },
        providerMetadata: {
          gateway: {
            marketCost: 0,
          },
        },
      };
    }
  },
  scorers: [
    {
      scorer: ({ output, expected }) =>
        contains({
          actual: output.text,
          expected: expected,
        }),
    },
  ],
  columns: async ({ input, output, expected, traces }) => {
    return [
      {
        label: "Input",
        value: input,
      },
      {
        label: "Output",
        value: output.text || "",
      },
      {
        label: "Expected",
        value: expected,
      },
      {
        label: "InTok",
        value: output.usage.inputTokens || 0,
      },
      {
        label: "OutTok",
        value: output.usage.outputTokens || 0,
      },
      {
        label: "TotTok",
        value: output.usage.totalTokens || 0,
      },
      {
        label: "Cost",
        value: output.providerMetadata?.["gateway"]["marketCost"] || 0,
      },
    ];
  },
  // trialCount: 5,  // Run each data point 5 times
});
