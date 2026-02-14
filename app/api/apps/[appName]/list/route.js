import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(req, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const { appName: slug } = await params;

        const app = await prisma.app.findUnique({
            where: { slug }
        });

        if (!app) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        // Check ownership if needed, but list usually ok if app is public?
        // Let's assume ownership required or app is public?
        // The builder seems to imply user manages THEIR apps.
        if (app.userId !== user.userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const records = await prisma.record.findMany({
            where: { appId: app.id },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            data: records.map(r => ({
                _id: r.id, // Frontend compatibility
                ...r.data,
                createdAt: r.createdAt
            }))
        });

    } catch (error) {
        console.error('Fetch records error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
