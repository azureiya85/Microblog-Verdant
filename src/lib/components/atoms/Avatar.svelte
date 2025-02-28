<!-- src/lib/components/atoms/Avatar.svelte -->
<script>
	export let src = '';
	export let alt = 'User avatar';
	export let size = 'md'; // sm, md, lg
</script>

<div class="avatar {size}">
	<img {src} {alt} />
</div>

<style>
	.avatar {
		border-radius: 50%;
		overflow: hidden;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.sm {
		width: 32px;
		height: 32px;
	}

	.md {
		width: 48px;
		height: 48px;
	}

	.lg {
		width: 64px;
		height: 64px;
	}
</style>
