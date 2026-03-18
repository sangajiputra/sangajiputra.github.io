import { NextRequest } from 'next/server'
import { createToken } from '@/lib/db'
import { isAuthenticated, jsonResponse, unauthorized } from '@/lib/auth'

// POST /api/auth — login
export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Password salah' }, 401)
  }
  const token = await createToken()
  const res = jsonResponse({ ok: true })
  // Set cookie (httpOnly, 8 jam)
  res.headers.set(
    'Set-Cookie',
    `cv_admin_token=${token}; HttpOnly; Path=/; Max-Age=${8 * 3600}; SameSite=Lax`
  )
  return res
}

// DELETE /api/auth — logout
export async function DELETE() {
  const res = jsonResponse({ ok: true })
  res.headers.set('Set-Cookie', 'cv_admin_token=; Path=/; Max-Age=0')
  return res
}

// GET /api/auth — check session
export async function GET(req: NextRequest) {
  const ok = await isAuthenticated(req)
  return jsonResponse({ authenticated: ok })
}
