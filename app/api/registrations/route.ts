import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET - Fetch all registrations (Admin only)
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(registrations)
  } catch (error) {
    console.error('Get registrations error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      studentName,
      dob,
      classApplying,
      gender,
      parentName,
      phone,
      email,
      address,
      prevSchool,
    } = body

    // Check if email already exists
    const existing = await prisma.registration.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const registration = await prisma.registration.create({
      data: {
        studentName,
        dob: new Date(dob),
        classApplying,
        gender,
        parentName,
        phone,
        email,
        address,
        prevSchool,
      },
    })

    return NextResponse.json(registration, { status: 201 })
  } catch (error) {
    console.error('Create registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
