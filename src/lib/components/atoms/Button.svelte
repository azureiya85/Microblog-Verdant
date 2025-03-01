<!-- src/lib/components/atoms/Button.svelte -->
<script lang="ts">
	let {
		onClick = ((_event: MouseEvent) => {}) as (event: MouseEvent) => void,
		className = '',
		disabled = false,
		children
	} = $props();
</script>

<button onclick={onClick} {disabled} class={className}>
	{@render children()}
</button>

<style>
	/* No base styles; rely entirely on className from parent */
</style>
