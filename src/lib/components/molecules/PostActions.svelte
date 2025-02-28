<!-- src/lib/components/molecules/PostActions.svelte -->

<script lang="ts">
	let {
		likes = 0,
		comments = 0,
		reposts = 0,
		onLike = (liked: boolean) => {},
		onComment = () => {},
		onRepost = (reposted: boolean) => {},
		onDelete = null as null | (() => void), // Only provided if the user owns the post
		onEdit = null as null | (() => void) // Only provided if the user owns the post
	} = $props();

	// State declarations using $state
	let liked = $state(false);
	let reposted = $state(false);

	function handleLike(event: MouseEvent) {
		liked = !liked;
		onLike(liked); // Call with the liked state
	}

	function handleRepost(event: MouseEvent) {
		reposted = !reposted;
		onRepost(reposted); // Call with the reposted state
	}
</script>

<div class="post-actions">
	<!-- Comment Button -->
	<button class="action-button" onclick={() => onComment()} title="Comment">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
		<span>{comments}</span>
	</button>

	<!-- Like Button -->
	<button class="action-button {liked ? 'liked' : ''}" onclick={handleLike} title="Like">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
			/>
		</svg>
		<span>{likes}</span>
	</button>

	<!-- Repost Button -->
	<button class="action-button {reposted ? 'reposted' : ''}" onclick={handleRepost} title="Repost">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M17 1l4 4-4 4" />
			<path d="M3 11v-1a4 4 0 0 1 4-4h14" />
			<path d="M7 23l-4-4 4-4" />
			<path d="M21 13v1a4 4 0 0 1-4 4H3" />
		</svg>
		<span>{reposts}</span>
	</button>

	<!-- Edit Button (if user owns the post) -->
	{#if onEdit}
		<button class="action-button edit" onclick={() => onEdit?.()} title="Edit">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 20h9" />
				<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
			</svg>
		</button>
	{/if}

	<!-- Delete Button (if user owns the post) -->
	{#if onDelete}
		<button class="action-button delete" onclick={() => onDelete?.()} title="Delete">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
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
