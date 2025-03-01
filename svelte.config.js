// svelte.config.js
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess({
			postcss: true // Enable PostCSS for Tailwind processing
		}),
		mdsvex()
	],

	kit: {
		adapter: adapter()
	},

	extensions: ['.svelte', '.svx']
};

export default config;
