<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';

	let { evalResults } = $props();
</script>

<div class="rounded-lg border overflow-clip mb-8">
	<Table.Root class="border-b border">
		<Table.Header class="bg-gray-200">
			<Table.Row>
				<Table.Head class="font-semibold">model</Table.Head>
				<Table.Head class="font-semibold">success</Table.Head>
				<Table.Head class="font-semibold">fail</Table.Head>
				<Table.Head class="font-semibold">avgScore</Table.Head>
				<Table.Head class="font-semibold">InTok</Table.Head>
				<Table.Head class="font-semibold">OutTok</Table.Head>
				<Table.Head class="font-semibold">TotTok</Table.Head>
				<Table.Head class="font-semibold">Cost</Table.Head>
				<!-- <Table.Head class="font-semibold">Duration</Table.Head> -->
				<Table.Head class="font-semibold">Date</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each evalResults as result (result.totalTokens)}
				<Table.Row>
					<Table.Cell class="font-semibold">{result.model}</Table.Cell>
					<Table.Cell class="text-emerald-600 font-semibold">{result.successCount}</Table.Cell>
					<Table.Cell class="text-red-600 font-semibold">{result.failCount}</Table.Cell>
					<Table.Cell>{result.averageScore}</Table.Cell>
					<Table.Cell>{result.totalInputTokens}</Table.Cell>
					<Table.Cell>{result.totalOutputTokens}</Table.Cell>
					<Table.Cell class="text-blue-600 font-semibold">{result.totalTokens}</Table.Cell>
					<Table.Cell class="text-teal-600 font-semibold">${result.totalCost}</Table.Cell>
					<!-- <Table.Cell>{result.totalDuration} ms</Table.Cell> -->
					<Table.Cell>{result.date}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Footer class="bg-gray-200">
			<Table.Row>
				<Table.Cell class="font-semibold" colspan={9}></Table.Cell>
			</Table.Row>
		</Table.Footer>
	</Table.Root>
</div>
