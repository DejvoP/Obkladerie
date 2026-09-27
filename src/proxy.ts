import { NextResponse, type NextRequest } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { updateSession } from "@/lib/supabase/middleware";
import { ADMIN_AUTH_COOKIE, ADMIN_AUTH_VALUE } from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const stubAuthEnabled = process.env.ENABLE_STUB_AUTH === "true";

  if (hasSupabaseEnv()) {
    const { response, user } = await updateSession(request);
    const isLoggedIn = Boolean(user);

    if (pathname.startsWith("/admin") && !isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (pathname === "/login" && isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  }

  if (!stubAuthEnabled) {
    if (pathname.startsWith("/admin")) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const isLoggedIn =
    request.cookies.get(ADMIN_AUTH_COOKIE)?.value === ADMIN_AUTH_VALUE;

  if (pathname.startsWith("/admin") && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
