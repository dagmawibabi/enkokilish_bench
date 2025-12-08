<script lang="ts">
	let { time } = $props();

	const d = $derived(new Date(time));

	const dateStr = $derived(
		new Intl.DateTimeFormat('en', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d)
	);

	const timeStr = $derived(
		new Intl.DateTimeFormat('en', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(d)
	);
</script>

<div class="w-fit px-2 py-1 text-sm italic rounded-lg bg-neutral-200 border">
	<div>{dateStr} | {timeStr}</div>
</div>
