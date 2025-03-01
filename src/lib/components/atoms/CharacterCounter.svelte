<!-- src/lib/components/atoms/CharacterCounter.svelte -->
<script lang="ts">
	let { current = 0, max = 350 } = $props();
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
		color: #6b7280; /* Dark gray from sign-in page */
		text-align: right;
	}

	.near-limit {
		color: #f59e0b; /* Orange shade */
	}

	.at-limit {
		color: #ef4444; /* Error red from sign-in page */
	}
</style>
