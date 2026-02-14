import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getAuthUser();
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const stats = {
            totalUsers: await prisma.user.count(),
            freeUsers: await prisma.user.count({ where: { plan: 'FREE' } }),
            proUsers: await prisma.user.count({ where: { plan: 'PRO' } }),
            pendingRequests: await prisma.upgradeRequest.count({ where: { status: 'PENDING' } })
        };

        const requests = await prisma.upgradeRequest.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { email: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            stats,
            requests
        });

    } catch (error) {
        console.error('Admin dashboard error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
