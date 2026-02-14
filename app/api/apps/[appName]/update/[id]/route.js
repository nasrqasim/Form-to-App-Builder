import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function PUT(req, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const { appName: slug, id: recordId } = await params;
        const body = await req.json();

        const app = await prisma.app.findUnique({
            where: { slug }
        });

        if (!app) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        if (app.userId !== user.userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        // Verify record ownership/existence within app
        const record = await prisma.record.findUnique({
            where: { id: recordId }
        });

        if (!record || record.appId !== app.id) {
            return NextResponse.json({ message: 'Record not found' }, { status: 404 });
        }

        const updatedRecord = await prisma.record.update({
            where: { id: recordId },
            data: {
                data: body
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Record updated successfully',
            data: { _id: updatedRecord.id, ...updatedRecord.data }
        });

    } catch (error) {
        console.error('Update record error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
