<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconLoader2 } from '@tabler/icons-svelte';
	import { Textarea } from '$lib/components/ui/textarea';

	type Image = {
		url: string;
		revised_prompt: string;
	};

	let generating = $state(false);
	let images = $state<Array<Image>>([]);
	let prompt = $state('');

	const generate = async () => {
		generating = true;

		const res = await fetch('/api/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt })
		});

		const newImages = await res.json();

		generating = false;
		prompt = '';

		newImages.forEach((image: Image) => {
			if (image.url) images = [image, ...images];
		});
	};
</script>

<div class="container flex flex-col gap-4 p-4 h-full max-h-full w-full">
	<Textarea class="h-24" placeholder="Enter a prompt..." bind:value={prompt} />
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
		<div class="grid gap-4 grid-cols-4 h-full overflow-auto border rounded-md p-2">
			{#each images as image (image.url)}
				<img
					src={image.url}
					alt={image.revised_prompt}
					title={image.revised_prompt}
					class="w-full rounded-md border border-border"
				/>
			{/each}
		</div>
	{/if}
</div>
