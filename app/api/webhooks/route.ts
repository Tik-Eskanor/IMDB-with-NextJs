
import { Webhook } from 'svix';
import { NextResponse } from 'next/server';
import { createOrUpdateUser, deleteUser } from '@/lib/resource/user';
import { clerkClient } from '@clerk/nextjs/server';

// Ensure the webhook secret is loaded from environment variables
const WEBHOOK_SECRET = process.env.SIGNING_SECRET;

export async function POST(req: Request) {
    // Check if the webhook secret is configured
    if (!WEBHOOK_SECRET) {
        console.error('CLERK_WEBHOOK_SIGNING_SECRET is not set');
        return new Response('Error: Webhook secret not configured', { status: 500 });
    }

    // Get the headers for webhook verification
    const headers = req.headers;
    const svix_id = headers.get('svix-id');
    const svix_timestamp = headers.get('svix-timestamp');
    const svix_signature = headers.get('svix-signature');

    // Validate headers
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing Svix headers');
        return new Response('Error: Missing Svix headers', { status: 400 });
    }

    // Get the request body
    let payload;
    try {
        payload = await req.json();
    } catch (err) {
        console.error('Error parsing webhook payload:', err);
        return new Response('Error: Invalid payload', { status: 400 });
    }

    // Verify the webhook signature
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        evt = wh.verify(JSON.stringify(payload), {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        });
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error verifying webhook', { status: 400 });
    }

    // Extract event type and data
    const eventType = evt.type;
    const { id } = evt.data;

    // Handle different event types (e.g., user.created)
    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { first_name, last_name, image_url, email_addresses } = evt?.data

        try {
            const user = await createOrUpdateUser(id, first_name, last_name, image_url, email_addresses)
            if (user && eventType === 'user.created') {
                try {
                    const client = await clerkClient()
                    await client.users.updateUserMetadata(id, {
                        publicMetadata: {
                            userMongoId: user._id
                        }
                    })
                } catch (error) {
                    console.log("Error: Could not update metedata", error)
                }
            }

        } catch (error) {
            console.log("Error: Could not update or create user", error)
            return new Response('Error: Could not update or create user', { status: 400 });

        }
    }

    if (eventType === 'user.created' || eventType === 'user.updated') {

        try {
            await deleteUser(id)
        } catch (error) {
            console.log("Error: Could not delete user", error)
            return new Response('Error: Could not delete user', { status: 400 });

        }
    }

    return new Response('webhook received', { status: 200 });
}