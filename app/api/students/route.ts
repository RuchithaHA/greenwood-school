import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get student accounts instead of students table
    const students = await prisma.studentAccount.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        registration: {
          select: {
            id: true,
            status: true
          }
        }
      }
    })

    return NextResponse.json(students)
  } catch (error) {
    console.error('Get students error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('adminToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, phone, password } = body

    // Check if email already exists
    const existing = await prisma.studentAccount.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    // Hash password
    const bcrypt = require('bcryptjs')
    const passwordHash = await bcrypt.hash(password, 12)

    const student = await prisma.studentAccount.create({
      data: { name, email, phone, passwordHash },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      }
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error('Create student error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
