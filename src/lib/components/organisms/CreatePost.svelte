<!-- src/lib/components/organisms/CreatePost.svelte -->

<script lang="ts">
	import Avatar from '../atoms/Avatar.svelte';
	import Input from '../atoms/Input.svelte';
	import CharacterCounter from '../atoms/CharacterCounter.svelte';

	// Define types properly
	interface Post {
		id: number;
		content: string;
		image: string | null;
		author: {
			id: string;
			name: string;
			username: string;
			avatar: string;
		};
		timestamp: Date;
	}

	type SubmitCallback = (post: Post, isEditing: boolean) => void;

	// Use $props() instead of export let
	let { onSubmit = ((post: Post, isEditing: boolean) => {}) as SubmitCallback } = $props();

	// State declarations using $state
	let content = $state<string>('');
	let image = $state<string | null>(null);
	let isSubmitting = $state<boolean>(false);
	let isEditing = $state<boolean>(false);
	let postId = $state<number | null>(null);

	let currentUser = $state({
		id: 'current-user',
		name: 'Current User',
		username: 'currentuser',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
	});

	// Derived state (use .by for complex derivations)
	let characterCount = $derived.by(() => content.length);
	let isValid = $derived.by(() => content.trim().length > 0 && characterCount <= 350);

	function handleImageUpload() {
		// Simulate image upload - in a real app, this would trigger a file dialog
		alert('Image upload functionality would go here');
	}

	function resetForm() {
		content = '';
		image = null;
		isEditing = false;
		postId = null;
	}

	function handleSubmit() {
		if (!isValid) return;

		isSubmitting = true;

		// Create post object
		const post: Post = {
			id: isEditing && postId !== null ? postId : Date.now(),
			content,
			image,
			author: currentUser,
			timestamp: new Date()
		};

		// Submit to parent component
		onSubmit(post, isEditing);

		// Reset form
		resetForm();
		isSubmitting = false;
	}

	// Correcting function signature
	export function startEditing(post: { id: number; content: string; image: string | null }) {
		content = post.content;
		image = post.image;
		isEditing = true;
		postId = post.id;
	}
</script>

<div class="create-post">
	<div class="post-form">
		<div class="avatar-container">
			<Avatar src={currentUser.avatar} alt={currentUser.name} />
		</div>
		<div class="input-container">
		
<Input
  type="textarea"
  placeholder="What's happening?"
  on:input={(e: Event) => (content = (e.target as HTMLTextAreaElement).value)}
  maxLength={350}
  rows={3}
/>
>

			{#if image}
				<div class="image-preview">
					<img src={image} alt="Uploaded image" />
					<button class="remove-image" onclick={() => (image = null)}>×</button>
				</div>
			{/if}

			<div class="post-actions">
				<div class="post-tools">
					<button class="icon-button" onclick={handleImageUpload} title="Upload Image">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
							<circle cx="8.5" cy="8.5" r="1.5" />
							<polyline points="21 15 16 10 5 21" />
						</svg>
					</button>
				</div>

				<div class="post-submit">
					<CharacterCounter current={characterCount} max={350} />

					<button class="submit-button" disabled={!isValid || isSubmitting} onclick={handleSubmit}>
						{isEditing ? 'Update' : 'Post'}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.create-post {
		background-color: var(--white);
		border-radius: var(--border-radius);
		padding: 16px;
		box-shadow: var(--shadow);
		margin-bottom: 16px;
	}

	.post-form {
		display: flex;
		gap: 12px;
	}

	.avatar-container {
		flex-shrink: 0;
	}

	.input-container {
		flex-grow: 1;
	}

	.post-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 8px;
	}

	.post-tools {
		display: flex;
		gap: 8px;
	}

	.post-submit {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.image-preview {
		position: relative;
		margin-top: 8px;
		border-radius: var(--border-radius);
		overflow: hidden;
		max-width: 100%;
	}

	.image-preview img {
		max-width: 100%;
		max-height: 250px;
		object-fit: cover;
	}

	.remove-image {
		position: absolute;
		top: 8px;
		right: 8px;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		cursor: pointer;
	}

	/* Added styling for manually created buttons */
	.icon-button {
		background: none;
		border: none;
		cursor: pointer;
		color: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8px;
		border-radius: 50%;
	}

	.submit-button {
		background: var(--primary-color);
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: var(--border-radius);
		cursor: pointer;
		font-weight: bold;
	}

	.submit-button:disabled {
		background: var(--gray);
		cursor: not-allowed;
	}
</style>

