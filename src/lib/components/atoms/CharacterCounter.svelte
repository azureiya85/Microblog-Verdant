<!-- src/lib/components/atoms/CharacterCounter.svelte -->
<script>
	// Use $props instead of export let
	let { current = 0, max = 350 } = $props();

	// Use $derived properly with the assignment syntax
	let remainingChars = $derived(max - current);
	let isNearLimit = $derived(remainingChars <= 20);
	let isAtLimit = $derived(remainingChars <= 0);
</script>

<div class="counter {isNearLimit ? 'near-limit' : ''} {isAtLimit ? 'at-limit' : ''}">
	{remainingChars}
</div>

<style>
	.counter {
		font-size: 0.8rem;
		color: var(--dark-gray);
		text-align: right;
	}

	.near-limit {
		color: orange;
	}

	.at-limit {
		color: var(--error-color);
	}
</style>
