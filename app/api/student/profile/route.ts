import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// GET - Get student profile
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

    const student = await prisma.studentAccount.findUnique({
      where: { id: payload.id as number },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error('Get student profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update student profile
export async function PUT(request: NextRequest) {
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

    const body = await request.json()
    const { name, phone } = body

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      )
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      )
    }

    const updatedStudent = await prisma.studentAccount.update({
      where: { id: payload.id as number },
      data: {
        name,
        phone
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true
      }
    })

    return NextResponse.json(updatedStudent)
  } catch (error) {
    console.error('Update student profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
