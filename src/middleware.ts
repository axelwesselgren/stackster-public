import { NextRequest, NextResponse } from "next/server";
import { getSessionRequest } from "@/functions/session/get-session";

const allowedSessionURLs = ['/dashboard', '/invitation'];

export async function middleware(request: NextRequest) {
    const session = await getSessionRequest(request);
    const url = request.nextUrl.pathname;

    const isAllowedUrl = allowedSessionURLs.some(path => url.startsWith(path));

    if (session && !isAllowedUrl) {
        const redirectUrl = new URL('/dashboard', request.nextUrl.origin);
        return NextResponse.redirect(redirectUrl);
    }

    if (!session && url.startsWith('/dashboard')) {
        const redirectUrl = new URL('/signup', request.nextUrl.origin);
        return NextResponse.redirect(redirectUrl);
    }

	return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|public).*)', '/']
};