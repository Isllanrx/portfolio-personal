import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["pt", "en", "es"];
const defaultLocale = "pt";

export function proxy(request: NextRequest) {
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

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\..*).*)",
  ],
};
