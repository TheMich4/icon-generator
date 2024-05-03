<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconLoader2 } from '@tabler/icons-svelte';

	type Image = {
		url: string;
		revised_prompt: string;
	};

	let generating = $state(false);
	let images = $state<Array<Image>>([]);

	const generate = async () => {
		generating = true;

		const res = await fetch('/api/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: 'icon' })
		});

		generating = false;
		images = [await res.json(), ...images];
	};
</script>

<div class="container flex flex-col gap-4 p-4 h-full max-h-full w-full">
	<Button class="inline-flex gap-1" disabled={generating} onclick={generate}>
		{#if generating}
			<IconLoader2 class="size-4 animate-spin" />
			Generating...
		{:else}
			Generate Icon
		{/if}
	</Button>

	{#if images.length === 0}
		<p class="text-center">No images yet</p>
	{:else}
		<div class="grid gap-4 grid-cols-4 h-full overflow-auto border rounded-md">
			{#each images as image}
				<img src={image.url} alt={image.revised_prompt} class="w-full" />
			{/each}
		</div>
	{/if}
</div>
