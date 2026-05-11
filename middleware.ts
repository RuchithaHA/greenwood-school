import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Allow access to auth pages
  if (path === '/admin/login' || path === '/auth/login' || path === '/auth/signup') {
    return NextResponse.next()
  }

  // Protect all /admin routes (except /admin/login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('adminToken')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protect all /student routes
  if (path.startsWith('/student')) {
    const token = request.cookies.get('studentToken')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'student') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Protect registration page - requires student login
  if (path === '/registration') {
    const token = request.cookies.get('studentToken')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'student') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/registration'],
}
