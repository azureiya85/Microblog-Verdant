<script>
	import { createEventDispatcher } from 'svelte';

	// Using $state for reactive local state
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let errors = $state({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	let isSubmitting = $state(false);

	// Using $derived for computed values
	let nameValid = $derived(name.length >= 6);
	let emailValid = $derived(isValidEmail(email));
	let passwordValid = $derived(isValidPassword(password));
	let confirmPasswordValid = $derived(password === confirmPassword && confirmPassword !== '');
	let formValid = $derived(nameValid && emailValid && passwordValid && confirmPasswordValid);

	// Event dispatcher for form submission
	const dispatch = createEventDispatcher();

	// Email validation function
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return email.trim() !== '' && emailRegex.test(email);
	}

	// Password validation function
	function isValidPassword(password) {
		// Check for min 6 chars, lowercase, uppercase, number, and symbol
		const hasLowercase = /[a-z]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const hasNumber = /[0-9]/.test(password);
		const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

		return password.length >= 6 && hasLowercase && hasUppercase && hasNumber && hasSymbol;
	}

	// Validate form fields and show errors
	function validateField(field) {
		switch (field) {
			case 'name':
				if (name.trim() === '') {
					errors.name = 'Name cannot be empty';
				} else if (name.length < 6) {
					errors.name = 'Name must be at least 6 characters';
				} else {
					errors.name = '';
				}
				break;

			case 'email':
				if (email.trim() === '') {
					errors.email = 'Email cannot be empty';
				} else if (!isValidEmail(email)) {
					errors.email = 'Please enter a valid email address';
				} else {
					errors.email = '';
				}
				break;

			case 'password':
				if (password.trim() === '') {
					errors.password = 'Password cannot be empty';
				} else if (password.length < 6) {
					errors.password = 'Password must be at least 6 characters';
				} else if (!/[a-z]/.test(password)) {
					errors.password = 'Password must contain at least one lowercase letter';
				} else if (!/[A-Z]/.test(password)) {
					errors.password = 'Password must contain at least one uppercase letter';
				} else if (!/[0-9]/.test(password)) {
					errors.password = 'Password must contain at least one number';
				} else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
					errors.password = 'Password must contain at least one symbol';
				} else {
					errors.password = '';
				}
				break;

			case 'confirmPassword':
				if (confirmPassword.trim() === '') {
					errors.confirmPassword = 'Please confirm your password';
				} else if (password !== confirmPassword) {
					errors.confirmPassword = 'Passwords do not match';
				} else {
					errors.confirmPassword = '';
				}
				break;
		}
	}

	// Handle form submission
	function handleSubmit() {
		// Validate all fields
		validateField('name');
		validateField('email');
		validateField('password');
		validateField('confirmPassword');

		// Check if form is valid
		if (formValid) {
			isSubmitting = true;

			// In a real app, you would send this data to your backend
			dispatch('signup', {
				name,
				email,
				password
			});

			// Simulating async operation
			setTimeout(() => {
				isSubmitting = false;
			}, 1000);
		}
	}

	// Function to handle admin access
	function adminAccess() {
		window.location.href = '/timeline';
	}
</script>

<div class="signup-container">
	<!-- Left side - Image and tagline -->
	<div class="signup-banner">
		<div class="tagline-container">
			<h2>Connect, Share, Flourish</h2>
			<p>Join Verdant today and grow your social roots in our thriving community.</p>
		</div>
	</div>

	<!-- Right side - Signup form -->
	<div class="signup-form-container">
		<div class="form-header">
			<div class="logo">
				<svg
					viewBox="0 0 24 24"
					width="48"
					height="48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
						fill="#10B981"
					/>
					<path
						d="M7 7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z"
						fill="#10B981"
						fillOpacity="0.4"
					/>
				</svg>
			</div>
			<h1>Verdant</h1>
			<p>Create your account</p>
		</div>

		<form on:submit|preventDefault={handleSubmit} class="signup-form">
			<div class="form-group">
				<label for="name">Name</label>
				<input
					type="text"
					id="name"
					bind:value={name}
					on:blur={() => validateField('name')}
					class:error={errors.name}
					placeholder="Enter your name (min. 6 characters)"
				/>
				{#if errors.name}
					<span class="error-message">{errors.name}</span>
				{/if}
			</div>

			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					on:blur={() => validateField('email')}
					class:error={errors.email}
					placeholder="Enter your email address"
				/>
				{#if errors.email}
					<span class="error-message">{errors.email}</span>
				{/if}
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					on:blur={() => validateField('password')}
					class:error={errors.password}
					placeholder="Create a password"
				/>
				{#if errors.password}
					<span class="error-message">{errors.password}</span>
				{/if}
				{#if !errors.password && password}
					<div class="password-requirements">
						<div class="requirement" class:met={password.length >= 6}>
							<span class="indicator"></span>Min. 6 characters
						</div>
						<div class="requirement" class:met={/[a-z]/.test(password)}>
							<span class="indicator"></span>One lowercase letter
						</div>
						<div class="requirement" class:met={/[A-Z]/.test(password)}>
							<span class="indicator"></span>One uppercase letter
						</div>
						<div class="requirement" class:met={/[0-9]/.test(password)}>
							<span class="indicator"></span>One number
						</div>
						<div
							class="requirement"
							class:met={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)}
						>
							<span class="indicator"></span>One symbol
						</div>
					</div>
				{/if}
			</div>

			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					bind:value={confirmPassword}
					on:blur={() => validateField('confirmPassword')}
					class:error={errors.confirmPassword}
					placeholder="Confirm your password"
				/>
				{#if errors.confirmPassword}
					<span class="error-message">{errors.confirmPassword}</span>
				{/if}
			</div>

			<button type="submit" class="signup-button" disabled={!formValid || isSubmitting}>
				{isSubmitting ? 'Creating Account...' : 'Sign Up'}
			</button>

			<div class="login-link">
				Already have an account? <a href="/login">Log in</a>
			</div>
			<!-- Admin button to bypass signup -->
			<button type="button" class="admin-button" on:click={adminAccess}> Admin Access </button>
		</form>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		background-color: #f9fafb;
		color: #1f2937;
	}

	.signup-container {
		display: flex;
		min-height: 100vh;
		width: 100%;
	}

	.signup-banner {
		flex: 1;
		background-color: #10b981;
		background-image: linear-gradient(135deg, #10b981 0%, #047857 100%);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.signup-banner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E');
		opacity: 0.3;
	}

	.tagline-container {
		position: relative;
		z-index: 1;
		color: white;
		text-align: center;
		padding: 2rem;
		max-width: 80%;
	}

	.tagline-container h2 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.tagline-container p {
		font-size: 1.25rem;
		line-height: 1.5;
		opacity: 0.9;
	}

	.signup-form-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background-color: white;
		box-shadow: -4px 0 10px rgba(0, 0, 0, 0.05);
	}

	.form-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
	}

	.logo {
		margin-bottom: 1rem;
	}

	.form-header h1 {
		font-size: 2rem;
		font-weight: 700;
		color: #10b981;
		margin: 0.5rem 0;
	}

	.form-header p {
		color: #6b7280;
		font-size: 1rem;
		margin-top: 0.5rem;
	}

	.signup-form {
		width: 100%;
		max-width: 400px;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #4b5563;
	}

	input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 1rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
	}

	input:focus {
		outline: none;
		border-color: #10b981;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
	}

	input.error {
		border-color: #ef4444;
	}

	input.error:focus {
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
	}

	.error-message {
		display: block;
		color: #ef4444;
		font-size: 0.875rem;
		margin-top: 0.5rem;
	}

	.password-requirements {
		margin-top: 0.75rem;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.requirement {
		display: flex;
		align-items: center;
		margin-bottom: 0.25rem;
	}

	.requirement .indicator {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #d1d5db;
		margin-right: 0.5rem;
	}

	.requirement.met .indicator {
		background-color: #10b981;
	}

	.requirement.met {
		color: #10b981;
	}

	.signup-button {
		width: 100%;
		padding: 0.75rem 1rem;
		background-color: #10b981;
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
		margin-top: 1rem;
	}

	.signup-button:hover {
		background-color: #059669;
	}

	.signup-button:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.4);
	}

	.signup-button:disabled {
		background-color: #d1d5db;
		cursor: not-allowed;
	}

	.login-link {
		text-align: center;
		margin-top: 1.5rem;
		font-size: 0.875rem;
		color: #6b7280;
	}

	.login-link a {
		color: #10b981;
		text-decoration: none;
		font-weight: 500;
	}

	.login-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.signup-container {
			flex-direction: column;
		}

		.signup-banner {
			min-height: 200px;
			flex: 0 0 auto;
		}

		.tagline-container {
			padding: 1.5rem;
		}

		.tagline-container h2 {
			font-size: 1.75rem;
		}

		.tagline-container p {
			font-size: 1rem;
		}

		.signup-form-container {
			padding: 1.5rem;
			flex: 1 0 auto;
		}
	}
	/* Admin button styling */
	.admin-button {
		width: 100%;
		padding: 0.75rem 1rem;
		background-color: #e5e7eb;
		color: #4b5563;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
		margin-top: 1rem;
	}

	.admin-button:hover {
		background-color: #d1d5db;
	}
</style>
