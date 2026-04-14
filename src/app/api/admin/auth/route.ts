import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

function validToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? 'freehold2026';
  return createHash('sha256').update(pw + 'fes-admin-salt').digest('hex');
}

// POST /api/admin/auth — login
export async function POST(req: NextRequest) {
  const { password } = await req.json() as { password?: string };
  const expected = process.env.ADMIN_PASSWORD ?? 'freehold2026';

  if (!password || password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set('fes_admin', validToken(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

// DELETE /api/admin/auth — logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('fes_admin', '', { maxAge: 0, path: '/' });
  return res;
}
