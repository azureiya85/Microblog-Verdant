<script lang="ts">
	import Avatar from '../atoms/Avatar.svelte';
	import { formatTimestamp } from '../../data/posts.ts';

	// Use $props() instead of export let
	let { author = { name: '', username: '', avatar: '' }, timestamp = new Date() } = $props();
</script>

<div class="post-header">
	<div class="avatar-container">
		<Avatar src={author.avatar} alt={author.name} />
	</div>
	<div class="user-info">
		<div class="name-time">
			<span class="name">{author.name}</span>
			<span class="time">{formatTimestamp(timestamp)}</span>
		</div>
		<span class="username">@{author.username}</span>
	</div>
</div>

<style>
	.post-header {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		margin-bottom: 8px;
	}

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.name-time {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.name {
		font-weight: 700;
		font-size: 1rem;
	}

	.username {
		color: var(--dark-gray);
		font-size: 0.9rem;
	}

	.time {
		color: var(--dark-gray);
		font-size: 0.85rem;
	}
</style>
