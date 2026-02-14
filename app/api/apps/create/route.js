import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getAuthUser } from '@/lib/auth';

export async function POST(req) {
    try {
        await dbConnect();

        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
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
        const existingApp = await AppMeta.findOne({ slug: sanitizedSlug });
        if (existingApp) {
            return NextResponse.json(
                { error: 'An app with this slug already exists' },
                { status: 400 }
            );
        }

        // Create the app
        const newApp = await AppMeta.create({
            userId: user.userId,
            name,
            slug: sanitizedSlug,
            collectionName: collectionName.trim(),
            projectLogo,
            features: features || { create: true, edit: true, delete: true, list: true },
            viewType: viewType || 'table',
            theme: theme || 'light',
            fields,
            createdAt: new Date()
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
