<script lang="ts">
	import PostHeader from '../molecules/PostHeader.svelte';
	import PostActions from '../molecules/PostActions.svelte';
	import CreateComment from '../molecules/CreateComment.svelte';

	let {
		post = {},
		onLike = () => {},
		onComment = () => {},
		onRepost = () => {},
		onDelete = null,
		onEdit = null,
		currentUserId = 'current-user',
		currentUser = null
	} = $props();

	let isOwnPost = $derived(post.author.id === currentUserId);
	let showComments = $state(false);

	function toggleComments() {
		showComments = !showComments;
		if (showComments && !post.commentsList) {
			onComment(post.id, null); // Load comments when opened
		}
	}

	function handleAddComment(comment) {
		onComment(post.id, comment);
	}
</script>

<div class="post-container">
	<PostHeader author={post.author} timestamp={post.timestamp} />
	<div class="post-content">
		<p>{post.content}</p>
		{#if post.image}
			<img src={post.image} alt="Post image" class="post-image" />
		{/if}
	</div>
	<PostActions
		likes={post.likes}
		comments={post.comments}
		reposts={post.reposts}
		{onLike}
		onComment={toggleComments}
		{onRepost}
		onDelete={isOwnPost ? onDelete : null}
		onEdit={isOwnPost ? onEdit : null}
	/>

	{#if showComments}
		<div class="comments-container">
			<CreateComment onSubmit={handleAddComment} {currentUser} />

			{#if post.commentsList && post.commentsList.length > 0}
				<div class="comments-list">
					{#each post.commentsList as comment (comment.id)}
						<div class="comment">
							<div class="comment-header">
								<img src={comment.author.avatar} alt={comment.author.name} class="comment-avatar" />
								<div class="comment-user">
									<span class="comment-name">{comment.author.name}</span>
									<span class="comment-username">@{comment.author.username}</span>
								</div>
							</div>
							<div class="comment-content">
								<p>{comment.content}</p>
							</div>
						</div>
					{/each}
				</div>
			{:else if post.commentsList && post.commentsList.length === 0}
				<div class="no-comments">No comments yet. Be the first to comment!</div>
			{:else}
				<div class="loading-comments">Loading comments...</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.post-container {
		margin-bottom: 1rem;
		border-radius: 0.375rem;
		border: 1px solid #e5e7eb;
		background-color: #ffffff;
		padding: 1rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.post-content {
		margin-top: 0.5rem;
		color: #333333;
	}

	.post-content p {
		margin-bottom: 0.5rem;
		word-break: break-word;
	}

	.post-image {
		margin-top: 0.5rem;
		max-width: 100%;
		height: 24rem;
		object-fit: cover;
		border-radius: 0.375rem;
	}

	.comments-container {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.comments-list {
		margin-top: 1rem;
	}

	.comment {
		padding: 0.75rem;
		margin-bottom: 0.5rem;
		background-color: #f9fafb;
		border-radius: 0.375rem;
	}

	.comment-header {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.comment-avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
		margin-right: 0.5rem;
	}

	.comment-user {
		display: flex;
		flex-direction: column;
	}

	.comment-name {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.comment-username {
		font-size: 0.75rem;
		color: #6b7280;
	}

	.comment-content {
		font-size: 0.875rem;
	}

	.no-comments,
	.loading-comments {
		text-align: center;
		color: #6b7280;
		padding: 1rem 0;
		font-style: italic;
		font-size: 0.875rem;
	}
</style>
