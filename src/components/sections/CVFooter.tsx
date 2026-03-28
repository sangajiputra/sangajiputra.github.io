import type { Profile } from '@/types'

export default function CVFooter({ profile: p }: { profile: Profile }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cv-footer { padding:26px 0; background:var(--ink); border-top:1px solid rgba(255,255,255,.07); }
        .footer-inner { display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; }
        .footer-name { font-family:'Playfair Display',serif; font-size:15px; color:rgba(255,255,255,.3); }
        .footer-links { display:flex; gap:18px; }
        .footer-links a { font-size:12px; color:rgba(255,255,255,.25); font-weight:500; transition:color .2s; }
        .footer-links a:hover { color:rgba(255,255,255,.55); }
      `}} />
      <footer className="cv-footer">
        <div className="cv-wrap footer-inner">
          <div className="footer-name">{p.name}</div>
          <div className="footer-links">
            {p.github   && <a href={p.github}   target="_blank" rel="noopener">GitHub</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
            <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  )
}
