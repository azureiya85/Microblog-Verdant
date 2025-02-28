<script lang="ts">
  import { authStore } from '$lib/stores/auth';

  // Use $props rune to accept properties
  let { fallback } = $props<{ fallback?: any }>();

  // Derived value to check auth status
  let isAuthenticated = $derived(!!$authStore);
</script>

{#if isAuthenticated}
  <slot />
{:else if fallback}
  {fallback}
{:else}
  <!-- Default fallback content -->
  <p>Please log in to view this content</p>
{/if}
