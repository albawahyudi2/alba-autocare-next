import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Simple pass-through - no authentication needed
  // This app is for single admin user only
  return NextResponse.next({
    request,
  })
}
