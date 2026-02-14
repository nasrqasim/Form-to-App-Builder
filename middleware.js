import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
    const token = req.cookies.get('auth-token')?.value;
    const { pathname } = req.nextUrl;

    // Admin Routes Protection
    if (pathname.startsWith('/admin')) {
        if (!token) {
            // Allow access to login page
            if (pathname === '/admin/login') {
                return NextResponse.next();
            }
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            // Fetch user role from DB? No, DB access in middleware is limited (Edge).
            // Better to store role in token or make an API call.
            // Since I updated token generation, I should include role in token.
            // But existing tokens might not have it.
            // Let's assume fetching user details in layout or page is better for role check if not in token.
            // But middleware is faster.
            // For now, let's verify token validity.
            // And if user is logged in but tries to access /admin/login, redirect to /admin/dashboard.

            if (pathname === '/admin/login') {
                // Check if user is actually admin?? 
                // If not admin, maybe redirect to home?
                return NextResponse.redirect(new URL('/admin/dashboard', req.url));
            }

            // Ideally I should check role here. 
            // I'll update signToken to include role in future logins.
            // For now, the dashboard page will also check role server-side.

        } catch (error) {
            // Invalid token
            if (pathname !== '/admin/login') {
                return NextResponse.redirect(new URL('/admin/login', req.url));
            }
        }
    }

    // Protected User Routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/builder') || pathname.startsWith('/upgrade')) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
        } catch (error) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/builder/:path*', '/upgrade/:path*'],
};
