import type { Profile } from '@/types'
import { WaIcon, GhIcon, LiIcon } from './shared'

export default function CVCTA({ profile: p, waUrl }: { profile: Profile; waUrl: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cta-sec { padding:80px 0; background:var(--ink); }
        .cta-grid { display:grid; grid-template-columns:1fr auto; gap:48px; align-items:center; }
        .cta-label { font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.35); margin-bottom:12px; }
        .cta-head { font-family:'Playfair Display',serif; font-size:clamp(30px,4vw,48px); font-weight:900; color:#fff; line-height:1.1; margin-bottom:16px; }
        .cta-head em { font-style:italic; color:var(--wa); }
        .cta-sub { font-size:15px; color:rgba(255,255,255,.5); line-height:1.65; max-width:460px; }
        .cta-right { display:flex; flex-direction:column; align-items:center; gap:12px; min-width:240px; }
        .btn-wa-big { display:inline-flex; align-items:center; justify-content:center; gap:12px; background:var(--wa); color:#fff; font-size:15px; font-weight:700; padding:17px 34px; border-radius:10px; width:100%; transition:all .25s; box-shadow:0 6px 24px rgba(37,211,102,.3); }
        .btn-wa-big:hover { transform:translateY(-3px); box-shadow:0 12px 36px rgba(37,211,102,.4); }
        .cta-num { font-size:13px; color:rgba(255,255,255,.3); letter-spacing:.05em; }
        .cta-avail { display:inline-flex; align-items:center; gap:7px; font-size:12px; font-weight:500; color:rgba(255,255,255,.45); }
        .cta-socials { display:flex; gap:14px; }
        .cta-socials a { color:rgba(255,255,255,.4); transition:color .2s; display:flex; }
        .cta-socials a:hover { color:rgba(255,255,255,.8); }
        @media(max-width:768px){ .cta-grid { grid-template-columns:1fr; gap:36px; } .cta-right { width:100%; } }
      `}} />
      <section className="cta-sec" id="contact">
        <div className="cv-wrap cta-grid">
          <div>
            <div className="cta-label">Let&apos;s work together</div>
            <h2 className="cta-head">Punya project<br />atau <em>posisi terbuka?</em></h2>
            <p className="cta-sub">Saya terbuka untuk full-time, freelance, maupun kontrak jangka pendek. Ceritakan kebutuhan kamu dan kita diskusi solusinya.</p>
          </div>
          <div className="cta-right">
            <a href={waUrl} className="btn-wa-big" target="_blank" rel="noopener"><WaIcon size={22}/> Chat WhatsApp Sekarang</a>
            <div className="cta-num">+{p.whatsapp}</div>
            <div className="cta-avail"><span className="pulse-dot"/> Aktif &amp; siap dihubungi</div>
            <div className="cta-socials">
              {p.github   && <a href={p.github}   target="_blank" rel="noopener"><GhIcon size={20}/></a>}
              {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener"><LiIcon size={20}/></a>}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
