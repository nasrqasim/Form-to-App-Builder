import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(req, { params }) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const { appName: slug } = await params;
        const body = await req.json();

        // Fetch User Plan and App
        const [app, dbUser] = await Promise.all([
            prisma.app.findUnique({ where: { slug } }),
            prisma.user.findUnique({ where: { id: user.userId } })
        ]);

        if (!app) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        if (app.userId !== user.userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        // Check Record Limits
        if (dbUser.plan === 'FREE') {
            const recordCount = await prisma.record.count({
                where: { appId: app.id }
            });

            if (recordCount >= 100) {
                return NextResponse.json({
                    message: 'Data limit reached (100 entries). Upgrade to Pro for unlimited entries.',
                    upgradeRequired: true
                }, { status: 403 });
            }
        }

        const record = await prisma.record.create({
            data: {
                appId: app.id,
                data: body // Store entire body as JSON
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Record created successfully',
            data: { _id: record.id, ...record.data }
        }, { status: 201 });

    } catch (error) {
        console.error('Create record error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
