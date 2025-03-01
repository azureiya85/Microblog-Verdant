<!-- src/lib/components/atoms/Avatar.svelte -->
<script lang="ts">
	type Size = 'sm' | 'md' | 'lg';
	let { src = '', alt = 'User avatar', size = 'md' as Size, className = '' } = $props();

	const sizeStyles: Record<Size, string> = {
		sm: 'width: 32px; height: 32px;',
		md: 'width: 48px; height: 48px;',
		lg: 'width: 64px; height: 64px;'
	};
</script>

<div class="avatar {className}" style={sizeStyles[size]}>
	<img {src} {alt} class="avatar-img" />
</div>

<style>
	.avatar {
		border-radius: 9999px; /* Fully rounded */
		overflow: hidden;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
