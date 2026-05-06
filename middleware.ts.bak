import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow access to admin login page
  if (path === '/admin/login') {
    return NextResponse.next()
  }

  // Protect all /admin routes
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
