<!-- src/lib/components/atoms/Input.svelte -->
<script lang="ts">
	// Use $props instead of export let
	let {
		type = 'text',
		placeholder = '',
		maxLength = undefined,
		error = '',
		rows = 3 // Only used for textarea
	} = $props();

	// Handle value as state separately
	let value = $state('');
</script>

{#if type === 'textarea'}
	<div class="input-wrapper">
		<textarea {placeholder} bind:value maxlength={maxLength} {rows} class={error ? 'has-error' : ''}
		></textarea>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
{:else}
	<div class="input-wrapper">
		<input {type} {placeholder} bind:value maxlength={maxLength} class={error ? 'has-error' : ''} />
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
{/if}

<style>
	.input-wrapper {
		width: 100%;
		margin-bottom: 8px;
	}

	input,
	textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--light-gray);
		border-radius: var(--border-radius);
		font-size: 1rem;
		resize: none;
	}

	input:focus,
	textarea:focus {
		border-color: var(--primary-color);
		outline: none;
	}

	.has-error {
		border-color: var(--error-color);
	}

	.error {
		color: var(--error-color);
		font-size: 0.85rem;
		margin-top: 4px;
	}
</style>
