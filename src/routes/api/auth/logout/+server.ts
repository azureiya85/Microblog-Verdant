import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	// Delete the auth cookie by setting its path to match the one used when setting it
	cookies.delete('auth', { path: '/' });

	return json({ success: true, message: 'Logged out successfully' });
};
