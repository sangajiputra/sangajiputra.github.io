import { NextRequest } from 'next/server'
import { sql, getSkills } from '@/lib/db'
import { isAuthenticated, jsonResponse, unauthorized } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  return jsonResponse(await getSkills())
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const b = await req.json()
  if (b.id) {
    await sql`
      UPDATE skills SET category=${b.category}, icon=${b.icon}, items=${b.items}, sort_order=${Number(b.sort_order)}
      WHERE id=${Number(b.id)}
    `
  } else {
    await sql`
      INSERT INTO skills (category, icon, items, sort_order)
      VALUES (${b.category}, ${b.icon}, ${b.items}, ${Number(b.sort_order ?? 0)})
    `
  }
  return jsonResponse({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))
  if (!id) return jsonResponse({ error: 'Invalid id' }, 400)
  await sql`DELETE FROM skills WHERE id=${id}`
  return jsonResponse({ ok: true })
}
