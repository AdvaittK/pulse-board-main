import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Paths that do not require authentication
const PUBLIC_PATHS = [
  '/',  // Homepage
  '/login', 
  '/register',
  '/api/auth/login',
  '/api/auth/register', 
  '/api/auth/refresh',  // Allow access to refresh token endpoint
  '/api/auth/google-login'
];

// Paths that require specific roles
const ROLE_PATHS = {
  '/dashboard/admin': ['admin'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths
  if (PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Allow API access to auth endpoints
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }
  
  // Check for the token in the Authorization header
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  
  // Also check cookies as a fallback for access token
  const cookieToken = request.cookies.get('auth_token')?.value;
  
  const jwt = token || cookieToken;
  
  if (!jwt) {
    // If no access token is found but we have a refresh token,
    // redirect to refresh token flow
    const refreshToken = request.cookies.get('refresh_token')?.value;
    if (refreshToken) {
      // For API requests, return 401 with a refresh-token-present header
      if (pathname.startsWith('/api/')) {
        const response = NextResponse.json(
          { error: 'Access token required', requiresRefresh: true },
          { status: 401 }
        );
        response.headers.set('X-Refresh-Token-Present', 'true');
        return response;
      } 
      
      // For page requests, redirect to a client-side refresh handler
      const url = new URL('/login', request.url);
      url.searchParams.set('requiresRefresh', 'true');
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }
    
    // No tokens at all, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Verify JWT
    const secretKey = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default_secret_replace_in_production'
    );
    
    const { payload } = await jwtVerify(jwt, secretKey);
    
    // Verify this is an access token, not a refresh token
    if (payload.type && payload.type !== 'access') {
      throw new Error('Invalid token type');
    }
    
    // Check role-based access
    for (const [path, roles] of Object.entries(ROLE_PATHS)) {
      if (pathname.startsWith(path) && !roles.includes(payload.role as string)) {
        // Redirect to dashboard if user doesn't have the required role
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    
    // Add user data and session ID to request headers for backend APIs
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-User-ID', payload.id as string);
    requestHeaders.set('X-User-Role', payload.role as string);
    requestHeaders.set('X-User-Email', payload.email as string);
    
    // Include session ID if available
    if (payload.sessionId) {
      requestHeaders.set('X-Session-ID', payload.sessionId as string);
    }
    
    // Update session activity - this would be better in an API middleware
    // but we're adding it here for completeness
    if (payload.sessionId) {
      // We're not awaiting this to avoid blocking the request
      // This is fire-and-forget session activity update
      fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/session/activity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({ sessionId: payload.sessionId })
      }).catch(err => console.error('Failed to update session activity:', err));
    }
    
    return NextResponse.next({
      headers: requestHeaders,
    });
    
  } catch (error) {
    console.error('Token validation error:', error);
    
    // Try to use refresh token if available
    const refreshToken = request.cookies.get('refresh_token')?.value;
    
    if (refreshToken) {
      // For API requests, return 401 with a refresh-token-present header
      if (pathname.startsWith('/api/')) {
        const response = NextResponse.json(
          { error: 'Invalid access token', requiresRefresh: true },
          { status: 401 }
        );
        response.headers.set('X-Refresh-Token-Present', 'true');
        return response;
      }
      
      // For page requests, redirect to a client-side refresh handler
      const url = new URL('/login', request.url);
      url.searchParams.set('requiresRefresh', 'true');
      url.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(url);
    }
    
    // No refresh token, clear any invalid tokens and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth_token');
    response.cookies.delete('refresh_token');
    
    return response;
  }
}

export const config = {
  // Update the matcher to only apply to dashboard and API routes, not the homepage
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    // Exclude public pages, static files and auth endpoints
    '/((?!api/auth|_next/static|_next/image|favicon.ico|login|register).*)'
  ],
};