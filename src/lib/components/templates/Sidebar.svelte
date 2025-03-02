<!-- src/lib/components/templates/Sidebar.svelte -->
<script lang="ts">
	import Avatar from '../atoms/Avatar.svelte';
	import Button from '../atoms/Button.svelte';
	import CreatePost from '../organisms/CreatePost.svelte';
	import { getUser, logout } from '$lib/stores/auth.svelte.ts'; // Adjust path if needed
	import { goto } from '$app/navigation';

	let showCreatePost = $state(false);
	let currentUser = $state(getUser()); // Initialize with current user from auth

	// Update currentUser reactively when auth state changes
	$effect(() => {
		currentUser = getUser();
	});

	let {
		onSubmit = (post: any, _isEditing: boolean) => {},
		createPostInstance = $bindable(null as CreatePost | null)
	} = $props();

	function toggleCreatePost() {
		showCreatePost = !showCreatePost;
	}

	function handleSignOut() {
		logout(); // Use auth module's logout function
	}

	function goToLanding() {
		goto('/'); // Redirect to landing page (login/register)
	}

	function handleSignIn() {
		goto('/'); // Redirect to landing page for sign-in
	}
</script>

<div class="sidebar">
	<!-- Top Section -->
	<div>
		<h1 class="title" onclick={goToLanding}>Verdant</h1>
		<nav class="nav">
			<a href="/timeline" class="nav-link">Timeline</a>
			<a href="/timeline" class="nav-link">Notifications</a>
			<a href="/timeline" class="nav-link">Favorites</a>
			<div class="spacer"></div>
			<a href="/timeline" class="nav-link">Explore</a>
			<a href="/timeline" class="nav-link">Search</a>
			<a href="/timeline" class="nav-link">Announcements</a>
			<div class="spacer"></div>
			<a href="/timeline" class="nav-link">Settings</a>
			<a href="/timeline" class="nav-link">More</a>
		</nav>
	</div>

	<!-- Bottom Section -->
	<div class="bottom-section">
		{#if currentUser}
			<Button onClick={toggleCreatePost} className="post-button">Post</Button>
			<Button onClick={handleSignOut} className="sign-out-button">Sign Out</Button>
			<div class="user-info">
				<Avatar
					src={currentUser?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
					alt={currentUser?.username || 'User avatar'}
					size="sm"
					className="user-avatar"
				/>
				<span class="username">@{currentUser?.username}</span>
			</div>
		{:else}
			<Button onClick={handleSignIn} className="sign-in-button">Sign In</Button>
		{/if}
	</div>

	{#if showCreatePost && currentUser}
		<div class="create-post-ui">
			<CreatePost {onSubmit} onClose={toggleCreatePost} bind:this={createPostInstance} />
		</div>
	{/if}
</div>

<style>
	.sidebar {
		position: fixed;
		align-items: center;
		top: 0;
		bottom: 0;
		left: 0;
		width: 256px;
		background-color: #ffffff;
		box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-right: 1px solid #e5e7eb;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #a8d5ba;
		margin-bottom: 1.5rem;
		text-align: center;
		font-family: 'Outfit', 'Geometric Sans', sans-serif;
		cursor: pointer;
		transition: color 0.2s;
	}

	.title:hover {
		color: #8bb89f;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.nav-link {
		color: #333333;
		font-size: 1rem;
		text-decoration: none;
		transition:
			color 0.2s,
			background-color 0.2s,
			padding 0.2s;
		padding: 0.5rem 1.5rem;
		border-radius: 9999px;
		display: block;
		width: 80%;
		margin: 0 auto;
	}

	.nav-link:hover {
		color: #647f6f;
		background-color: #b0d9c0;
	}

	.spacer {
		height: 1.5rem;
	}

	.bottom-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	:global(.post-button) {
		width: 100%;
		padding: 1rem 1.5rem;
		background-color: #a8d5ba; /* Pastel green */
		color: #ffffff;
		border: none;
		border-radius: 9999px;
		font-size: 1.125rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	:global(.post-button:hover:not(:disabled)) {
		background-color: #8bb89f;
	}

	:global(.post-button:disabled) {
		background-color: #d1d5db;
	}

	:global(.sign-out-button) {
		width: 100%;
		padding: 1rem 1.5rem;
		background-color: #f4a8a8; /* Soft pastel red */
		color: #ffffff;
		border: none;
		border-radius: 9999px;
		font-size: 1.125rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	:global(.sign-out-button:hover:not(:disabled)) {
		background-color: #e89090;
	}

	:global(.sign-out-button:disabled) {
		background-color: #d1d5db;
	}

	:global(.sign-in-button) {
		width: 100%;
		padding: 1rem 1.5rem;
		background-color: #a8d5ba; /* Pastel green, matching Post button */
		color: #ffffff;
		border: none;
		border-radius: 9999px;
		font-size: 1.125rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	:global(.sign-in-button:hover:not(:disabled)) {
		background-color: #8bb89f;
	}

	:global(.sign-in-button:disabled) {
		background-color: #d1d5db;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.user-avatar {
		border: 2px solid #a8d5ba;
	}

	.username {
		color: #333333;
		font-size: 0.875rem;
	}

	.create-post-ui {
		position: absolute;
		bottom: 8rem;
		left: 20rem;
		transform: translateX(-50%);
		width: 320px;
		max-height: 80vh;
		overflow-y: auto;
		background-color: #ffffff;
		border: 1px solid #a8d5ba;
		border-radius: 0.375rem;
		padding: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 20;
		transition: background-color 0.2s;
	}

	.create-post-ui:hover {
		background-color: #f9fafb;
	}
</style>
