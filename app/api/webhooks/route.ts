
import { Webhook } from 'svix';
import { NextResponse } from 'next/server';

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
    try {
        if (eventType === 'user.created') {
            const { email_addresses, username, image_url } = evt.data;
            console.log(`Received webhook with ID ${id} and event type ${eventType}`);
            console.log('Webhook payload:', evt.data);

            // Example: Save user to your database
            const user = {
                clerkId: id,
                email: email_addresses[0]?.email_address || '',
                username: username || null,
                image_url: image_url || '',
            };

            // TODO: Implement your database logic here (e.g., save to MongoDB, Prisma, etc.)
            // Example: await createUser(user);

            return new Response('Webhook received and processed', { status: 200 });
        }

        // Add more event types as needed (e.g., user.updated, user.deleted)
        console.log(`Unhandled event type: ${eventType}`);
        return new Response(`Webhook event ${eventType} received but not handled`, { status: 200 });
    } catch (err) {
        console.error('Error processing webhook:', err);
        return new Response('Error processing webhook', { status: 500 });
    }
}