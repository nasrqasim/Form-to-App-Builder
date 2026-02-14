import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder: 'form-app-builder',
            },
            process.env.CLOUDINARY_API_SECRET
        );

        return NextResponse.json({
            signature,
            timestamp,
            cloudName: process.env.CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            folder: 'form-app-builder'
        });
    } catch (error) {
        console.error('Sign error:', error);
        return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 });
    }
}
