<!-- src/lib/components/atoms/Input.svelte -->
<script lang="ts">
	let {
		type = 'text',
		placeholder = '',
		maxLength = undefined as number | undefined,
		error = '',
		rows = 3,
		value = $bindable(''),
		className = ''
	} = $props();
</script>

{#if type === 'textarea'}
	<div class="input-wrapper">
		<textarea
			{placeholder}
			bind:value
			maxlength={maxLength}
			{rows}
			class="input {className} {error ? 'has-error' : ''}"
		></textarea>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
{:else}
	<div class="input-wrapper">
		<input
			{type}
			{placeholder}
			bind:value
			maxlength={maxLength}
			class="input {className} {error ? 'has-error' : ''}"
		/>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
{/if}

<style>
	.input-wrapper {
		width: 100%;
		margin-bottom: 0.5rem; /* Matches sign-in page spacing */
	}

	.input {
		width: 100%;
		padding: 0.75rem 1rem; /* Matches sign-in page */
		border: 1px solid #d1d5db; /* Light gray from sign-in page */
		border-radius: 0.375rem;
		font-size: 1rem;
		resize: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	.input:focus {
		outline: none;
		border-color: #a8d5ba; /* Pastel green */
		box-shadow: 0 0 0 3px rgba(168, 213, 186, 0.2); /* Pastel green shadow */
	}

	.has-error {
		border-color: #ef4444; /* Error red from sign-in page */
	}

	.has-error:focus {
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2); /* Error red shadow */
	}

	.error {
		color: #ef4444; /* Error red */
		font-size: 0.875rem;
		margin-top: 0.5rem;
	}
</style>
