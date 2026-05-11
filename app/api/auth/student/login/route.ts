import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { signToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find student by email
    const student = await prisma.studentAccount.findUnique({
      where: { email }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, student.passwordHash)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Sign JWT token
    const token = await signToken({
      id: student.id,
      name: student.name,
      email: student.email,
      role: 'student'
    })

    // Set httpOnly cookie
    const response = NextResponse.json(
      { name: student.name, email: student.email },
      { status: 200 }
    )
    
    response.cookies.set('studentToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Student login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
