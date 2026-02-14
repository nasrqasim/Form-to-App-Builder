import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(req) {
    try {
        const user = await getAuthUser();
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const { requestId, action } = await req.json();

        if (!requestId || !['APPROVE', 'REJECT'].includes(action)) {
            return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
        }

        const request = await prisma.upgradeRequest.findUnique({
            where: { id: requestId },
            include: { user: true }
        });

        if (!request) {
            return NextResponse.json({ message: 'Request not found' }, { status: 404 });
        }

        if (action === 'APPROVE') {
            await prisma.$transaction([
                prisma.upgradeRequest.update({
                    where: { id: requestId },
                    data: { status: 'APPROVED' }
                }),
                prisma.user.update({
                    where: { id: request.userId },
                    data: { plan: 'PRO' }
                })
            ]);
        } else {
            await prisma.upgradeRequest.update({
                where: { id: requestId },
                data: { status: 'REJECTED' }
            });
        }

        return NextResponse.json({ success: true, message: `Request ${action.toLowerCase()}d successfully` });

    } catch (error) {
        console.error('Upgrade request processing error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
