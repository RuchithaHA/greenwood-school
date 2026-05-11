import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const gallery = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error('Get gallery error:', error)
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
    const { albumName, imageUrl, caption, category } = body

    const item = await prisma.gallery.create({
      data: { albumName, imageUrl, caption, category },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Create gallery item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
