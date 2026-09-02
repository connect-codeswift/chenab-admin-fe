import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_TOKEN_COOKIE } from "@/lib/auth/constants";

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function middleware(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);
  const isAuthenticated = Boolean(
    request.cookies.get(AUTH_TOKEN_COOKIE)?.value?.trim(),
  );
  const onSignIn = pathname === "/sign-in";

  // Not logged in → protect admin routes
  if (!isAuthenticated && !onSignIn) {
    const signInUrl = new URL("/sign-in", request.url);
    if (pathname !== "/") {
      signInUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(signInUrl);
  }

  // Logged in → protect sign-in page
  if (isAuthenticated && onSignIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
