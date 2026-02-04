import { NextRequest, NextResponse } from 'next/server';
import { userService } from './services/user.service';
import { Roles } from './constant/roles';

export default async function Proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  let isProvider = false;

  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.user_role === Roles.admin;
    isProvider = data.user.user_role == Roles.provider;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  if (
    isAdmin &&
    (pathname.startsWith('/user-dashboard') ||
      pathname.startsWith('/provider-dashboard'))
  ) {
    return NextResponse.redirect(new URL('/admin-dashboard', request.url));
  }
  if (
    isProvider &&
    (pathname.startsWith('/admin-dashboard') ||
      pathname.startsWith('/user-dashboard'))
  ) {
    return NextResponse.redirect(new URL('/provider-dashboard', request.url));
  }

  if (
    !isAdmin &&
    !isProvider &&
    (pathname.startsWith('/admin-dashboard') ||
      pathname.startsWith('/provider-dashboard'))
  ) {
    return NextResponse.redirect(new URL('/user-dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user-dashboard',
    '/user-dashboard/:path*',
    '/admin-dashboard',
    '/admin-dashboard/:path*',
    '/provider-dashboard',
    '/provider-dashboard/:path*',
  ],
};
