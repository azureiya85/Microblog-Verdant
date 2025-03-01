<!-- src/lib/components/molecules/PostHeader.svelte -->
<script lang="ts">
	import Avatar from '../atoms/Avatar.svelte';
	import { formatTimestamp } from '../../data/posts.ts';

	let { author = { name: '', username: '', avatar: '' }, timestamp = new Date() } = $props();
</script>

<div class="header-container">
	<div class="user-container">
		<Avatar src={author.avatar} alt={author.name} size="md" className="header-avatar" />
		<div class="user-details">
			<span class="name">{author.name}</span>
			<div class="username">@{author.username}</div>
		</div>
	</div>
	<span class="timestamp">{formatTimestamp(timestamp)}</span>
</div>

<style>
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.5rem;
	}

	.user-container {
		display: flex;
		align-items: center;
		gap: 0.75rem; /* Matches gap-3 */
	}

	.header-avatar {
		border: 2px solid #a8d5ba; /* Pastel green border */
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-weight: 700;
		font-size: 1rem;
		color: #333333; /* Soft black */
	}

	.username {
		color: #6b7280; /* Gray from sign-in page */
		font-size: 0.875rem;
	}

	.timestamp {
		color: #6b7280; /* Gray */
		font-size: 0.875rem;
	}
</style>
