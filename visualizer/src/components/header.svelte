<script lang="ts">
	import CodeSnippet from '../components/code_snippet.svelte';
	import { Brain, Github } from '@lucide/svelte';
	import Date from './date.svelte';

	let { time } = $props();

	let timeState = $derived(time);
</script>

<div class="flex justify-between items-center pt-5 pb-3 pr-5">
	<div class="md:text-xl flex gap-x-2 items-center font-semibold">
		<Brain size={22} />
		<div>Enkokilish Bench</div>
	</div>

	<div class="flex gap-x-2 items-center">
		<div class="hidden md:flex">
			<Date time={timeState} />
		</div>

		<a href="https://github.com/ScholarXIV/enkokilish_bench" class="hover:text-blue-500">
			<Github size={22} />
		</a>
	</div>
</div>
<div class="gap-y-2 flex flex-col pt-2 pb-5 italic">
	<div>
		Enkokilish (እንቆቅልሽ) are Ethiopian/Amharic riddles. Riddles in Amharic are difficult, require
		in-depth understanding of the language and are often used to test one's knowledge and reasoning
		skills. So based on Enkokilish, we've made Enkokilish Bench to evaluate the ability of Large
		Language Models (LLMs) to understand, reason, and solve Amharic riddles.
	</div>
	<div>
		This benchmark is built using <a href="https://evalite.dev" class="underline text-blue-600"
			>Evalite</a
		>
		as the evals framework,
		<a href="https://ai-sdk.dev" class="underline text-blue-600">AI-SDK</a>
		to make calls to
		<a href="https://vercel.com/ai-gateway" class="underline text-blue-600">Vercel AI Gateway</a>
		to a variety of models. This benchmark is completely free and open-source from dataset to eval code,
		and to this visualization site. To quickly setup, clone the repo, set your AI Gateway API Key in the
		<CodeSnippet snippet=".env" /> file and just
		<CodeSnippet snippet="pnpm eval:dev" /> then open <CodeSnippet snippet="localhost:3006" /> and explore.
		You can run the evals in node mode (just by running <CodeSnippet snippet="node main.ts" />)
		which enables you to export the results in JSON format, or run the evals in a CI/CD pipeline.
	</div>
</div>
