import { NextRequest, NextResponse } from "next/server";

function createContentSecurityPolicy(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://vercel.live`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https://ik.imagekit.io https://images.unsplash.com https://assets.aceternity.com",
    "media-src 'self' blob: https://ik.imagekit.io",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://ik.imagekit.io https://vercel.live",
    "frame-src 'self' https://vercel.live",
    "frame-ancestors 'self' https://vercel.live",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const contentSecurityPolicy = createContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", contentSecurityPolicy);
  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
    },
  ],
};
