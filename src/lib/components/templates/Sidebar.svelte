<!-- src/lib/components/templates/Sidebar.svelte -->
<script lang="ts">
	import Avatar from '../atoms/Avatar.svelte';
	import Button from '../atoms/Button.svelte';
	import CreatePost from '../organisms/CreatePost.svelte';

	let showCreatePost = $state(false);
	let currentUser = $state({
		id: 'current-user',
		name: 'Current User',
		username: 'currentuser',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
	});

	let {
		onSubmit = (post: any, _isEditing: boolean) => {},
		createPostInstance = $bindable(null as CreatePost | null)
	} = $props();

	function toggleCreatePost() {
		showCreatePost = !showCreatePost;
	}
</script>

<div class="sidebar">
	<!-- Top Section -->
	<div>
		<h1 class="title">Verdant</h1>
		<nav class="nav">
			<a href="#" class="nav-link">Timeline</a>
			<a href="#" class="nav-link">Notifications</a>
			<a href="#" class="nav-link">Favorites</a>
			<div class="spacer"></div>
			<a href="#" class="nav-link">Explore</a>
			<a href="#" class="nav-link">Search</a>
			<a href="#" class="nav-link">Announcements</a>
			<div class="spacer"></div>
			<a href="#" class="nav-link">Settings</a>
			<a href="#" class="nav-link">More</a>
		</nav>
	</div>

	<!-- Bottom Section -->
	<div>
		<Button onClick={toggleCreatePost} className="post-button">Post</Button>
		<div class="user-info">
			<Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" className="user-avatar" />
			<span class="username">@{currentUser.username}</span>
		</div>
	</div>

	{#if showCreatePost}
		<div class="create-post-ui">
			<CreatePost {onSubmit} onClose={toggleCreatePost} bind:this={createPostInstance} />
		</div>
	{/if}
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 256px; /* Matches w-64 (16rem) */
		background-color: #ffffff;
		box-shadow: 4px 0 10px rgba(0, 0, 0, 0.05);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-right: 1px solid #e5e7eb; /* Light gray border */
	}

	.title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #a8d5ba; /* Pastel green */
		margin-bottom: 1.5rem;
		font-family: 'Euclid Circular A', 'Geometric Sans', sans-serif;
	}

	.nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.nav-link {
		color: #333333; /* Soft black */
		font-size: 1rem;
		text-decoration: none;
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: #a8d5ba; /* Pastel green on hover */
	}

	.spacer {
		height: 1.5rem; /* Medium gap */
	}

	.post-button {
		width: 100%;
		padding: 0.75rem 1rem;
		background-color: #a8d5ba; /* Pastel green */
		color: #ffffff;
		border: none;
		border-radius: 9999px; /* Full rounding */
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
		margin-bottom: 1rem;
	}

	.post-button:hover {
		background-color: #8bb89f; /* Slightly darker pastel green */
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.user-avatar {
		border: 2px solid #a8d5ba; /* Pastel green border */
	}

	.username {
		color: #333333; /* Soft black */
		font-size: 0.875rem;
	}

	.create-post-ui {
		position: fixed;
		left: 256px; /* Matches sidebar width */
		top: 1rem;
		width: 320px; /* Matches w-80 */
		max-height: 80vh;
		overflow-y: auto;
		background-color: #ffffff;
		border: 1px solid #a8d5ba; /* Pastel green border */
		border-radius: 0.375rem;
		padding: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 20;
		transition: background-color 0.2s;
	}

	.create-post-ui:hover {
		background-color: #f9fafb; /* Light gray hover, matches sign-in bg */
	}
</style>
