import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function DELETE(req, { params }) {
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

        if (app.userId !== user.userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        await prisma.app.delete({
            where: { id: app.id }
        });

        return NextResponse.json({
            success: true,
            message: 'App deleted successfully'
        });

    } catch (error) {
        console.error('Delete app error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
