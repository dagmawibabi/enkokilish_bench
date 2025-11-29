import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { evalite } from "evalite";
import { wrapAISDKModel } from "evalite/ai-sdk";
import { contains } from "evalite/scorers/deterministic";
import { enkokilish_dataset } from "./datasets/enkokilish";

// Import Datase
const dataset = enkokilish_dataset;

// Wrap once, use everywhere
const model = wrapAISDKModel(google("gemini-2.5-flash-lite"));

// Benchmark
evalite("Enkokilish Bench", {
  data: async () => dataset,
  task: async (input) => {
    const result = await generateText({
      model,
      system: `You are an Amharic riddle solver. Try your best to solve every riddle you are asked. Respond with one word or phrase only!`,
      prompt: input,
    });

    return result.text;
  },
  scorers: [
    {
      scorer: ({ output, expected }) =>
        contains({
          actual: output,
          expected: expected,
        }),
    },
  ],
});
