import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const token = request.cookies.get('adminToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.gallery.delete({
      where: { id: parseInt(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete gallery item error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
