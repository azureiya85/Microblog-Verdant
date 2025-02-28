<script lang="ts">
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Use the Svelte 5 $props rune
	let { children } = $props();
</script>

{@render children?.()}
