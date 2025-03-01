<!-- src/lib/components/molecules/PostActions.svelte -->
<script lang="ts">
	let {
		likes = 0,
		comments = 0,
		reposts = 0,
		onLike = (liked: boolean) => {},
		onComment = () => {},
		onRepost = (reposted: boolean) => {},
		onDelete = null as null | (() => void),
		onEdit = null as null | (() => void)
	} = $props();

	let liked = $state(false);
	let reposted = $state(false);

	function handleLike() {
		liked = !liked;
		onLike(liked);
	}

	function handleRepost() {
		reposted = !reposted;
		onRepost(reposted);
	}
</script>

<div class="actions-container">
	<button
		onclick={() => onComment()}
		class="action-button"
		aria-label="Comment ({comments} comments)"
	>
		<svg
			class="icon"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
		<span>{comments}</span>
	</button>
	<button
		onclick={handleLike}
		class="action-button {liked ? 'active' : ''}"
		aria-label="Like ({likes} likes)"
	>
		<svg
			class="icon"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			/>
		</svg>
		<span>{likes}</span>
	</button>
	<button
		onclick={handleRepost}
		class="action-button {reposted ? 'active' : ''}"
		aria-label="Repost ({reposts} reposts)"
	>
		<svg
			class="icon"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path d="M17 1l4 4-4 4" />
			<path d="M3 11v-1a4 4 0 0 1 4-4h14" />
			<path d="M7 23l-4-4 4-4" />
			<path d="M21 13v1a4 4 0 0 1-4 4H3" />
		</svg>
		<span>{reposts}</span>
	</button>
	{#if onEdit}
		<button onclick={() => onEdit?.()} class="action-button" aria-label="Edit post">
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path d="M12 20h9" />
				<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
			</svg>
		</button>
	{/if}
	{#if onDelete}
		<button onclick={() => onDelete?.()} class="action-button" aria-label="Delete post">
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path d="M3 6h18" />
				<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				<path d="M10 11v6" />
				<path d="M14 11v6" />
				<path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.actions-container {
		display: flex;
		gap: 1.5rem; /* Matches gap-6 */
		padding-top: 0.5rem; /* Matches pt-2 */
		border-top: 1px solid rgba(168, 213, 186, 0.5); /* Pastel green with 50% opacity */
	}

	.action-button {
		display: flex;
		align-items: center;
		gap: 0.25rem; /* Matches gap-1 */
		color: #333333; /* Soft black */
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.2s;
		font-size: 0.875rem;
	}

	.action-button:hover {
		color: #a8d5ba; /* Pastel green on hover */
	}

	.action-button.active {
		color: #a8d5ba; /* Pastel green when liked/reposted */
	}

	.icon {
		width: 1.25rem; /* Matches w-5 */
		height: 1.25rem; /* Matches h-5 */
	}
</style>
