import type { Skill } from '@/types'

export default function CVSkills({ skills }: { skills: Skill[] }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .skills-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .skill-row { background:var(--white); border:1px solid var(--line); border-radius:10px; padding:18px 20px; }
        .skill-row-title { font-size:13px; font-weight:600; color:var(--ink); margin-bottom:11px; display:flex; align-items:center; gap:7px; }
        .skill-chips { display:flex; flex-wrap:wrap; gap:6px; }
        @media(max-width:768px){ .skills-grid { grid-template-columns:1fr; } }
      `}} />
      <section id="skills" className="sec sec-white">
        <div className="cv-wrap">
          <div className="sec-label">Tech Stack</div>
          <h2 className="sec-title">Tools &amp; Teknologi</h2>
          <div className="skills-grid">
            {skills.map(s => (
              <div key={s.id} className="skill-row reveal">
                <div className="skill-row-title">{s.icon} {s.category}</div>
                <div className="skill-chips">
                  {s.items.split(',').map(item => <span key={item} className="chip">{item.trim()}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
