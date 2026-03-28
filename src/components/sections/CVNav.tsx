import type { Profile } from '@/types'
import { globalStyles, WaIcon } from './shared'
import RevealInit from '@/components/RevealInit'

export default function CVNav({ profile, waUrl }: { profile: Profile; waUrl: string }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles + `
        .topbar { border-bottom:1px solid var(--line); padding:13px 0; background:var(--white); position:sticky; top:0; z-index:100; }
        .topbar-inner { display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .topbar-name { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:var(--ink); }
        .topbar-nav { display:flex; gap:28px; list-style:none; }
        .topbar-nav a { font-size:13px; font-weight:500; color:var(--muted); transition:color .2s; }
        .topbar-nav a:hover { color:var(--ink); }
        .topbar-cta { display:inline-flex; align-items:center; gap:8px; background:var(--wa); color:#fff; font-size:13px; font-weight:600; padding:9px 18px; border-radius:6px; white-space:nowrap; transition:opacity .2s,transform .2s; }
        .topbar-cta:hover { opacity:.9; transform:translateY(-1px); }
      `}} />
      <RevealInit />
      <nav className="topbar">
        <div className="cv-wrap topbar-inner">
          <div className="topbar-name">{profile.name}</div>
          <ul className="topbar-nav hide-mobile">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
          <a href={waUrl} className="topbar-cta" target="_blank" rel="noopener">
            <WaIcon size={16} /> Hubungi via WA
          </a>
        </div>
      </nav>
    </>
  )
}
