import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(req) {
    try {
        const authUser = await getAuthUser();
        if (!authUser) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        // Fetch User and App Count
        const user = await prisma.user.findUnique({
            where: { id: authUser.userId },
            include: { _count: { select: { apps: true } } }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Enforce Limits
        if (user.plan === 'FREE' && user._count.apps >= 1) {
            return NextResponse.json({
                error: 'Free plan limit reached (1 App). Upgrade to Pro for unlimited apps.',
                upgradeRequired: true
            }, { status: 403 });
        }

        const body = await req.json();
        const { name, slug, collectionName, projectLogo, features, viewType, theme, fields } = body;

        // Basic validation
        if (!name || !slug || !collectionName || !fields || fields.length < 2) {
            return NextResponse.json(
                { error: 'Name, Slug, Collection, and at least 2 fields are required' },
                { status: 400 }
            );
        }

        // Sanitize slug
        const sanitizedSlug = slug
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Check for existing slug
        const existingApp = await prisma.app.findUnique({
            where: { slug: sanitizedSlug }
        });

        if (existingApp) {
            return NextResponse.json(
                { error: 'An app with this slug already exists' },
                { status: 400 }
            );
        }

        // Create the app
        const newApp = await prisma.app.create({
            data: {
                userId: user.id,
                name,
                slug: sanitizedSlug,
                collectionName: collectionName.trim(),
                projectLogo,
                features: features || { create: true, edit: true, delete: true, list: true },
                viewType: viewType || 'table',
                theme: theme || 'light',
                fields: fields, // Prisma handles Json type
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Application generated successfully',
            slug: newApp.slug
        }, { status: 201 });

    } catch (error) {
        console.error('App creation error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
