import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Get staff error:', error)
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
    const { name, designation, department, photoUrl, email } = body

    const staffMember = await prisma.staff.create({
      data: { name, designation, department, photoUrl, email },
    })

    return NextResponse.json(staffMember, { status: 201 })
  } catch (error) {
    console.error('Create staff error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
