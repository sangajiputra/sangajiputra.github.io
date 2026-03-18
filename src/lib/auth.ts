import { NextRequest } from 'next/server'
import { verifyToken } from './db'

export async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('cv_admin_token')?.value
    || req.headers.get('x-admin-token')
    || ''
  return verifyToken(token)
}

export function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, { status })
}

export function unauthorized() {
  return jsonResponse({ error: 'Unauthorized' }, 401)
}
