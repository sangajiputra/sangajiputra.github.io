import type { Experience } from '@/types'

export default function CVExperience({ experience }: { experience: Experience[] }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .exp-list { display:flex; flex-direction:column; }
        .exp-item { display:grid; grid-template-columns:155px 1fr; padding:36px 0; border-bottom:1px solid var(--line); }
        .exp-item:last-child { border-bottom:none; padding-bottom:0; }
        .exp-year { font-size:13px; font-weight:600; color:var(--accent); }
        .exp-dur  { font-size:12px; color:var(--muted); margin-top:2px; }
        .exp-co   { font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); margin-bottom:5px; }
        .exp-role { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--ink); margin-bottom:11px; line-height:1.2; }
        .exp-desc { font-size:14px; color:var(--body); line-height:1.7; max-width:580px; margin-bottom:13px; }
        .exp-chips { display:flex; flex-wrap:wrap; gap:6px; }
        @media(max-width:768px){ .exp-item { grid-template-columns:1fr; gap:6px; } }
      `}} />
      <section id="experience" className="sec">
        <div className="cv-wrap">
          <div className="sec-label">Perjalanan Karir</div>
          <h2 className="sec-title">Pengalaman Kerja</h2>
          <div className="exp-list">
            {experience.map(e => (
              <div key={e.id} className="exp-item reveal">
                <div><div className="exp-year">{e.period}</div><div className="exp-dur">{e.duration}</div></div>
                <div>
                  <div className="exp-co">{e.company}</div>
                  <div className="exp-role">{e.role}</div>
                  <p className="exp-desc">{e.description}</p>
                  <div className="exp-chips">{e.stack.split(',').map(s => <span key={s} className="chip">{s.trim()}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
