import { json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, cookies, fetch }) => {
    try {
        // Get user data from request body
        const userData = await request.json();

        // Get the auth cookie
        const authCookie = cookies.get('auth');
        let user = null;

        // If there's an auth cookie, use that for the delete operation
        if (authCookie) {
            user = JSON.parse(authCookie);
        } else if (userData.username) {
            // Otherwise use the username from the request
            user = { username: userData.username };
        } else {
            return json({
                success: false,
                message: 'No user information provided'
            }, { status: 400 });
        }

        // Backendless API configuration
        const BACKENDLESS_API_URL = 'https://api.backendless.com';
        const APP_ID = 'YOUR_APP_ID'; // Replace with your Backendless App ID
        const API_KEY = 'YOUR_API_KEY'; // Replace with your Backendless API Key

        // First, we need to find the user's objectId in Backendless
        // This typically requires a login operation or a search operation

        // Option 1: If you know the user is logged in to Backendless
        // You can use the user-token from a previous Backendless login
        // This is the most secure approach but requires prior Backendless login

        // Option 2: Search for the user by username or email
        // This is less secure but simpler for this example
        const findUserResponse = await fetch(
            `${BACKENDLESS_API_URL}/${APP_ID}/data/Users?where=username%3D'${encodeURIComponent(user.username)}'`,
                                             {
                                                 method: 'GET',
                                                 headers: {
                                                     'Content-Type': 'application/json',
                                                     'application-id': APP_ID,
                                                     'secret-key': API_KEY
                                                 }
                                             }
        );

        if (!findUserResponse.ok) {
            const errorData = await findUserResponse.json();
            return json({
                success: false,
                message: errorData.message || 'Failed to find user'
            }, { status: findUserResponse.status });
        }

        const users = await findUserResponse.json();

        if (!users || users.length === 0) {
            return json({
                success: false,
                message: 'User not found'
            }, { status: 404 });
        }

        // Get the user's objectId from the search results
        const objectId = users[0].objectId;

        // Delete the user by objectId
        const deleteResponse = await fetch(`${BACKENDLESS_API_URL}/${APP_ID}/data/Users/${objectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'application-id': APP_ID,
                'secret-key': API_KEY
            }
        });

        if (deleteResponse.ok) {
            // If the account was deleted successfully, also delete the auth cookie
            cookies.delete('auth', { path: '/' });

            return json({
                success: true,
                message: 'Account deleted successfully'
            });
        } else {
            const errorData = await deleteResponse.json();

            return json({
                success: false,
                message: errorData.message || 'Failed to delete account'
            }, { status: deleteResponse.status });
        }

    } catch (error) {
        console.error('Account deletion error:', error);

        return json({
            success: false,
            message: 'Server error during account deletion'
        }, { status: 500 });
    }
};
