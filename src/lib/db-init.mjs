// Run with: node src/lib/db-init.mjs
// Pastikan DATABASE_URL sudah ada di .env.local

import { config } from 'node:process'
import { readFileSync } from 'node:fs'
import { neon } from '@neondatabase/serverless'

// Load .env.local manually
const envFile = readFileSync('.env.local', 'utf-8')
for (const line of envFile.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && !key.startsWith('#')) {
    process.env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '')
  }
}

const sql = neon(process.env.DATABASE_URL)

async function init() {
  console.log('🔄 Creating tables...')

  await sql`
    CREATE TABLE IF NOT EXISTS profile (
      id           INTEGER PRIMARY KEY DEFAULT 1,
      name         VARCHAR(100) NOT NULL,
      tagline      VARCHAR(200) NOT NULL DEFAULT '',
      bio          TEXT NOT NULL DEFAULT '',
      location     VARCHAR(100) NOT NULL DEFAULT '',
      whatsapp     VARCHAR(20)  NOT NULL DEFAULT '',
      github       VARCHAR(200) NOT NULL DEFAULT '',
      linkedin     VARCHAR(200) NOT NULL DEFAULT '',
      years_exp    INTEGER NOT NULL DEFAULT 5,
      projects_done INTEGER NOT NULL DEFAULT 30,
      clients      INTEGER NOT NULL DEFAULT 15,
      available    BOOLEAN NOT NULL DEFAULT true,
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id          SERIAL PRIMARY KEY,
      category    VARCHAR(50) NOT NULL,
      icon        VARCHAR(10) NOT NULL DEFAULT '🛠️',
      items       TEXT NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS experience (
      id          SERIAL PRIMARY KEY,
      company     VARCHAR(100) NOT NULL,
      role        VARCHAR(100) NOT NULL,
      period      VARCHAR(50)  NOT NULL,
      duration    VARCHAR(30)  NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      stack       VARCHAR(255) NOT NULL DEFAULT '',
      sort_order  INTEGER NOT NULL DEFAULT 0
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id          SERIAL PRIMARY KEY,
      title       VARCHAR(100) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      stack       VARCHAR(255) NOT NULL DEFAULT '',
      url_demo    VARCHAR(255) NOT NULL DEFAULT '',
      image_url   TEXT         NOT NULL DEFAULT '',
      url_github  VARCHAR(255) NOT NULL DEFAULT '',
      status      VARCHAR(10)  NOT NULL DEFAULT 'live',
      color       VARCHAR(10)  NOT NULL DEFAULT 'pt-1',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      active      BOOLEAN NOT NULL DEFAULT true
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token       VARCHAR(100) PRIMARY KEY,
      expires_at  TIMESTAMPTZ NOT NULL
    )
  `

  console.log('✅ Tables created')
  console.log('🌱 Seeding default data...')

  // Seed profile (INSERT only if empty)
  const existing = await sql`SELECT id FROM profile LIMIT 1`
  if (existing.length === 0) {
    await sql`
      INSERT INTO profile (id, name, tagline, bio, location, whatsapp, github, linkedin, years_exp, projects_done, clients, available)
      VALUES (
        1,
        'Sang Aji Putra Choirul',
        'Fullstack Developer · 5+ Tahun Pengalaman',
        'Saya <strong>Fullstack Developer dengan 5+ tahun pengalaman</strong> membangun produk digital dari nol sampai live — mulai dari arsitektur backend, database, hingga tampilan yang rapi di semua perangkat.<br><br>Saya bukan sekadar programmer. Saya ikut berpikir soal <strong>bisnis, UX, dan scalability</strong> — supaya hasil kerja kita punya dampak nyata.',
        'Indonesia 🇮🇩',
        '6282264117438',
        'https://github.com/username',
        'https://linkedin.com/in/username',
        5, 30, 15, true
      )
    `

    await sql`
      INSERT INTO skills (category, icon, items, sort_order) VALUES
      ('Frontend',       '⚛️', 'React,Next.js,TypeScript,Tailwind CSS,Redux,Framer Motion', 1),
      ('Backend',        '⚙️', 'Node.js,Express,NestJS,REST API,GraphQL,WebSocket',         2),
      ('Database',       '🗄️', 'PostgreSQL,MySQL,MongoDB,Redis,Prisma ORM',                 3),
      ('DevOps & Cloud', '☁️', 'Docker,AWS,Vercel,Nginx,CI/CD,Linux',                       4),
      ('Mobile',         '📱', 'React Native,Expo,PWA',                                     5),
      ('Workflow',       '🛠️', 'Git & GitHub,Agile / Scrum,Figma,Jest,Jira',               6)
    `

    await sql`
      INSERT INTO experience (company, role, period, duration, description, stack, sort_order) VALUES
      (
        'Nama Perusahaan / Startup', 'Senior Fullstack Developer', '2022 – Sekarang', '~3 tahun',
        'Memimpin pengembangan web app yang digunakan ribuan pengguna aktif harian. Merancang arsitektur microservices, mentoring junior developer, dan mendorong engineering practices yang lebih solid di seluruh tim.',
        'Next.js,Node.js,PostgreSQL,Docker,AWS', 1
      ),
      (
        'Digital Agency', 'Fullstack Developer', '2020 – 2022', '2 tahun',
        'Membangun dan deliver platform web klien di berbagai industri — fintech, e-commerce, dan logistik. Kolaborasi erat dengan tim desain untuk menghasilkan UI yang responsif dan performa tinggi.',
        'React,Express,MySQL,Redis', 2
      ),
      (
        'Freelance / Remote', 'Web Developer', '2019 – 2020', '1 tahun',
        'Mengawali karir dengan membangun website dan web app untuk klien UKM. Terbiasa mengelola full lifecycle project — dari gathering requirement, pengembangan, sampai handover ke klien.',
        'React,Laravel,MySQL,Tailwind', 3
      )
    `

    await sql`
      INSERT INTO projects (title, description, stack, url_demo, url_github, status, color, sort_order) VALUES
      ('Nama Project Kamu', 'Deskripsi singkat project — masalah apa yang diselesaikan dan dampaknya.', 'Next.js,TypeScript,PostgreSQL', '#', '#', 'live', 'pt-1', 1),
      ('Nama Project Kamu', 'Deskripsi singkat project — masalah apa yang diselesaikan dan dampaknya.', 'React Native,Node.js,MongoDB',  '#', '#', 'live', 'pt-2', 2),
      ('Nama Project Kamu', 'Deskripsi singkat project — masalah apa yang diselesaikan dan dampaknya.', 'NestJS,GraphQL,Redis',           '#', '#', 'wip',  'pt-3', 3),
      ('Nama Project Kamu', 'Deskripsi singkat project — masalah apa yang diselesaikan dan dampaknya.', 'TypeScript,Prisma,Docker',       '#', '#', 'oss',  'pt-4', 4)
    `

    console.log('✅ Default data seeded')
  } else {
    console.log('⏭️  Data already exists, skipping seed')
  }

  console.log('🎉 Database ready!')
  process.exit(0)
}

init().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
