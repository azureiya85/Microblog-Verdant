<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Use the Svelte 5 $props rune
	import '@fontsource-variable/figtree';
	import '@fontsource-variable/outfit';
	let { children } = $props();
</script>

{@render children?.()}

<style>
	:global(body) {
		font-family: 'Figtree Variable', sans-serif;
	}
</style>
