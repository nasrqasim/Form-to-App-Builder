import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function DELETE(req, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const { appName: slug, id: recordId } = await params;

        const app = await prisma.app.findUnique({
            where: { slug }
        });

        if (!app) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        if (app.userId !== user.userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const record = await prisma.record.findUnique({
            where: { id: recordId }
        });

        if (!record || record.appId !== app.id) {
            // Already deleted or not found
            return NextResponse.json({ message: 'Record not found' }, { status: 404 });
        }

        await prisma.record.delete({
            where: { id: recordId }
        });

        return NextResponse.json({
            success: true,
            message: 'Record deleted successfully'
        });

    } catch (error) {
        console.error('Delete record error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
