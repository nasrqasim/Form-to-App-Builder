import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getAuthUser } from '@/lib/auth';

/**
 * Schema Verification API
 * Purpose: Validate schema BEFORE attempting to generate the app
 * This prevents partial failures and provides clear error messages
 */
export async function POST(req) {
    try {
        await dbConnect();

        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const body = await req.json();
        const { appName, slug, collectionName, features, viewType, theme, fields } = body;

        const errors = [];

        // ✅ Step 1: Validate required fields
        if (!appName || appName.trim() === '') {
            errors.push('App Name is required');
        }

        if (!slug || slug.trim() === '') {
            errors.push('Slug is required');
        }

        if (!collectionName || collectionName.trim() === '') {
            errors.push('Collection Name is required');
        }

        // ✅ Step 2: Validate slug format (CRITICAL)
        // Only allow: lowercase letters, numbers, hyphens
        // ❌ No dots, spaces, special characters
        const slugRegex = /^[a-z0-9-]+$/;
        if (slug && !slugRegex.test(slug)) {
            errors.push(`Invalid slug "${slug}". Slug must contain only lowercase letters, numbers, and hyphens. Remove dots, spaces, and special characters.`);
        }

        // ✅ Step 3: Check slug length
        if (slug && (slug.length < 2 || slug.length > 100)) {
            errors.push('Slug must be between 2 and 100 characters');
        }

        // ✅ Step 4: Validate fields array
        if (!fields || !Array.isArray(fields)) {
            errors.push('Fields must be an array');
        } else if (fields.length < 2) {
            errors.push('At least 2 fields are required');
        } else {
            // ✅ Step 5: Validate each field
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];

                if (!field.name || field.name.trim() === '') {
                    errors.push(`Field ${i + 1}: Field name is required`);
                }

                if (!field.type) {
                    errors.push(`Field ${i + 1} (${field.name || 'unnamed'}): Field type is required`);
                }

                // Validate field name format (must be valid identifier)
                const fieldNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
                if (field.name && !fieldNameRegex.test(field.name)) {
                    if (/^[0-9]/.test(field.name)) {
                        errors.push(`Field "${field.name}" is invalid: Cannot start with a number`);
                    } else if (/[@.\-\s]/.test(field.name)) {
                        errors.push(`Field "${field.name}" is invalid: Cannot contain special characters or spaces. Use camelCase (e.g., "firstName", "emailAddress")`);
                    } else {
                        errors.push(`Field "${field.name}" is invalid: Use only letters, numbers, and underscores`);
                    }
                }

                // Validate select fields have options
                if (field.type === 'select') {
                    if (!field.options || field.options.length === 0) {
                        errors.push(`Field "${field.name}" is a select type and requires options`);
                    }
                }
            }

            // ✅ Step 6: Check field name uniqueness (case-insensitive)
            const fieldNames = fields.map(f => f.name.toLowerCase()).filter(n => n);
            const uniqueNames = new Set(fieldNames);
            if (fieldNames.length !== uniqueNames.size) {
                const duplicates = fieldNames.filter((name, index) => fieldNames.indexOf(name) !== index);
                errors.push(`Duplicate field names found: ${[...new Set(duplicates)].join(', ')}`);
            }
        }

        // ✅ Step 7: Check if app with this slug already exists
        if (slug && slugRegex.test(slug)) {
            const existingApp = await AppMeta.findOne({ slug: slug.toLowerCase() });
            if (existingApp) {
                errors.push(`App with slug "${slug}" already exists. Please choose a different name.`);
            }
        }

        // ✅ Step 8: Return verification result
        if (errors.length > 0) {
            return NextResponse.json({
                success: false,
                errors: errors,
                message: 'Schema validation failed'
            }, { status: 400 });
        }

        // ✅ All validations passed
        return NextResponse.json({
            success: true,
            message: 'Schema is valid',
            data: {
                appName,
                slug,
                collectionName,
                fieldCount: fields.length
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Verification error:', error);
        return NextResponse.json({
            success: false,
            errors: ['Internal server error during verification'],
            message: error.message
        }, { status: 500 });
    }
}
