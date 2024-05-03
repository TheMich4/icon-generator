<script lang="ts">
	import { Button } from '$lib/components/ui/button';

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
		images = [...images, await res.json()];
	};
</script>

<div class="container flex flex-col gap-4 p-4">
	<Button disabled={generating} onclick={generate}>
		{#if generating}
			Generating...
		{:else}
			Generate Icon
		{/if}
	</Button>

	<div>
		{#each images as image}
			<img src={image.url} alt={image.revised_prompt} />
		{/each}
	</div>
</div>
