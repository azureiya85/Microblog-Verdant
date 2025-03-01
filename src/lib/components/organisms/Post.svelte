<!-- src/lib/components/organisms/Post.svelte -->
<script lang="ts">
	import PostHeader from '../molecules/PostHeader.svelte';
	import PostActions from '../molecules/PostActions.svelte';

	let {
		post = {},
		onLike = () => {},
		onComment = () => {},
		onRepost = () => {},
		onDelete = null,
		onEdit = null,
		currentUserId = 'current-user'
	} = $props();

	let isOwnPost = $derived(post.author.id === currentUserId);
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
		{onComment}
		{onRepost}
		onDelete={isOwnPost ? onDelete : null}
		onEdit={isOwnPost ? onEdit : null}
	/>
</div>

<style>
	.post-container {
		margin-bottom: 1rem; /* Matches mb-4 */
		border-radius: 0.375rem; /* Matches rounded-lg */
		border: 1px solid #e5e7eb; /* Light gray from sign-in page */
		background-color: #ffffff;
		padding: 1rem; /* Matches p-4 */
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle shadow */
	}

	.post-content {
		margin-top: 0.5rem; /* Matches mt-2 */
		color: #333333; /* Soft black */
	}

	.post-content p {
		margin-bottom: 0.5rem;
		word-break: break-word;
	}

	.post-image {
		margin-top: 0.5rem; /* Matches mt-2 */
		max-width: 100%;
		height: 24rem; /* Matches h-96 (384px) */
		object-fit: cover;
		border-radius: 0.375rem; /* Matches rounded-lg */
	}
</style>
