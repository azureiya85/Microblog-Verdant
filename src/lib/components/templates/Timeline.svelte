<!-- src/lib/components/templates/Timeline.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { posts as initialPosts } from '$lib/data/posts.ts';
	import Post from '../organisms/Post.svelte';
	import Sidebar from './Sidebar.svelte';
	import CreatePost from '../organisms/CreatePost.svelte';

	interface PostType {
		id: number;
		content: string;
		image: string | null;
		likes: number;
		reposts: number;
		comments: number;
		edited?: boolean;
		author: { id: string; name: string; username: string; avatar: string };
	}

	let posts = $state<PostType[]>([]);
	let createPostComponent = $state<CreatePost | null>(null);

	onMount(() => {
		posts = [...(initialPosts as PostType[])];
	});

	function handlePostSubmit(post: PostType, isEditing: boolean) {
		if (isEditing) {
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
			const newPost: PostType = { ...post, likes: 0, reposts: 0, comments: 0 };
			posts = [newPost, ...posts];
		}
	}

	function handleLike(post: PostType, liked: boolean) {
		const index = posts.findIndex((p) => p.id === post.id);
		if (index !== -1) {
			const updatedPost = {
				...posts[index],
				likes: liked ? posts[index].likes + 1 : posts[index].likes - 1
			};
			posts = [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)];
		}
	}

	function handleRepost(post: PostType, reposted: boolean) {
		const index = posts.findIndex((p) => p.id === post.id);
		if (index !== -1) {
			const updatedPost = {
				...posts[index],
				reposts: reposted ? posts[index].reposts + 1 : posts[index].reposts - 1
			};
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
		}
	}
</script>

<div class="container">
	<Sidebar onSubmit={handlePostSubmit} bind:createPostInstance={createPostComponent} />
	<div class="content">
		<h1 class="header">Home</h1>
		{#each posts as post (post.id)}
			<Post
				{post}
				onLike={(liked: boolean) => handleLike(post, liked)}
				onRepost={(reposted: boolean) => handleRepost(post, reposted)}
				onComment={() => handleComment(post)}
				onDelete={() => handleDeletePost(post)}
				onEdit={() => handleEditPost(post)}
			/>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		min-height: 100vh;
		width: 100%;
	}

	.content {
		margin-left: 256px; /* Matches sidebar width */
		flex: 1;
		padding: 1rem;
		max-width: 672px; /* Matches max-w-2xl (42rem) */
		margin-left: auto;
		margin-right: auto;
	}

	.header {
		font-size: 1.25rem;
		font-weight: 700;
		color: #333333; /* Soft black */
		margin-bottom: 1rem;
	}
</style>
