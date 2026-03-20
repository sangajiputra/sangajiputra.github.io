import { neon } from '@neondatabase/serverless'

// Buat SQL client baru setiap request — mencegah caching Next.js
function getSQL() {
  return neon(process.env.DATABASE_URL!, {
    fetchOptions: {
      cache: 'no-store',
    },
  })
}

// ── AUTH ──────────────────────────────────────────────────
export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false
  const sql = getSQL()
  const rows = await sql`
    SELECT 1 FROM admin_sessions
    WHERE token = ${token} AND expires_at > NOW()
    LIMIT 1
  `
  return rows.length > 0
}

export async function createToken(): Promise<string> {
  const sql = getSQL()
  const token = crypto.randomUUID() + crypto.randomUUID()
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000)
  await sql`
    INSERT INTO admin_sessions (token, expires_at)
    VALUES (${token}, ${expires.toISOString()})
  `
  return token
}

// ── QUERIES ───────────────────────────────────────────────
export async function getProfile() {
  const sql = getSQL()
  const rows = await sql`SELECT * FROM profile WHERE id = 1`
  return rows[0] ?? null
}

export async function getSkills() {
  const sql = getSQL()
  return sql`SELECT * FROM skills ORDER BY sort_order ASC`
}

export async function getExperience() {
  const sql = getSQL()
  return sql`SELECT * FROM experience ORDER BY sort_order ASC`
}

export async function getProjects(onlyActive = true) {
  const sql = getSQL()
  if (onlyActive) {
    return sql`SELECT * FROM projects WHERE active = true ORDER BY sort_order ASC`
  }
  return sql`SELECT * FROM projects ORDER BY sort_order ASC`
}

export async function getAllData() {
  const sql = getSQL()
  const [profile, skills, experience, projects] = await Promise.all([
    sql`SELECT * FROM profile WHERE id = 1`.then(r => r[0] ?? null),
    sql`SELECT * FROM skills ORDER BY sort_order ASC`,
    sql`SELECT * FROM experience ORDER BY sort_order ASC`,
    sql`SELECT * FROM projects WHERE active = true ORDER BY sort_order ASC`,
  ])
  return { profile, skills, experience, projects }
}
