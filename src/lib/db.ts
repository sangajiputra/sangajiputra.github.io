import { neon } from '@neondatabase/serverless'

// Singleton SQL client
export const sql = neon(process.env.DATABASE_URL!)

// ── AUTH ──────────────────────────────────────────────────
export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false
  const rows = await sql`
    SELECT 1 FROM admin_sessions
    WHERE token = ${token} AND expires_at > NOW()
    LIMIT 1
  `
  return rows.length > 0
}

export async function createToken(): Promise<string> {
  const token = crypto.randomUUID() + crypto.randomUUID()
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000) // 8 jam
  await sql`
    INSERT INTO admin_sessions (token, expires_at)
    VALUES (${token}, ${expires.toISOString()})
  `
  return token
}

// ── QUERIES ───────────────────────────────────────────────
export async function getProfile() {
  const rows = await sql`SELECT * FROM profile WHERE id = 1`
  return rows[0] ?? null
}

export async function getSkills() {
  return sql`SELECT * FROM skills ORDER BY sort_order ASC`
}

export async function getExperience() {
  return sql`SELECT * FROM experience ORDER BY sort_order ASC`
}

export async function getProjects(onlyActive = true) {
  if (onlyActive) {
    return sql`SELECT * FROM projects WHERE active = true ORDER BY sort_order ASC`
  }
  return sql`SELECT * FROM projects ORDER BY sort_order ASC`
}

export async function getAllData() {
  const [profile, skills, experience, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getExperience(),
    getProjects(true),
  ])
  return { profile, skills, experience, projects }
}
