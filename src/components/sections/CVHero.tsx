import type { Profile } from '@/types'
import { WaIcon, GhIcon, LiIcon } from './shared'

export default function CVHero({ profile: p, waUrl }: { profile: Profile; waUrl: string }) {
  const parts = p.name.split(' ')
  const last  = parts.pop()!
  const first = parts.join(' ')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .hero { padding:72px 0 64px; border-bottom:1px solid var(--line); }
        .hero-grid { display:grid; grid-template-columns:1fr auto; gap:48px; align-items:start; }
        .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--accent); margin-bottom:20px; }
        .pulse-dot { display:inline-block; width:7px; height:7px; background:var(--green); border-radius:50%; animation:pulse 2.5s ease infinite; }
        .hero-name { font-family:'Playfair Display',serif; font-size:clamp(40px,6vw,68px); font-weight:900; line-height:1.05; color:var(--ink); margin-bottom:24px; letter-spacing:-.02em; }
        .hero-name em { font-style:italic; color:var(--accent); }
        .hero-bio { font-size:16px; line-height:1.75; color:var(--body); max-width:540px; margin-bottom:32px; }
        .hero-bio strong { color:var(--ink); font-weight:600; }
        .hero-pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:36px; }
        .hero-actions { display:flex; gap:12px; flex-wrap:wrap; align-items:center; margin-bottom:20px; }
        .btn-wa { display:inline-flex; align-items:center; gap:10px; background:var(--wa); color:#fff; font-size:15px; font-weight:600; padding:14px 28px; border-radius:8px; transition:all .25s; box-shadow:0 4px 16px rgba(37,211,102,.25); }
        .btn-wa:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(37,211,102,.35); }
        .btn-outline { display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:600; padding:14px 24px; border-radius:8px; border:1.5px solid var(--line); color:var(--body); transition:all .2s; }
        .btn-outline:hover { border-color:var(--ink); color:var(--ink); }
        .hero-socials { display:flex; gap:10px; flex-wrap:wrap; }
        .social-link { display:inline-flex; align-items:center; gap:7px; font-size:13px; font-weight:600; color:var(--muted); border:1.5px solid var(--line); border-radius:7px; padding:7px 14px; background:var(--white); transition:all .2s; }
        .social-link:hover { color:var(--ink); border-color:var(--ink); }
        .hero-card { background:var(--white); border:1px solid var(--line); border-radius:12px; padding:28px 24px; min-width:210px; display:flex; flex-direction:column; gap:20px; box-shadow:0 2px 20px rgba(0,0,0,.05); }
        .stat-item { text-align:center; }
        .stat-num { font-family:'Playfair Display',serif; font-size:36px; font-weight:900; color:var(--ink); line-height:1; }
        .stat-num span { color:var(--accent); }
        .stat-label { font-size:11px; font-weight:500; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin-top:4px; }
        .stat-div { height:1px; background:var(--line); }
        @media(max-width:768px){
          .hero { padding:44px 0; }
          .hero-grid { grid-template-columns:1fr; gap:32px; }
          .hero-card { flex-direction:row; min-width:unset; }
          .stat-item { flex:1; }
          .stat-div { width:1px; height:auto; }
          .stat-num { font-size:26px; }
        }
        @media(max-width:480px){
          .hero-card { flex-direction:column; }
          .stat-div { width:auto; height:1px; }
        }
      `}} />
      <section className="hero">
        <div className="cv-wrap hero-grid">
          <div>
            {p.available && (
              <div className="hero-eyebrow"><span className="pulse-dot" /> Open to work · Remote &amp; On-site</div>
            )}
            <h1 className="hero-name">{first}<br /><em>{last}</em></h1>
            <p className="hero-bio" dangerouslySetInnerHTML={{ __html: p.bio }} />
            <div className="hero-pills">
              <span className="pill pill-accent">Fullstack Developer</span>
              <span className="pill">React &amp; Next.js</span>
              <span className="pill">Node.js</span>
              <span className="pill">PostgreSQL</span>
              <span className="pill">{p.location}</span>
            </div>
            <div className="hero-actions">
              <a href={waUrl} className="btn-wa" target="_blank" rel="noopener"><WaIcon size={20}/> Chat WhatsApp Sekarang</a>
              <a href="#projects" className="btn-outline">Lihat Project →</a>
            </div>
            <div className="hero-socials">
              {p.github   && <a href={p.github}   className="social-link" target="_blank" rel="noopener"><GhIcon size={16}/> GitHub</a>}
              {p.linkedin && <a href={p.linkedin} className="social-link" target="_blank" rel="noopener"><LiIcon size={16}/> LinkedIn</a>}
            </div>
          </div>
          <div className="hero-card">
            <div className="stat-item"><div className="stat-num">{p.years_exp}<span>+</span></div><div className="stat-label">Tahun Pengalaman</div></div>
            <div className="stat-div" />
            <div className="stat-item"><div className="stat-num">{p.projects_done}<span>+</span></div><div className="stat-label">Project Selesai</div></div>
            <div className="stat-div" />
            <div className="stat-item"><div className="stat-num">{p.clients}<span>+</span></div><div className="stat-label">Klien Puas</div></div>
          </div>
        </div>
      </section>
    </>
  )
}
