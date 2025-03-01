import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';

export default defineConfig({
	plugins: [
		tailwindcss(),
		svelteInspector({
			/* plugin options */
		}),
		sveltekit() // Ensure this is last
	]
});
