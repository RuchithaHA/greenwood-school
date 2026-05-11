import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ ok: true })
    
    // Clear the studentToken cookie
    response.cookies.set('studentToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // Immediately expire
    })

    return response
  } catch (error) {
    console.error('Student logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
