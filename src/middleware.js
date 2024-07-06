import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('jwt');
    const { pathname } = request.nextUrl;

    const publicPaths = ['/login'];
    
    if (!token && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        
    ],
};
