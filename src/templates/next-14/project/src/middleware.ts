import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

import environment from "@/shared/environment";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(environment.sessionTokenName);

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|login|reset-password|reset-password/[a-zA-Z]+).*)",
};
