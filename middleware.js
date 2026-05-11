import { NextResponse } from "next/server";

const AUTH_COOKIE = "auth_token";
const protectedPaths = ["/dashboard", "/quizzes", "/events", "/students", "/settings", "/QuizzForStudent"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = Boolean(request.cookies.get(AUTH_COOKIE)?.value);
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isProtectedPath && !hasAuthCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/quizzes/:path*", "/events/:path*", "/students/:path*", "/settings/:path*", "/QuizzForStudent"],
};
