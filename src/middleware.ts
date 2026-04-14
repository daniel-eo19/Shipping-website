import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

function validToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? 'freehold2026';
  return createHash('sha256').update(pw + 'fes-admin-salt').digest('hex');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (not /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = req.cookies.get('fes_admin')?.value;
    if (cookie !== validToken()) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
