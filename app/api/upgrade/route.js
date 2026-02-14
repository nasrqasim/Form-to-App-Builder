import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(req) {
    try {
        const user = await getAuthUser();
        if (!user) {
            return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
        }

        const { paymentMethod, accountName, accountNumber, referenceNumber, planRequested } = await req.json();

        // Validate
        if (!paymentMethod || !accountName || !accountNumber || !referenceNumber) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
        }

        // Check for duplicate reference number
        const existingRef = await prisma.upgradeRequest.findFirst({
            where: { referenceNumber }
        });

        if (existingRef) {
            return NextResponse.json({ message: 'This reference number has already been used' }, { status: 400 });
        }

        // Create Request
        const upgradeRequest = await prisma.upgradeRequest.create({
            data: {
                userId: user.userId, // getAuthUser returns { userId, ... }
                planRequested: planRequested || 'PRO',
                paymentMethod,
                accountName,
                accountNumber,
                referenceNumber
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Upgrade request submitted successfully. Waiting for admin approval.',
            request: upgradeRequest
        });

    } catch (error) {
        console.error('Upgrade request error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
