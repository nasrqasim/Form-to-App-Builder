import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getAuthUser } from '@/lib/auth';

export async function POST(req) {
    try {
        await dbConnect();

        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const body = await req.json();
        const { appName, slug, collectionName, features, viewType, theme, fields } = body;

        // Comprehensive validation
        if (!appName || !slug || !collectionName) {
            return NextResponse.json(
                { message: 'App Name, Slug, and Collection Name are required' },
                { status: 400 }
            );
        }

        if (!fields || !Array.isArray(fields) || fields.length < 2) {
            return NextResponse.json(
                { message: 'At least 2 fields are required to generate an app' },
                { status: 400 }
            );
        }

        // Validate field structure
        for (const field of fields) {
            if (!field.name || !field.type) {
                return NextResponse.json(
                    { message: 'Each field must have a name and type' },
                    { status: 400 }
                );
            }

            // Validate select fields have options
            if (field.type === 'select' && (!field.options || field.options.length === 0)) {
                return NextResponse.json(
                    { message: `Field "${field.name}" is a select type and requires options` },
                    { status: 400 }
                );
            }
        }

        // Check for duplicate field names
        const fieldNames = fields.map(f => f.name.toLowerCase());
        if (new Set(fieldNames).size !== fieldNames.length) {
            return NextResponse.json(
                { message: 'Field names must be unique' },
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

        if (!sanitizedSlug) {
            return NextResponse.json(
                { message: 'Invalid slug format' },
                { status: 400 }
            );
        }

        // Check if app with this slug already exists
        const existingApp = await AppMeta.findOne({ slug: sanitizedSlug });
        if (existingApp) {
            return NextResponse.json(
                { message: 'An app with this slug already exists. Please use a different name.' },
                { status: 400 }
            );
        }

        // Sanitize field names
        const sanitizedFields = fields.map(field => ({
            fieldName: field.name.trim(),
            fieldType: field.type,
            required: field.required || false,
            defaultValue: field.defaultValue || undefined,
            options: field.options || []
        }));

        // Create app metadata
        const newApp = await AppMeta.create({
            userId: user.userId,
            name: appName,
            slug: sanitizedSlug,
            collectionName: collectionName.trim(),
            features: features || { create: true, edit: true, delete: true, list: true },
            viewType: viewType || 'table',
            theme: theme || 'light',
            fields: sanitizedFields,
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            message: 'App generated successfully',
            slug: newApp.slug,
            appId: newApp._id
        }, { status: 201 });

    } catch (error) {
        console.error('Generation error:', error);

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            return NextResponse.json(
                { message: 'An app with this name or slug already exists' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
