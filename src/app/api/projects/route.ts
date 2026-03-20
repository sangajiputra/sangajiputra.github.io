import { NextRequest } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { getProjects } from '@/lib/db'
import { isAuthenticated, jsonResponse, unauthorized } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
  const all = req.nextUrl.searchParams.get('all') === '1'
  return jsonResponse(await getProjects(!all))
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const b = await req.json()
  const sql = neon(process.env.DATABASE_URL!, { fetchOptions: { cache: 'no-store' } })
  if (b.id) {
    await sql`
      UPDATE projects SET
        title=${b.title}, description=${b.description}, stack=${b.stack},
        url_demo=${b.url_demo}, url_github=${b.url_github},
        image_url=${b.image_url ?? ''},
        status=${b.status}, color=${b.color},
        sort_order=${Number(b.sort_order)}, active=${Boolean(b.active)}
      WHERE id=${Number(b.id)}
    `
  } else {
    await sql`
      INSERT INTO projects (title, description, stack, url_demo, url_github, image_url, status, color, sort_order, active)
      VALUES (${b.title}, ${b.description}, ${b.stack},
              ${b.url_demo ?? ''}, ${b.url_github ?? ''}, ${b.image_url ?? ''},
              ${b.status ?? 'live'}, ${b.color ?? 'pt-1'},
              ${Number(b.sort_order ?? 0)}, ${Boolean(b.active ?? true)})
    `
  }
  return jsonResponse({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!await isAuthenticated(req)) return unauthorized()
  const id = Number(new URL(req.url).searchParams.get('id'))
  if (!id) return jsonResponse({ error: 'Invalid id' }, 400)
  const sql = neon(process.env.DATABASE_URL!, { fetchOptions: { cache: 'no-store' } })
  await sql`DELETE FROM projects WHERE id=${id}`
  return jsonResponse({ ok: true })
}
