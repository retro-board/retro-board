import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }
    return NextResponse.rewrite(new URL('/api/auth/callback', request.url));
}

export const config = {
    matcher: [
        '/api/:path*',
        '/company/:path*',
        '/user/:path*',
    ],
}