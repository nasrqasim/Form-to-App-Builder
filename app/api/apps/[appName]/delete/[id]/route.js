import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getDynamicModel } from '@/models/dynamicModel';

export async function DELETE(req, { params }) {
    try {
        const { appName: slug, id } = await params;
        await dbConnect();

        const appMeta = await AppMeta.findOne({ slug });
        if (!appMeta) {
            return NextResponse.json({ message: 'App not found' }, { status: 404 });
        }

        const Model = getDynamicModel(appMeta.collectionName, appMeta.fields);
        const deletedItem = await Model.findByIdAndDelete(id);

        if (!deletedItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
