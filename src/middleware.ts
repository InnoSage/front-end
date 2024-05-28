import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url-path", request.nextUrl.pathname);

    return NextResponse.next({
        request: { headers: requestHeaders }
    });
}

export const config = {
    matcher: "/app/:path*"
};
