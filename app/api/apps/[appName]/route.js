import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AppMeta from '@/models/AppMeta';
import { getAuthUser } from '@/lib/auth';

export async function DELETE(req, { params }) {
    try {
        await dbConnect();

        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const { appName: id } = await params;

        const app = await AppMeta.findOne({ _id: id, userId: user.userId });

        if (!app) {
            return NextResponse.json({ message: 'App not found or unauthorized' }, { status: 404 });
        }

        // We only delete the metadata. 
        // Usually we might want to drop the collection too, but for safety in this builder 
        // we'll just remove the metadata so it doesn't show in dashboard.
        await AppMeta.deleteOne({ _id: id });

        return NextResponse.json({
            success: true,
            message: 'App deleted successfully'
        });

    } catch (error) {
        console.error('Delete app error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
