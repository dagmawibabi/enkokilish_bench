<script lang="ts">
	import gemini25flash from '$lib/results/gemini-2.5-flash.json';
	import gemini25flashlite from '$lib/results/gemini-2.5-flash-lite.json';
	import gemini20flashlite from '$lib/results/gemini-2.0-flash-lite.json';
	import grok4fastnonreasoning from '$lib/results/grok-4-fast-non-reasoning.json';
	import llama318b from '$lib/results/llama-3.1-8b.json';
	import deepseekv32 from '$lib/results/deepseek-v3.2.json';
	import novalite from '$lib/results/nova-lite.json';
	import trinitymini from '$lib/results/trinity-mini.json';
	import gptoss20b from '$lib/results/gpt-oss-20b.json';
	import Date from '../components/date.svelte';
	import FailGraph from '../components/fail_graph.svelte';
	import Header from '../components/header.svelte';
	import SuccessGraphMobile from '../components/success_graph_mobile.svelte';
	import SuccessGraph from '../components/success_graph.svelte';
	import TableOverview from '../components/table_overview.svelte';
	import FailGraphMobile from '../components/fail_graph_mobile.svelte';
	import EvalSummary from '../components/eval_summary.svelte';
	import CostGraph from '../components/cost_graph.svelte';
	import CostGraphMobile from '../components/cost_graph_mobile.svelte';
	import TotalTokensGraph from '../components/total_tokens_graph.svelte';
	import TotalTokensGraphMobile from '../components/total_tokens_graph_mobile.svelte';
	// import DurationGraph from '../components/duration_graph.svelte';
	// import DurationGraphMobile from '../components/duration_graph_mobile.svelte';
	// import SuccessFailGraph from '../components/success_fail_graph.svelte';

	const formatter = new Intl.NumberFormat('en-US');

	let rawResults = [
		gemini25flash,
		gemini25flashlite,
		gemini20flashlite,
		grok4fastnonreasoning,
		llama318b,
		deepseekv32,
		novalite,
		trinitymini,
		gptoss20b
	];

	let evalResults: eachEvalResultType[] = [];
	let evalResultsForGraphs: eachEvalResultType[] = [];
	let evalResultsForTables: eachEvalResultType[] = [];

	interface eachEvalResultType {
		model: string;
		averageScore: number;
		totalDuration: number | string;
		totalInputTokens: number | string;
		totalOutputTokens: number | string;
		totalTokens: number | string;
		totalCost: number;
		successCount: number;
		failCount: number;
		date: string;
	}

	function formatResult(rawResult: any) {
		for (const suit of rawResult.suites) {
			const eachEvalResult: eachEvalResultType = {
				model: suit.variantName,
				averageScore: suit.averageScore,
				totalDuration: 0,
				totalInputTokens: 0,
				totalOutputTokens: 0,
				totalTokens: 0,
				totalCost: 0,
				successCount: 0,
				failCount: 0,
				date: suit.createdAt.toString().split('T')[0]
			};
			for (const eachEval of suit.evals) {
				// if (eachEval.output?.error) continue;
				eachEvalResult.totalDuration = Number(eachEvalResult.totalDuration) + eachEval.duration;
				if (eachEval.scores[0]) {
					eachEvalResult.failCount += eachEval.scores[0].score == 0 ? 1 : 0;
					eachEvalResult.successCount += eachEval.scores[0].score == 1 ? 1 : 0;
				}
				if (eachEval.output && eachEval.output.steps) {
					for (const step of eachEval.output.steps) {
						eachEvalResult.totalInputTokens =
							Number(eachEvalResult.totalInputTokens) + step.usage.inputTokens;
						eachEvalResult.totalOutputTokens =
							Number(eachEvalResult.totalOutputTokens) + step.usage.outputTokens;
						eachEvalResult.totalTokens =
							Number(eachEvalResult.totalTokens) + step.usage.totalTokens;
						eachEvalResult.totalCost += Number(step.response.body.providerMetadata.gateway.cost);
					}
				}
			}

			evalResults.push(eachEvalResult);
		}
	}

	// formatResult(result);

	function loopThroughEvals() {
		for (let eachRawEval of rawResults) {
			formatResult(eachRawEval);
		}
		evalResults.sort((a, b) => b.successCount - a.successCount);
		evalResultsForTables = evalResults;
		evalResultsForTables = evalResultsForTables.map((item) => ({
			...item,
			averageScore: Number(item.averageScore.toFixed(2)),
			totalCost: Number(item.totalCost.toFixed(8)),
			totalDuration: formatter.format(Number(item.totalDuration)),
			totalInputTokens: formatter.format(Number(item.totalInputTokens)),
			totalOutputTokens: formatter.format(Number(item.totalOutputTokens)),
			totalTokens: formatter.format(Number(item.totalTokens))
		}));

		evalResultsForGraphs = evalResults.map((item) => ({
			...item,
			// successCount: item.successCount || 0.01,
			// failCount: item.failCount || 0.01,
			averageScore: Number(item.averageScore.toFixed(2)),
			totalCost: Number(item.totalCost.toFixed(8))
		}));
	}

	loopThroughEvals();

	let systemPrompt =
		rawResults[0].suites?.[0]?.evals?.[0]?.output?.steps?.[0]?.request?.body?.prompt?.[0]
			?.content ||
		'You are an Amharic riddle solver. Try your best to solve every riddle you are asked. Respond with one word or phrase only.';
</script>

<div class="h-screen">
	<div class="w-[90vw] md:w-2/3 m-auto pb-56">
		<!-- Header -->
		<Header time={rawResults[0].run.createdAt} />

		<div class="flex md:hidden mb-2">
			<Date time={rawResults[0].run.createdAt} />
		</div>

		<div class="rounded-lg bg-neutral-100 border overflow-clip mt-2 mb-6">
			<div class="bg-neutral-200 flex justify-between px-3 py-1 text-sm italic">
				<div>System Prompt</div>
			</div>
			<div class="px-3 py-1">
				{systemPrompt}
			</div>
		</div>

		<!-- Table Overview -->
		<TableOverview evalResults={evalResultsForTables} />

		<!-- Succes vs Fail Rates -->
		<div class="flex flex-col md:flex-row w-full gap-x-2 gap-y-4 md:gap-y-0 pb-5">
			<div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-green-500 rounded-full"></div>
					<div class="text-sm">Success Rates</div>
				</div>

				<SuccessGraph {evalResultsForGraphs} />
				<SuccessGraphMobile {evalResultsForGraphs} />
			</div>
			<div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-red-500 rounded-full"></div>
					<div class="text-sm">Fail Rates</div>
				</div>

				<FailGraph {evalResultsForGraphs} />
				<FailGraphMobile {evalResultsForGraphs} />
			</div>
		</div>

		<!-- Cost vs Duration -->
		<div class="flex flex-col md:flex-row w-full gap-x-2 gap-y-4 md:gap-y-0">
			<div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-teal-500 rounded-full"></div>
					<div class="text-sm">Cost</div>
				</div>

				<CostGraph {evalResultsForGraphs} />
				<CostGraphMobile {evalResultsForGraphs} />
			</div>
			<div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
					<div class="text-sm">Total Tokens</div>
				</div>

				<TotalTokensGraph {evalResultsForGraphs} />
				<TotalTokensGraphMobile {evalResultsForGraphs} />
			</div>
			<!-- <div class="w-full">
				<div class="flex items-center gap-x-2 pl-4 pb-2">
					<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
					<div class="text-sm">Duration</div>
				</div>

				<DurationGraph {evalResultsForGraphs} />
				<DurationGraphMobile {evalResultsForGraphs} />
			</div> -->
		</div>

		<!-- <SuccessFailGraph evalResults={evalResultsForGraphs} /> -->

		<EvalSummary {evalResults} />
	</div>
</div>
