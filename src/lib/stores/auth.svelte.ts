// Main Auth, src/lib/auth.svelte.ts

import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import Backendless from 'backendless';

// Initialize Backendless with your credentials
Backendless.initApp('D515D982-A533-4F3E-B0F5-E70936FCD98E', '7D7139F7-370B-441B-BDDA-8062A5F71153');
interface User {
	username: string;
	email?: string;
}

let user = $state<User | null>(null);

// Function to get the user state
export function getUser(): User | null {
	console.log('[DEBUG] getUser() called. Current user:', user);
	return user;
}

// Function to update user state
export function setUser(newUser: User | null): void {
	console.log('[DEBUG] setUser() called. New user:', newUser);
	user = newUser ? { username: newUser.username, email: newUser.email } : null;
	console.log('[DEBUG] User state after setUser:', user);
}

// Login function
export async function login(username: string, password: string): Promise<boolean> {
	try {
		console.log('[DEBUG] Attempting login with:', username);
		const loggedInUser = await Backendless.UserService.login(username, password, true);
		console.log('[DEBUG] Backendless login response:', loggedInUser);
		setUser({
			username: loggedInUser.username as string,
			email: loggedInUser.email as string | undefined
		});
		document.cookie = 'auth=true; path=/';
		console.log('[DEBUG] Login successful:', username);
		return true;
	} catch (error) {
		console.log('[DEBUG] Login failed for:', username, error);
		return false;
	}
}

// Logout function
export function logout(): void {
	console.log('[DEBUG] logout() called.');
	Backendless.UserService.logout();
	document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	setUser(null);
	console.log('[DEBUG] User logged out, redirecting to home...');
	goto('/timeline');
}

// Register function for Backendless
export async function register(
	username: string,
	email: string,
	password: string
): Promise<boolean> {
	try {
		const user = new Backendless.User();
		user.username = username;
		user.email = email;
		user.password = password;
		const registeredUser = await Backendless.UserService.register(user);
		setUser({
			username: registeredUser.username as string,
			email: registeredUser.email as string | undefined
		});
		document.cookie = 'auth=true; path=/';
		console.log('[DEBUG] Registration successful:', username);
		return true;
	} catch (error) {
		const err = error as Error;
		console.log('[DEBUG] Registration failed:', err.message || 'Unknown error');
		throw err;
	}
}

// Delete account function
export async function deleteAccount(): Promise<void> {
	try {
		const currentUser = await Backendless.UserService.getCurrentUser();
		if (currentUser) {
			await Backendless.Data.of('Users').remove(currentUser);
			logout();
			console.log('[DEBUG] Account deleted');
		}
	} catch (error) {
		console.log('[DEBUG] Delete account failed:', error);
	}
}

// Check authentication on page load
export function checkAuth(): void {
	if (!browser) return;
	const isAuthenticated = document.cookie.includes('auth=true');
	if (isAuthenticated && !user) {
		Backendless.UserService.getCurrentUser()
			.then((currentUser) => {
				if (currentUser) {
					setUser({
						username: currentUser.username as string,
						email: currentUser.email as string | undefined
					});
				}
			})
			.catch((error) => {
				console.log('[DEBUG] Failed to fetch current user:', error);
			});
	}
	console.log('[DEBUG] checkAuth() called. Authenticated:', isAuthenticated);
}

// Redirect if unauthorized
export function protectRoute(): void {
	$effect(() => {
		console.log('[DEBUG] protectRoute() executed. User:', user);
		if (!user) {
			console.log('[DEBUG] User is null. Not redirecting from auth.svelte.ts');
		}
	});
}

// Initialize authentication state
checkAuth();
