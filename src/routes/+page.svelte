<script lang="ts">
	let generating = $state(false);
	let images = $state([]);

	const generate = async() => {
	  generating = true

		const res = await fetch('/api/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: 'icon' })
		});

		generating = false;
		images = [...images, res.json()];
	}
</script>

<h1>Generate Icon</h1>
<button disabled={generating} on:click={generate}>
	{#if generating}
		Generating...
	{:else}
		Generate Icon
	{/if}
</button>

<div>
{#each images as image}
	<img src={image.url} alt={image.revised_prompt} />
{/each}
</div>
