// Server Component — render semua HTML di server, data sudah ada sebelum dikirim ke browser
// Tidak ada loading state kosong karena HTML sudah lengkap saat tiba di browser

import type { CVData } from '@/types'
import RevealInit from './RevealInit'
import Lightbox from './Lightbox'

const WA_MSG = encodeURIComponent('Hi Sang Aji, saya tertarik untuk diskusi project bersama kamu!')

const STATUS_BADGE: Record<string, string> = {
  live: '<span class="proj-badge badge-live">● Live</span>',
  wip:  '<span class="proj-badge badge-wip">⬡ WIP</span>',
  oss:  '<span class="proj-badge badge-oss">◈ Open Source</span>',
}

export default function CVPage({ data }: { data: CVData }) {
  const { profile: p, skills, experience, projects } = data
  const waUrl = `https://wa.me/${p.whatsapp}?text=${WA_MSG}`

  const nameParts = p.name.split(' ')
  const lastName  = nameParts.pop()!
  const firstName = nameParts.join(' ')

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #1a1612; --body: #3d3630; --muted: #8a7f76; --line: #e4ddd6;
          --bg: #faf8f5; --white: #fff; --accent: #c8521a; --accent-light: #fdf0e8;
          --green: #1e7a4a; --wa: #25D366;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--body); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
        a { color: inherit; text-decoration: none; }
        .cv-container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

        /* TOPBAR */
        .topbar { border-bottom: 1px solid var(--line); padding: 13px 0; background: var(--white); position: sticky; top: 0; z-index: 100; }
        .topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .topbar-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); }
        .topbar-nav { display: flex; gap: 28px; list-style: none; }
        .topbar-nav a { font-size: 13px; font-weight: 500; color: var(--muted); transition: color .2s; }
        .topbar-nav a:hover { color: var(--ink); }
        .topbar-cta { display: inline-flex; align-items: center; gap: 8px; background: var(--wa); color: #fff; font-size: 13px; font-weight: 600; padding: 9px 18px; border-radius: 6px; transition: opacity .2s, transform .2s; white-space: nowrap; }
        .topbar-cta:hover { opacity: .9; transform: translateY(-1px); }
        .topbar-cta svg { width: 16px; height: 16px; flex-shrink: 0; }

        /* HERO */
        .hero { padding: 72px 0 64px; border-bottom: 1px solid var(--line); }
        .hero-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: start; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-bottom: 20px; }
        .pulse-dot { display: inline-block; width: 7px; height: 7px; background: var(--green); border-radius: 50%; animation: pulse 2.5s ease infinite; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(30,122,74,.5)}50%{box-shadow:0 0 0 5px rgba(30,122,74,0)} }
        .hero-name { font-family: 'Playfair Display', serif; font-size: clamp(40px,6vw,68px); font-weight: 900; line-height: 1.05; color: var(--ink); margin-bottom: 24px; letter-spacing: -.02em; }
        .hero-name em { font-style: italic; color: var(--accent); }
        .hero-bio { font-size: 16px; line-height: 1.75; color: var(--body); max-width: 540px; margin-bottom: 32px; }
        .hero-bio strong { color: var(--ink); font-weight: 600; }
        .hero-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 36px; }
        .pill { font-size: 12px; font-weight: 500; padding: 5px 13px; border-radius: 20px; border: 1px solid var(--line); color: var(--muted); background: var(--white); }
        .pill-accent { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
        .btn-wa { display: inline-flex; align-items: center; gap: 10px; background: var(--wa); color: #fff; font-size: 15px; font-weight: 600; padding: 14px 28px; border-radius: 8px; transition: all .25s; box-shadow: 0 4px 16px rgba(37,211,102,.25); }
        .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,211,102,.35); }
        .btn-wa svg { width: 20px; height: 20px; }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; padding: 14px 24px; border-radius: 8px; border: 1.5px solid var(--line); color: var(--body); background: transparent; transition: all .2s; }
        .btn-outline:hover { border-color: var(--ink); color: var(--ink); }
        .hero-socials { display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; }
        .social-link { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--muted); border: 1.5px solid var(--line); border-radius: 7px; padding: 7px 14px; background: var(--white); transition: all .2s; }
        .social-link:hover { color: var(--ink); border-color: var(--ink); }
        .social-link svg { width: 16px; height: 16px; }

        /* HERO CARD */
        .hero-card { background: var(--white); border: 1px solid var(--line); border-radius: 12px; padding: 28px 24px; min-width: 210px; display: flex; flex-direction: column; gap: 20px; box-shadow: 0 2px 20px rgba(0,0,0,.05); }
        .stat-item { text-align: center; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900; color: var(--ink); line-height: 1; }
        .stat-num span { color: var(--accent); }
        .stat-label { font-size: 11px; font-weight: 500; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; margin-top: 4px; }
        .stat-divider { height: 1px; background: var(--line); }

        /* SECTION */
        .cv-section { padding: 72px 0; border-bottom: 1px solid var(--line); }
        .cv-section-white { background: var(--white); }
        .section-label { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,38px); font-weight: 700; color: var(--ink); line-height: 1.15; margin-bottom: 40px; }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .about-card { background: var(--white); border: 1px solid var(--line); border-radius: 10px; padding: 26px 22px; transition: box-shadow .25s, transform .25s; }
        .about-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.07); transform: translateY(-3px); }
        .about-icon { font-size: 26px; margin-bottom: 13px; }
        .about-card h3 { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
        .about-card p { font-size: 13.5px; color: var(--muted); line-height: 1.65; }

        /* SKILLS */
        .skills-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .skill-row { background: var(--white); border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; }
        .skill-row-title { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 11px; display: flex; align-items: center; gap: 7px; }
        .skill-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .chip { font-size: 12px; font-weight: 500; padding: 4px 11px; border-radius: 4px; background: var(--bg); border: 1px solid var(--line); color: var(--body); }

        /* EXPERIENCE */
        .exp-list { display: flex; flex-direction: column; }
        .exp-item { display: grid; grid-template-columns: 155px 1fr; padding: 36px 0; border-bottom: 1px solid var(--line); }
        .exp-item:last-child { border-bottom: none; padding-bottom: 0; }
        .exp-year { font-size: 13px; font-weight: 600; color: var(--accent); }
        .exp-dur { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .exp-co { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); margin-bottom: 5px; }
        .exp-role { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--ink); margin-bottom: 11px; line-height: 1.2; }
        .exp-desc { font-size: 14px; color: var(--body); line-height: 1.7; max-width: 580px; margin-bottom: 13px; }
        .exp-chips { display: flex; flex-wrap: wrap; gap: 6px; }

        /* PROJECTS */
        .projects-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; }
        .proj-card { background: var(--white); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; transition: box-shadow .25s, transform .25s; }
        .proj-card:hover { box-shadow: 0 10px 40px rgba(0,0,0,.09); transform: translateY(-4px); }
        .proj-thumb { height: 160px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .proj-thumb-clickable { cursor: zoom-in; }
        .proj-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .proj-thumb:hover img { transform: scale(1.04); }
        .pt-1 { background: linear-gradient(135deg,#fef3ec,#fce6d0); }
        .pt-2 { background: linear-gradient(135deg,#edf5f0,#d3ece0); }
        .pt-3 { background: linear-gradient(135deg,#eef2fe,#dce4fc); }
        .pt-4 { background: linear-gradient(135deg,#fdf5e3,#f9ecc9); }
        .pt-5 { background: linear-gradient(135deg,#fce7f3,#fbd4e9); }
        .pt-6 { background: linear-gradient(135deg,#e0f2fe,#c5e7fb); }
        .pt-label { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; opacity: .1; color: var(--ink); user-select: none; }
        .proj-badge { position: absolute; top: 11px; right: 11px; font-size: 10px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; }
        .badge-live { background: #e6f6ec; color: var(--green); }
        .badge-wip  { background: #fef9ec; color: #a07800; }
        .badge-oss  { background: var(--accent-light); color: var(--accent); }
        .proj-body { padding: 20px 20px 22px; }
        .proj-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--ink); margin-bottom: 7px; line-height: 1.25; }
        .proj-desc { font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 13px; }
        .proj-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
        .proj-links { display: flex; gap: 14px; }
        .proj-link { font-size: 12px; font-weight: 600; color: var(--accent); display: flex; align-items: center; gap: 4px; transition: opacity .2s; }
        .proj-link:hover { opacity: .7; }
        .proj-link svg { width: 13px; height: 13px; }

        /* SKELETON */
        .sk { background: linear-gradient(90deg,#f0ece8 25%,#e8e4e0 50%,#f0ece8 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 6px; display: inline-block; }
        @keyframes shimmer { 0%{background-position:200% 0}100%{background-position:-200% 0} }

        /* CTA */
        .cta-section { padding: 80px 0; background: var(--ink); }
        .cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; }
        .cta-label { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.35); margin-bottom: 12px; }
        .cta-headline { font-family: 'Playfair Display', serif; font-size: clamp(30px,4vw,48px); font-weight: 900; color: #fff; line-height: 1.1; margin-bottom: 16px; }
        .cta-headline em { font-style: italic; color: var(--wa); }
        .cta-sub { font-size: 15px; color: rgba(255,255,255,.5); line-height: 1.65; max-width: 460px; }
        .cta-right { display: flex; flex-direction: column; align-items: center; gap: 12px; min-width: 240px; }
        .btn-wa-big { display: inline-flex; align-items: center; justify-content: center; gap: 12px; background: var(--wa); color: #fff; font-size: 15px; font-weight: 700; padding: 17px 34px; border-radius: 10px; width: 100%; transition: all .25s; box-shadow: 0 6px 24px rgba(37,211,102,.3); }
        .btn-wa-big:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(37,211,102,.4); }
        .btn-wa-big svg { width: 22px; height: 22px; }
        .cta-number { font-size: 13px; color: rgba(255,255,255,.3); letter-spacing: .05em; }
        .cta-avail { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 500; color: rgba(255,255,255,.45); }
        .cta-socials { display: flex; gap: 14px; margin-top: 4px; }
        .cta-socials a { color: rgba(255,255,255,.4); transition: color .2s; display: flex; }
        .cta-socials a:hover { color: rgba(255,255,255,.8); }

        /* FOOTER */
        .cv-footer { padding: 26px 0; background: var(--ink); border-top: 1px solid rgba(255,255,255,.07); }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
        .footer-name { font-family: 'Playfair Display', serif; font-size: 15px; color: rgba(255,255,255,.3); }
        .footer-links { display: flex; gap: 18px; }
        .footer-links a { font-size: 12px; color: rgba(255,255,255,.25); font-weight: 500; transition: color .2s; }
        .footer-links a:hover { color: rgba(255,255,255,.55); }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity .45s ease, transform .45s ease; }
        .reveal.visible { opacity: 1; transform: none; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .topbar-nav { display: none; }
          .hero-grid { grid-template-columns: 1fr; gap: 36px; }
          .hero-card { flex-direction: row; min-width: unset; }
          .stat-item { flex: 1; }
          .stat-divider { width: 1px; height: auto; }
          .stat-num { font-size: 26px; }
          .about-grid { grid-template-columns: 1fr; }
          .skills-layout { grid-template-columns: 1fr; }
          .exp-item { grid-template-columns: 1fr; gap: 6px; }
          .projects-grid { grid-template-columns: 1fr; }
          .cta-grid { grid-template-columns: 1fr; gap: 36px; }
          .cta-right { width: 100%; }
        }
        @media (max-width: 480px) {
          .hero { padding: 44px 0; }
          .cv-section { padding: 52px 0; }
          .hero-name { font-size: 36px; }
          .hero-card { flex-direction: column; }
          .stat-divider { width: auto; height: 1px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="topbar">
        <div className="cv-container topbar-inner">
          <div className="topbar-name">{p.name}</div>
          <ul className="topbar-nav">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
          <a href={waUrl} className="topbar-cta" target="_blank" rel="noopener">
            <WaIcon /> Hubungi via WA
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="cv-container hero-grid">
          <div>
            {p.available && (
              <div className="hero-eyebrow">
                <span className="pulse-dot" /> Open to work · Remote &amp; On-site
              </div>
            )}
            <h1 className="hero-name">
              {firstName}<br /><em>{lastName}</em>
            </h1>
            <p className="hero-bio" dangerouslySetInnerHTML={{ __html: p.bio }} />
            <div className="hero-pills">
              <span className="pill pill-accent">Fullstack Developer</span>
              <span className="pill">React &amp; Next.js</span>
              <span className="pill">Node.js</span>
              <span className="pill">PostgreSQL</span>
              <span className="pill">{p.location}</span>
            </div>
            <div className="hero-actions">
              <a href={waUrl} className="btn-wa" target="_blank" rel="noopener">
                <WaIcon /> Chat WhatsApp Sekarang
              </a>
              <a href="#projects" className="btn-outline">Lihat Project →</a>
            </div>
            <div className="hero-socials">
              {p.github && (
                <a href={p.github} className="social-link" target="_blank" rel="noopener">
                  <GhIcon /> GitHub
                </a>
              )}
              {p.linkedin && (
                <a href={p.linkedin} className="social-link" target="_blank" rel="noopener">
                  <LiIcon /> LinkedIn
                </a>
              )}
            </div>
          </div>
          <div className="hero-card">
            <div className="stat-item">
              <div className="stat-num">{p.years_exp}<span>+</span></div>
              <div className="stat-label">Tahun Pengalaman</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-num">{p.projects_done}<span>+</span></div>
              <div className="stat-label">Project Selesai</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-num">{p.clients}<span>+</span></div>
              <div className="stat-label">Klien Puas</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="cv-section">
        <div className="cv-container">
          <div className="section-label">Kenapa saya?</div>
          <h2 className="section-title">Yang bisa saya bawa ke tim kamu</h2>
          <div className="about-grid">
            {[
              { icon: '🏗️', title: 'End-to-End Ownership', desc: 'Dari desain database sampai deploy ke production. Saya handle semua layer, jadi nggak perlu koordinasi banyak orang untuk satu produk.' },
              { icon: '🚀', title: 'Cepat, Bersih, Scalable', desc: 'Kode yang saya tulis bisa dibaca, di-maintain, dan tumbuh bareng bisnis kamu — bukan cuma selesai di sprint pertama lalu jadi technical debt.' },
              { icon: '🤝', title: 'Komunikasi Transparan', desc: 'Progress selalu jelas, blocker langsung dikomunikasikan. Saya kerja dengan standar profesional, baik remote maupun on-site.' },
            ].map(c => (
              <div key={c.title} className="about-card reveal">
                <div className="about-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="cv-section cv-section-white">
        <div className="cv-container">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Tools &amp; Teknologi</h2>
          <div className="skills-layout">
            {skills.map(s => (
              <div key={s.id} className="skill-row reveal">
                <div className="skill-row-title">{s.icon} {s.category}</div>
                <div className="skill-chips">
                  {s.items.split(',').map(item => (
                    <span key={item} className="chip">{item.trim()}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="cv-section">
        <div className="cv-container">
          <div className="section-label">Perjalanan Karir</div>
          <h2 className="section-title">Pengalaman Kerja</h2>
          <div className="exp-list">
            {experience.map(e => (
              <div key={e.id} className="exp-item reveal">
                <div>
                  <div className="exp-year">{e.period}</div>
                  <div className="exp-dur">{e.duration}</div>
                </div>
                <div>
                  <div className="exp-co">{e.company}</div>
                  <div className="exp-role">{e.role}</div>
                  <p className="exp-desc">{e.description}</p>
                  <div className="exp-chips">
                    {e.stack.split(',').map(s => <span key={s} className="chip">{s.trim()}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="cv-section cv-section-white">
        <div className="cv-container">
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Project yang Pernah Saya Bangun</h2>
          <div className="projects-grid">
            {projects.map((proj, i) => (
              <div key={proj.id} className="proj-card reveal">
                <div className={`proj-thumb ${!proj.image_url ? proj.color : ''} ${proj.image_url ? 'proj-thumb-clickable' : ''}`}>
                  {proj.image_url ? (
                    <Lightbox src={proj.image_url} alt={proj.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={proj.image_url} alt={proj.title} />
                    </Lightbox>
                  ) : (
                    <span className="pt-label">Project 0{i + 1}</span>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: STATUS_BADGE[proj.status] || '' }} />
                </div>
                <div className="proj-body">
                  <div className="proj-title">{proj.title}</div>
                  <p className="proj-desc">{proj.description}</p>
                  <div className="proj-stack">
                    {proj.stack.split(',').map(s => <span key={s} className="chip">{s.trim()}</span>)}
                  </div>
                  <div className="proj-links">
                    {proj.url_demo && proj.url_demo !== '#' && (
                      <a href={proj.url_demo} className="proj-link" target="_blank" rel="noopener">
                        <LinkIcon /> Live Demo
                      </a>
                    )}
                    {proj.url_github && proj.url_github !== '#' && (
                      <a href={proj.url_github} className="proj-link" target="_blank" rel="noopener">
                        <GhSmIcon /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cv-container cta-grid">
          <div>
            <div className="cta-label">Let&apos;s work together</div>
            <h2 className="cta-headline">Punya project<br />atau <em>posisi terbuka?</em></h2>
            <p className="cta-sub">Saya terbuka untuk full-time, freelance, maupun kontrak jangka pendek. Ceritakan kebutuhan kamu dan kita diskusi solusinya.</p>
          </div>
          <div className="cta-right">
            <a href={waUrl} className="btn-wa-big" target="_blank" rel="noopener">
              <WaIcon /> Chat WhatsApp Sekarang
            </a>
            <div className="cta-number">+{p.whatsapp}</div>
            <div className="cta-avail"><span className="pulse-dot" /> Aktif &amp; siap dihubungi</div>
            <div className="cta-socials">
              {p.github   && <a href={p.github}   target="_blank" rel="noopener"><GhBigIcon /></a>}
              {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener"><LiBigIcon /></a>}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cv-footer">
        <div className="cv-container footer-inner">
          <div className="footer-name">{p.name}</div>
          <div className="footer-links">
            {p.github   && <a href={p.github}   target="_blank" rel="noopener">GitHub</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
            <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* Client-only: scroll reveal init */}
      <RevealInit />
    </>
  )
}

// ── SVG ICONS (inline, zero import overhead) ──────────────
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{width:'1em',height:'1em',flexShrink:0}}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.985l6.295-1.452A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.017-1.376l-.36-.214-3.735.861.892-3.626-.235-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  )
}
function GhIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
}
function LiIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{width:16,height:16}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function GhBigIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
}
function LiBigIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{width:20,height:20}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function LinkIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{width:13,height:13}}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
function GhSmIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{width:13,height:13}}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
}
