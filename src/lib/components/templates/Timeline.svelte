<script lang="ts">
	import { onMount } from 'svelte';
	import { posts as initialPosts } from '$lib/data/posts.ts';
	import Post from '../organisms/Post.svelte';
	import Sidebar from './Sidebar.svelte';
	import CreatePost from '../organisms/CreatePost.svelte';
	import { getUser } from '$lib/stores/auth.svelte.ts';

	interface CommentType {
		id: number;
		content: string;
		author: { id: string; name: string; username: string; avatar: string };
		timestamp: Date;
	}

	interface PostType {
		id: number;
		content: string;
		image: string | null;
		likes: number;
		reposts: number;
		comments: number;
		commentsList?: CommentType[];
		edited?: boolean;
		author: { id: string; name: string; username: string; avatar: string };
		timestamp: Date;
	}

	let posts = $state<PostType[]>([]);
	let createPostComponent = $state<CreatePost | null>(null);
	let currentUser = $derived(getUser());

	// Initialize default user if not authenticated
	let defaultUser = $state({
		id: 'current-user',
		name: 'Current User',
		username: 'currentuser',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
	});

	// Get the active user (authenticated or default)
	let activeUser = $derived(currentUser || defaultUser);

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
			// Ensure we use the activeUser for the author of the post
			const newPost: PostType = {
				...post,
				likes: 0,
				reposts: 0,
				comments: 0,
				author: {
					id: activeUser.id,
					name: activeUser.name || activeUser.username,
					username: activeUser.username,
					avatar: activeUser.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'
				}
			};
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

	function handleComment(postId: number, comment: CommentType | null) {
		const index = posts.findIndex((p) => p.id === postId);
		if (index === -1) return;

		// Initialize comments list if it doesn't exist
		if (!posts[index].commentsList) {
			posts[index].commentsList = [];
			posts = [...posts]; // Trigger reactivity
		}

		// If a new comment is provided, add it
		if (comment) {
			const updatedPost = {
				...posts[index],
				comments: posts[index].comments + 1,
				commentsList: [...(posts[index].commentsList || []), comment]
			};
			posts = [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)];
		}
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

// src/lib/components/templates/Timeline.svelte
<div class="container">
	<Sidebar onSubmit={handlePostSubmit} bind:createPostInstance={createPostComponent} />
	<div class="content">
		<h1 class="header">Home</h1>
		{#each posts as post (post.id)}
			<Post
				{post}
				onLike={(liked: boolean) => handleLike(post, liked)}
				onRepost={(reposted: boolean) => handleRepost(post, reposted)}
				onComment={handleComment}
				onDelete={() => handleDeletePost(post)}
				onEdit={() => handleEditPost(post)}
				currentUser={activeUser}
			/>
		{/each}
	</div>
</div>

<style>
	.container {
		background-color: #f3fce8;
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
