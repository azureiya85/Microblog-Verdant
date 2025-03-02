<script lang="ts">
	import Button from '../atoms/Button.svelte';

	let { onSubmit = (comment) => {}, currentUser = null } = $props();

	let content = $state('');
	let isSubmitting = $state(false);

	function handleSubmit() {
		if (!content.trim()) return;
		isSubmitting = true;

		const comment = {
			id: Date.now(),
			content,
			author: currentUser,
			timestamp: new Date()
		};

		onSubmit(comment);
		content = '';
		isSubmitting = false;
	}
</script>

<div class="create-comment">
	<textarea bind:value={content} placeholder="Add a comment..." class="comment-input" rows="2"
	></textarea>
	<div class="comment-actions">
		<Button
			onClick={handleSubmit}
			disabled={!content.trim() || isSubmitting}
			className="comment-button"
		>
			Comment
		</Button>
	</div>
</div>

<style>
	.create-comment {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.comment-input {
		padding: 0.5rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.375rem;
		resize: none;
		font-family: inherit;
		font-size: 0.875rem;
	}

	.comment-input:focus {
		outline: none;
		border-color: #a8d5ba;
		box-shadow: 0 0 0 3px rgba(168, 213, 186, 0.2);
	}

	.comment-actions {
		display: flex;
		justify-content: flex-end;
	}

	:global(.comment-button) {
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		border-radius: 0.375rem;
		background-color: #24b3a8;
		color: #ffffff;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	:global(.comment-button:hover:not(:disabled)) {
		background-color: #30d5c8;
	}

	:global(.comment-button:disabled) {
		background-color: #1d8d84;
	}
</style>
