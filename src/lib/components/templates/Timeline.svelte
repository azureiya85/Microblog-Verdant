<!-- src/lib/components/templates/Timeline.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { posts as initialPosts } from '$lib/data/posts';
	import CreatePost from '../organisms/CreatePost.svelte';
	import Post from '../organisms/Post.svelte';

	// ✅ Define Post interface to enforce TypeScript safety
	interface PostType {
		id: number;
		content: string;
		image: string | null;
		likes: number;
		reposts: number;
		comments: number;
		edited?: boolean;
		author: {
			id: string;
			name: string;
			username: string;
			avatar: string;
		};
	}

	// ✅ Define state with correct types
	let posts = $state<PostType[]>([]);
	let createPostComponent: CreatePost | null = null;

	// ✅ Ensure correct type when setting state
	onMount(() => {
		posts = [...(initialPosts as PostType[])];
	});

	// ✅ Type parameters for event handlers
	function handlePostSubmit(post: PostType, isEditing: boolean) {
		if (isEditing) {
			// Update existing post
			const index = posts.findIndex((p) => p.id === post.id);
			if (index !== -1) {
				const updatedPost: PostType = {
					...posts[index],
					content: post.content,
					image: post.image,
					edited: true
				};
				posts = [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)];
			}
		} else {
			// Add new post
			const newPost: PostType = {
				...post,
				likes: 0,
				reposts: 0,
				comments: 0
			};
			posts = [newPost, ...posts]; // Add to beginning of array
		}
	}

	function handleLike(post: PostType, liked: boolean) {
		const index = posts.findIndex((p) => p.id === post.id);
		if (index !== -1) {
			const updatedPost = { ...posts[index] };
			updatedPost.likes = liked ? updatedPost.likes + 1 : updatedPost.likes - 1;
			posts = [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)];
		}
	}

	function handleRepost(post: PostType, reposted: boolean) {
		const index = posts.findIndex((p) => p.id === post.id);
		if (index !== -1) {
			const updatedPost = { ...posts[index] };
			updatedPost.reposts = reposted ? updatedPost.reposts + 1 : updatedPost.reposts - 1;
			posts = [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)];
		}
	}

	function handleComment(post: PostType) {
		alert(`Comment functionality for post: ${post.id}`);
	}

	function handleDeletePost(post: PostType) {
		if (confirm('Are you sure you want to delete this post?')) {
			posts = posts.filter((p) => p.id !== post.id);
		}
	}

	function handleEditPost(post: PostType) {
		if (createPostComponent) {
			createPostComponent.startEditing(post);
			document.querySelector('.create-post')?.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<div class="timeline">
	<div class="timeline-header">
		<h1>Home</h1>
	</div>

	<CreatePost onSubmit={handlePostSubmit} bind:this={createPostComponent} />

	<div class="posts-container">
		{#each posts as post (post.id)}
			<Post
				{post}
				onLike={(liked) => handleLike(post, liked)}
				onRepost={(reposted) => handleRepost(post, reposted)}
				onComment={() => handleComment(post)}
				onDelete={() => handleDeletePost(post)}
				onEdit={() => handleEditPost(post)}
			/>
		{/each}
	</div>
</div>

<style>
	.timeline {
		max-width: 600px;
		margin: 0 auto;
	}

	.timeline-header {
		padding: 16px;
		border-bottom: 1px solid var(--light-gray);
		position: sticky;
		top: 0;
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(5px);
		z-index: 10;
	}

	.timeline-header h1 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
	}

	.posts-container {
		padding: 0 16px;
	}
</style>
