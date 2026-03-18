import { NextRequest } from 'next/server'
import { sql, getExperience } from '@/lib/db'
import { isAuthenticated, jsonResponse, unauthorized } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  return jsonResponse(await getExperience())
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const b = await req.json()
  if (b.id) {
    await sql`
      UPDATE experience SET
        company=${b.company}, role=${b.role}, period=${b.period},
        duration=${b.duration}, description=${b.description},
        stack=${b.stack}, sort_order=${Number(b.sort_order)}
      WHERE id=${Number(b.id)}
    `
  } else {
    await sql`
      INSERT INTO experience (company, role, period, duration, description, stack, sort_order)
      VALUES (${b.company}, ${b.role}, ${b.period}, ${b.duration}, ${b.description}, ${b.stack}, ${Number(b.sort_order ?? 0)})
    `
  }
  return jsonResponse({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))
  if (!id) return jsonResponse({ error: 'Invalid id' }, 400)
  await sql`DELETE FROM experience WHERE id=${id}`
  return jsonResponse({ ok: true })
}
