<!-- src/lib/components/organisms/CreatePost.svelte -->
<script lang="ts">
	import Input from '../atoms/Input.svelte';
	import Button from '../atoms/Button.svelte';
	import CharacterCounter from '../atoms/CharacterCounter.svelte';

	interface Post {
		id: number;
		content: string;
		image: string | null;
		author: { id: string; name: string; username: string; avatar: string };
		timestamp: Date;
	}

	let { onSubmit = (post: Post, isEditing: boolean) => {}, onClose = () => {} } = $props();

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

	let characterCount = $derived(content.length);
	let isValid = $derived(content.trim().length > 0 && characterCount <= 350);

	function handleImageUpload() {
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

		const post: Post = {
			id: isEditing && postId !== null ? postId : Date.now(),
			content,
			image,
			author: currentUser,
			timestamp: new Date()
		};

		onSubmit(post, isEditing);
		resetForm();
		isSubmitting = false;
		onClose();
	}

	export function startEditing(post: { id: number; content: string; image: string | null }) {
		content = post.content;
		image = post.image;
		isEditing = true;
		postId = post.id;
	}
</script>

<div class="create-post-container">
	<Input
		type="textarea"
		placeholder="What's happening?"
		bind:value={content}
		maxLength={350}
		rows={3}
		className="create-post-input"
	/>

	{#if image}
		<div class="image-preview">
			<img src={image} alt="Preview of image to be posted" class="preview-image" />
			<button on:click={() => (image = null)} class="remove-image">×</button>
		</div>
	{/if}

	<div class="actions-container">
		<Button onClick={handleImageUpload} className="image-upload-button">
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
				<circle cx="8.5" cy="8.5" r="1.5" />
				<polyline points="21 15 16 10 5 21" />
			</svg>
		</Button>
		<div class="submit-container">
			<CharacterCounter current={characterCount} max={350} />
			<Button onClick={handleSubmit} disabled={!isValid || isSubmitting} className="submit-button">
				{isEditing ? 'Update' : 'Post'}
			</Button>
		</div>
	</div>
</div>

<style>
	.create-post-container {
		display: flex;
		flex-direction: column;
		gap: 1rem; /* Matches gap-4 */
	}

	.create-post-input {
		border: 1px solid #a8d5ba; /* Pastel green border */
	}

	.create-post-input:focus {
		border-color: #a8d5ba; /* Reinforced pastel green on focus */
		box-shadow: 0 0 0 3px rgba(168, 213, 186, 0.2); /* Matches sign-in focus */
	}

	.image-preview {
		position: relative;
		overflow: hidden;
		border-radius: 0.375rem; /* Matches rounded-lg */
		margin-top: 0.5rem;
	}

	.preview-image {
		max-width: 100%;
		height: 10rem; /* Matches h-40 (160px) */
		object-fit: cover;
	}

	.remove-image {
		position: absolute;
		top: 0.5rem; /* Matches top-2 */
		right: 0.5rem; /* Matches right-2 */
		width: 1.5rem; /* Matches w-6 */
		height: 1.5rem; /* Matches h-6 */
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.6); /* Matches bg-black/60 */
		color: #ffffff;
		border: none;
		border-radius: 9999px; /* Fully rounded */
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.remove-image:hover {
		background-color: rgba(0, 0, 0, 0.8);
	}

	.actions-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	.image-upload-button {
		background-color: transparent;
		color: #333333; /* Soft black */
		padding: 0.5rem;
	}

	.image-upload-button:hover {
		background-color: #f9fafb; /* Light gray hover */
	}

	.icon {
		width: 1.25rem; /* Matches w-5 */
		height: 1.25rem; /* Matches h-5 */
	}

	.submit-container {
		display: flex;
		align-items: center;
		gap: 1rem; /* Matches gap-4 */
	}

	.submit-button {
		background-color: #a8d5ba; /* Pastel green */
		color: #ffffff;
		border-radius: 9999px; /* Fully rounded */
		padding: 0.75rem 1rem;
	}

	.submit-button:disabled {
		background-color: #d1d5db; /* Gray from sign-in page */
	}
</style>
