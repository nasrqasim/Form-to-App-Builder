import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
    const user = await getAuthUser();

    if (!user) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({
        success: true,
        user: { id: user.userId, email: user.email }
    });
}
