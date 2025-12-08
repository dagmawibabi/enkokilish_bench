<script lang="ts">
	const formatter = new Intl.NumberFormat('en-US');

	let { evalResults } = $props();

	// Total Duration and Cost
	const totalDuration = $derived(
		formatter.format(
			evalResults.reduce((acc, item) => Number(acc) + Number(item.totalDuration ?? 0), 0)
		)
	);
	const totalCost = $derived(
		formatter.format(Number(evalResults.reduce((acc, item) => acc + item.totalCost, 0)))
	);
	const totalInTok = $derived(
		formatter.format(
			evalResults.reduce((acc, item) => Number(acc) + Number(item.totalInputTokens ?? 0), 0)
		)
	);
	const totalOutTok = $derived(
		formatter.format(
			evalResults.reduce((acc, item) => Number(acc) + Number(item.totalOutputTokens ?? 0), 0)
		)
	);
	const totalTok = $derived(
		formatter.format(
			evalResults.reduce((acc, item) => Number(acc) + Number(item.totalTokens ?? 0), 0)
		)
	);
</script>

<div class="w-full rounded-lg bg-neutral-100 border overflow-clip mt-5 mb-6">
	<div class="bg-neutral-200 flex justify-between px-3 py-1 text-sm italic">
		<div>Eval Summary</div>
	</div>
	<div class="flex flex-col md:flex-row justify-between">
		<div>
			<div class="px-3 py-1">
				Total Models: {evalResults.length}
			</div>
			<div class="px-3 py-1 border-t">
				Total Cost: ${totalCost}
			</div>
		</div>
		<div>
			<div class="px-3 py-1 border-t">
				Total Duration: {totalDuration} ms
			</div>
			<div class="px-3 py-1 border-t">
				Total Input Tokens: {totalInTok}
			</div>
		</div>
		<div>
			<div class="px-3 py-1 border-t">
				Total Output Tokens: {totalOutTok}
			</div>
			<div class="px-3 py-1 border-t">
				Total Tokens: {totalTok}
			</div>
		</div>
	</div>
</div>
