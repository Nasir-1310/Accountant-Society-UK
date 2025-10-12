// middleware.ts (create this in the root of your src folder)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check if the user has an adminToken cookie
    const authToken = request.cookies.get("adminToken");

    if (!authToken || !authToken.value) {
      // No token found, redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optional: You can add token verification here as well
    // For now, we'll let the layout and API routes handle detailed verification
  }

  // If on login page and already authenticated, redirect to dashboard
  if (pathname === "/admin/login") {
    const authToken = request.cookies.get("adminToken");
    
    if (authToken && authToken.value) {
      const dashboardUrl = new URL("/admin/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: "/admin/:path*",
};