import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const apps = await prisma.app.findMany({
            where: { userId: user.userId },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({
            success: true,
            apps: apps.map(app => ({
                ...app,
                _id: app.id // Maintain compatibility with frontend if it uses _id
            }))
        });

    } catch (error) {
        console.error('Fetch apps error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
