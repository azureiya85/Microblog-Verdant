import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

// Define user type for type safety
export type User = {
	username: string;
	email?: string;
	objectId?: string; // Backendless user ID
	// Add other user properties as needed
};

// Create a writable store for authentication state
function createAuthStore() {
	// Initialize the store with null (not authenticated)
	const { subscribe, set, update } = writable<User | null>(null);

	return {
		subscribe,

		// Set the user in the store
		setUser: (user: User | null) => set(user),

		// Login function that makes API call and updates store
		login: async (username: string, password: string) => {
			try {
				const response = await fetch('/api/auth/login', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username, password })
				});

				const result = await response.json();

				if (result.success) {
					set(result.user);
					return { success: true };
				} else {
					return { success: false, message: result.message || 'Login failed. Please try again.' };
				}
			} catch (error) {
				console.error('Login error:', error);
				return { success: false, message: 'Network error occurred' };
			}
		},

		// Register function that makes API call
		register: async (email: string, username: string, password: string) => {
			try {
				const response = await fetch('/api/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, username, password })
				});

				return await response.json();
			} catch (error) {
				console.error('Registration error:', error);
				return { success: false, message: 'Network error occurred' };
			}
		},

		// Delete account function
		deleteAccount: async (username?: string) => {
			try {
				const response = await fetch('/api/auth/delete-account', {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username })
				});

				const result = await response.json();

				if (result.success) {
					set(null);
				}

				return result;
			} catch (error) {
				console.error('Account deletion error:', error);
				return { success: false, message: 'Network error occurred' };
			}
		},

		// Logout function that makes API call and clears store
		logout: async () => {
			try {
				await fetch('/api/auth/logout', { method: 'POST' });
				set(null);
				goto('/login');
				return { success: true };
			} catch (error) {
				console.error('Logout error:', error);
				return { success: false };
			}
		},

		// Initialize the store from cookie data (called in __layout.svelte)
		initialize: (userData: User | null) => {
			if (userData) {
				set(userData);
			}
		}
	};
}

// Export the store
export const authStore = createAuthStore();
