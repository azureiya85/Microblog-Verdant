// src/lib/data/posts.js
export const posts = [
	{
		id: 1,
		author: {
			id: 'user1',
			name: 'Alex Johnson',
			username: 'alexj',
			avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
		},
		content:
			'Just deployed my new Svelte project! The reactivity system is amazing. #svelte #webdev',
		likes: 24,
		reposts: 5,
		comments: 3,
		timestamp: new Date('2025-02-27T14:32:00')
	},
	{
		id: 2,
		author: {
			id: 'user2',
			name: 'Morgan Smith',
			username: 'msmith',
			avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
		},
		content:
			'Working with $state and $derived in Svelte 5 has completely changed how I think about state management. Everything feels so intuitive now!',
		likes: 17,
		reposts: 2,
		comments: 7,
		timestamp: new Date('2025-02-28T09:15:00')
	},
	{
		id: 3,
		author: {
			id: 'user3',
			name: 'Taylor Wilson',
			username: 'twil',
			avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
		},
		content:
			'Beautiful day for hiking! 🏔️ The views from Mount Rainier are absolutely breathtaking. Nature is the best reset button.',
		likes: 42,
		reposts: 12,
		comments: 8,
		timestamp: new Date('2025-02-28T11:05:00'),
		image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500'
	}
];

// Helper function to format timestamp
export function formatTimestamp(date) {
	const now = new Date();
	const diff = Math.floor((now - date) / 1000); // Difference in seconds

	if (diff < 60) {
		return `${diff}s`;
	} else if (diff < 3600) {
		return `${Math.floor(diff / 60)}m`;
	} else if (diff < 86400) {
		return `${Math.floor(diff / 3600)}h`;
	} else {
		return date.toLocaleDateString();
	}
}
