import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getDynamicModel } from '@/models/dynamicModel';

export async function POST(req, { params }) {
    try {
        const { appName: slug } = await params;
        await dbConnect();

        // 1. Find the app metadata
        const appMeta = await AppMeta.findOne({ slug });
        if (!appMeta) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        // 2. Get the dynamic model
        const Model = getDynamicModel(appMeta.collectionName, appMeta.fields);

        // 3. Parse request body
        const body = await req.json();

        // 4. Create document
        const newItem = await Model.create(body);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
