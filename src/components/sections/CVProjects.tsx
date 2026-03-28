import type { Project } from '@/types'
import Lightbox from '@/components/Lightbox'

const STATUS_BADGE: Record<string, React.ReactNode> = {
  live: <span className="proj-badge badge-live">● Live</span>,
  wip:  <span className="proj-badge badge-wip">⬡ WIP</span>,
  oss:  <span className="proj-badge badge-oss">◈ Open Source</span>,
}

export default function CVProjects({ projects }: { projects: Project[] }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .proj-grid  { display:grid; grid-template-columns:repeat(2,1fr); gap:18px; }
        .proj-card  { background:var(--white); border:1px solid var(--line); border-radius:10px; overflow:hidden; transition:box-shadow .25s,transform .25s; }
        .proj-card:hover { box-shadow:0 10px 40px rgba(0,0,0,.09); transform:translateY(-4px); }
        .proj-thumb { height:160px; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
        .proj-thumb img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .4s ease; }
        .proj-thumb:hover img { transform:scale(1.04); }
        .proj-thumb-click { cursor:zoom-in; width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .pt-1{background:linear-gradient(135deg,#fef3ec,#fce6d0)}
        .pt-2{background:linear-gradient(135deg,#edf5f0,#d3ece0)}
        .pt-3{background:linear-gradient(135deg,#eef2fe,#dce4fc)}
        .pt-4{background:linear-gradient(135deg,#fdf5e3,#f9ecc9)}
        .pt-5{background:linear-gradient(135deg,#fce7f3,#fbd4e9)}
        .pt-6{background:linear-gradient(135deg,#e0f2fe,#c5e7fb)}
        .pt-label { font-family:'Playfair Display',serif; font-size:28px; font-weight:900; opacity:.1; color:var(--ink); user-select:none; }
        .proj-badge { position:absolute; top:11px; right:11px; font-size:10px; font-weight:700; letter-spacing:.07em; text-transform:uppercase; padding:3px 10px; border-radius:20px; }
        .badge-live { background:#e6f6ec; color:var(--green); }
        .badge-wip  { background:#fef9ec; color:#a07800; }
        .badge-oss  { background:var(--accent-light); color:var(--accent); }
        .proj-body  { padding:20px 20px 22px; }
        .proj-title { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:var(--ink); margin-bottom:7px; line-height:1.25; }
        .proj-desc  { font-size:13px; color:var(--muted); line-height:1.65; margin-bottom:13px; }
        .proj-stack { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px; }
        .proj-links { display:flex; gap:14px; }
        .proj-link  { font-size:12px; font-weight:600; color:var(--accent); display:flex; align-items:center; gap:4px; transition:opacity .2s; }
        .proj-link:hover { opacity:.7; }
        .proj-link svg { width:13px; height:13px; }
        @media(max-width:768px){ .proj-grid { grid-template-columns:1fr; } }
      `}} />
      <section id="projects" className="sec sec-white">
        <div className="cv-wrap">
          <div className="sec-label">Portfolio</div>
          <h2 className="sec-title">Project yang Pernah Saya Bangun</h2>
          <div className="proj-grid">
            {projects.map((proj, i) => (
              <div key={proj.id} className="proj-card reveal">
                <div className={`proj-thumb ${!proj.image_url ? proj.color : ''}`}>
                  {proj.image_url ? (
                    <Lightbox src={proj.image_url} alt={proj.title}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={proj.image_url} alt={proj.title} />
                    </Lightbox>
                  ) : (
                    <span className="pt-label">Project 0{i + 1}</span>
                  )}
                  {STATUS_BADGE[proj.status]}
                </div>
                <div className="proj-body">
                  <div className="proj-title">{proj.title}</div>
                  <p className="proj-desc">{proj.description}</p>
                  <div className="proj-stack">
                    {proj.stack.split(',').map(s => <span key={s} className="chip">{s.trim()}</span>)}
                  </div>
                  <div className="proj-links">
                    {proj.url_demo   && proj.url_demo   !== '#' && <a href={proj.url_demo}   className="proj-link" target="_blank" rel="noopener"><IconLink /> Live Demo</a>}
                    {proj.url_github && proj.url_github !== '#' && <a href={proj.url_github} className="proj-link" target="_blank" rel="noopener"><IconGh /> GitHub</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function IconLink() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
function IconGh() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
}
