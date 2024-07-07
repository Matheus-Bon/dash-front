import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export function middleware(req) {
    const cookieStore = cookies();

    const hasToken = cookieStore.has('auth');
    const { pathname } = req.nextUrl;

    const publicPaths = ['/login'];

    if (!hasToken && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (hasToken && pathname === '/login') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const response = NextResponse.next();
    // const token = cookieStore.get('auth').value;
    // response.cookies.set('auth', token)

    return response;
}

export const config = {
    matcher: [
        '/'
    ],
};
