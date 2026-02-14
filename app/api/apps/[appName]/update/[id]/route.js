import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getDynamicModel } from '@/models/dynamicModel';

export async function PUT(req, { params }) {
    try {
        const { appName: slug, id } = await params;
        await dbConnect();

        const appMeta = await AppMeta.findOne({ slug });
        if (!appMeta) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        const Model = getDynamicModel(appMeta.collectionName, appMeta.fields);
        const body = await req.json();

        const updatedItem = await Model.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });

        if (!updatedItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req, { params }) {
    try {
        const { appName: slug, id } = await params;
        await dbConnect();

        const appMeta = await AppMeta.findOne({ slug });
        if (!appMeta) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        const Model = getDynamicModel(appMeta.collectionName, appMeta.fields);
        const item = await Model.findById(id);

        if (!item) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ item, appMeta }, { status: 200 });
    } catch (error) {
        console.error('Get single item error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
