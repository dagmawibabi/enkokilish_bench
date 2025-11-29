import { evalite } from "evalite";
import { generateText } from "ai";
import { contains } from "evalite/scorers/deterministic";
import { enkokilish_dataset } from "../datasets/enkokilish";
import { systemPrompt } from "../system_prompt/system_prompt";
import { reportTrace } from "evalite/traces";
import { modelsToBenchmark } from "../eval_config/models_to_benchmark";

// Import Datase
const dataset = enkokilish_dataset;

let totalCost = 0;

// Benchmark
evalite.each(modelsToBenchmark)("Enkokilish Bench", {
  data: async () => dataset,
  task: async (input, model) => {
    const result = await generateText({
      model: model,
      system: systemPrompt,
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

    totalCost += Number(result.providerMetadata?.gateway?.marketCost ?? 0);
    return result;
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
        value: output.text,
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
        value: output.providerMetadata?.["gateway"]["marketCost"],
      },
    ];
  },
  // trialCount: 5,  // Run each data point 5 times
});

console.log("Total Cost: ", totalCost);
