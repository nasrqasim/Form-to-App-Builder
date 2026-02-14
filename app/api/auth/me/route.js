import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

import { prisma } from '@/lib/prisma';

export async function GET() {
    const user = await getAuthUser();

    if (!user) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
        where: { id: user.userId },
        select: {
            id: true,
            email: true,
            role: true,
            plan: true,
            planExpiresAt: true,
            createdAt: true
        }
    });

    return NextResponse.json({
        success: true,
        user: dbUser
    });
}
