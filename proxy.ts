import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["pt", "en", "es"];
const defaultLocale = "pt";

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  let currentLocale = defaultLocale;
  const pathnameHasLocale = locales.some((locale) => {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      currentLocale = locale;
      return true;
    }
    return false;
  });

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    response.headers.set("x-locale", currentLocale);
    return response;
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api) and static files
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|Eu_.png|lobo_old.webp|.*\\..*).*)",
  ],
};
