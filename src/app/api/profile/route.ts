import { NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { getProfile } from '@/lib/db'
import { isAuthenticated, jsonResponse, unauthorized } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return jsonResponse(await getProfile())
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const b = await req.json()
  const sql = neon(process.env.DATABASE_URL!, { fetchOptions: { cache: 'no-store' } })
  await sql`
    UPDATE profile SET
      name          = ${b.name},
      tagline       = ${b.tagline},
      bio           = ${b.bio},
      location      = ${b.location},
      whatsapp      = ${b.whatsapp},
      github        = ${b.github},
      linkedin      = ${b.linkedin},
      years_exp     = ${Number(b.years_exp)},
      projects_done = ${Number(b.projects_done)},
      clients       = ${Number(b.clients)},
      available     = ${Boolean(b.available)},
      updated_at    = NOW()
    WHERE id = 1
  `
  return jsonResponse({ ok: true })
}
