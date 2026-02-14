import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getDynamicModel } from '@/models/dynamicModel';

export async function GET(req, { params }) {
    try {
        const { appName: slug } = await params;
        await dbConnect();

        const appMeta = await AppMeta.findOne({ slug });
        if (!appMeta) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        const Model = getDynamicModel(appMeta.collectionName, appMeta.fields);

        // Get list of items, sorted by newest first
        const items = await Model.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            items,
            appMeta
        }, { status: 200 });
    } catch (error) {
        console.error('List error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
