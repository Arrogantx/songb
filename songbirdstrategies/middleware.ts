import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ['/dashboard', '/dashboard/history', '/dashboard/settings', '/dashboard/templates'];

export async function middleware(req: NextRequest) {
  // Create a response and pass it to createMiddlewareClient
  const res = NextResponse.next();

  try {
    // Create client with enhanced security options
    const supabase = createMiddlewareClient({ 
      req, 
      res,
      options: {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    });

    // Refresh session if it exists
    const { data: { session } } = await supabase.auth.getSession();

    // If accessing a protected route without a session, redirect to auth
    if (!session && PROTECTED_ROUTES.some(route => req.nextUrl.pathname.startsWith(route))) {
      const redirectUrl = new URL('/auth', req.url);
      redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If accessing auth page with a session, redirect to dashboard
    if (session && req.nextUrl.pathname === '/auth') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // Return the original response if there's an error
    return res;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};