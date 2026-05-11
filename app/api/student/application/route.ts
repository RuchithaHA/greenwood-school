import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('studentToken')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Find registration for this student
    const registration = await prisma.registration.findUnique({
      where: { studentId: payload.id as number }
    })

    return NextResponse.json(registration || null)
  } catch (error) {
    console.error('Get student application error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
