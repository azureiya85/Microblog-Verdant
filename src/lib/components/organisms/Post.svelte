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

<div class="post">
	<PostHeader author={post.author} timestamp={post.timestamp} />

	<div class="post-content">
		<p>{post.content}</p>

		{#if post.image}
			<div class="post-image">
				<img src={post.image} alt="Post image" />
			</div>
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
	.post {
		background-color: var(--white);
		border-radius: var(--border-radius);
		padding: 16px;
		margin-bottom: 12px;
		box-shadow: var(--shadow);
	}

	.post-content {
		margin-bottom: 12px;
	}

	.post-content p {
		margin-bottom: 10px;
		word-break: break-word;
	}

	.post-image {
		border-radius: var(--border-radius);
		overflow: hidden;
		margin-top: 8px;
	}

	.post-image img {
		max-width: 100%;
		max-height: 400px;
		object-fit: cover;
	}
</style>
