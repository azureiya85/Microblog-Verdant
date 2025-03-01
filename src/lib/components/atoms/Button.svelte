<!-- src/lib/components/atoms/Button.svelte -->
<script lang="ts">
	let {
		onClick = ((_event: MouseEvent) => {}) as (event: MouseEvent) => void,
		className = '',
		disabled = false,
		children
	} = $props();
</script>

<button onclick={onClick} {disabled} class="button {className}">
	{@render children()}
</button>

<style>
	.button {
		padding: 0.75rem 1rem; /* Matches px-4 py-2 */
		border-radius: 0.375rem; /* Matches rounded-lg */
		background-color: #a8d5ba; /* Pastel green default */
		color: #ffffff;
		border: none;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.button:hover:not(:disabled) {
		background-color: #8bb89f; /* Slightly darker pastel green */
	}

	.button:disabled {
		background-color: #d1d5db; /* Gray, matches sign-in disabled state */
		cursor: not-allowed;
	}
</style>
