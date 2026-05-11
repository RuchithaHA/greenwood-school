import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password, confirmPassword } = body

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must be exactly 10 digits' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingStudent = await prisma.studentAccount.findUnique({
      where: { email }
    })

    if (existingStudent) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create student account
    const student = await prisma.studentAccount.create({
      data: {
        name,
        email,
        phone,
        passwordHash
      }
    })

    // Sign JWT token
    const token = await signToken({
      id: student.id,
      name: student.name,
      email: student.email,
      role: 'student'
    })

    // Set httpOnly cookie
    const response = NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )
    
    response.cookies.set('studentToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Student signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
