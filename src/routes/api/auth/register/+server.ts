import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
		const { email, username, password } = await request.json();

		// Basic validation
		if (!email || !username || !password) {
			return json(
				{ success: false, message: 'Email, username, and password are required' },
				{ status: 400 }
			);
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ success: false, message: 'Invalid email format' }, { status: 400 });
		}

		// Password length validation
		if (password.length < 6) {
			return json(
				{ success: false, message: 'Password must be at least 6 characters long' },
				{ status: 400 }
			);
		}

		// Backendless API details
		// const BACKENDLESS_API_URL = 'https://api.backendless.com';
		const APP_ID = '97A8EFE3-6D77-492C-8376-2D3072C9B4B7'; // Replace with your Backendless App ID
		const API_KEY = '0A8BD422-473E-4240-85B4-8D51E8E60FE2'; // Replace with your Backendless API Key

		const backendlessResponse = await fetch(
			`https://api.backendless.com/97A8EFE3-6D77-492C-8376-2D3072C9B4B7/0A8BD422-473E-4240-85B4-8D51E8E60FE2/data/Users`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'application-id': APP_ID,
					'secret-key': API_KEY
				},
				body: JSON.stringify({ email, username, password })
			}
		);

		// Log full response details
		console.log('Backendless response:', {
			status: backendlessResponse.status,
			statusText: backendlessResponse.statusText,
			headers: Object.fromEntries([...backendlessResponse.headers.entries()]),
			url: backendlessResponse.url
		});

		// Read response as text
		const responseText = await backendlessResponse.text();
		console.log('Backendless response body:', responseText);

		// Attempt to parse JSON response safely
		let responseData;
		if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
			try {
				responseData = JSON.parse(responseText);
			} catch (parseError) {
				console.error('Failed to parse response as JSON:', parseError, responseText);
				return json(
					{ success: false, message: 'Failed to parse server response', rawResponse: responseText },
					{ status: 500 }
				);
			}
		} else {
			console.error('Unexpected non-JSON response:', responseText);
			return json(
				{ success: false, message: 'Unexpected server response format', rawResponse: responseText },
				{ status: 500 }
			);
		}

		// Handle API success or failure
		if (backendlessResponse.ok) {
			return json({
				success: true,
				message: 'Registration successful',
				userId: responseData.objectId
			});
		} else {
			return json(
				{
					success: false,
					message: responseData?.message || 'Registration failed',
					code: responseData?.code,
					details: responseData
				},
				{ status: backendlessResponse.status }
			);
		}
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		const errorStack = error instanceof Error ? error.stack : 'No stack trace';

		console.error('Registration error:', {
			message: errorMessage,
			stack: errorStack,
			error
		});

		return json(
			{ success: false, message: `Server error during registration: ${errorMessage}` },
			{ status: 500 }
		);
	}
};
