import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
    (process.env.JWT_SECRET || 'your-default-secret-change-this').trim()
);

export async function signToken(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret);
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, secret, {
            clockTolerance: 60 // 60 seconds tolerance for time drift
        });
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return null;
    }
}

export async function setAuthCookie(token) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400, // 1 day
        path: '/',
    });
}

export async function removeAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
}

export async function getAuthUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
        if (!token) return null;
        return await verifyToken(token);
    } catch (error) {
        return null;
    }
}
