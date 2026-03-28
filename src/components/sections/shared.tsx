// Shared styles — di-inject sekali di CVNav (paling atas)
export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #1a1612; --body: #3d3630; --muted: #8a7f76; --line: #e4ddd6;
    --bg: #faf8f5; --white: #fff; --accent: #c8521a; --accent-light: #fdf0e8;
    --green: #1e7a4a; --wa: #25D366;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--body); font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  .cv-wrap { max-width: 960px; margin: 0 auto; padding: 0 24px; }
  .sec { padding: 72px 0; border-bottom: 1px solid var(--line); }
  .sec-white { background: var(--white); }
  .sec-label { font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
  .sec-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,38px); font-weight: 700; color: var(--ink); line-height: 1.15; margin-bottom: 40px; }
  .chip { font-size: 12px; font-weight: 500; padding: 4px 11px; border-radius: 4px; background: var(--bg); border: 1px solid var(--line); color: var(--body); }
  .pill { font-size: 12px; font-weight: 500; padding: 5px 13px; border-radius: 20px; border: 1px solid var(--line); color: var(--muted); background: var(--white); }
  .pill-accent { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity .45s ease, transform .45s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(30,122,74,.5)}50%{box-shadow:0 0 0 5px rgba(30,122,74,0)} }
  @keyframes shimmer { 0%{background-position:100% 0}100%{background-position:-100% 0} }
  .sk { background: linear-gradient(90deg,#ede9e4 25%,#e4e0db 50%,#ede9e4 75%); background-size:400% 100%; animation:shimmer 1.6s ease infinite; border-radius:6px; display:block; }
  .sk-dark { background: linear-gradient(90deg,rgba(255,255,255,.07) 25%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.07) 75%); background-size:400% 100%; animation:shimmer 1.6s ease infinite; border-radius:6px; display:block; }
  @media(max-width:768px){
    .hide-mobile{display:none!important}
    .cv-wrap{padding:0 16px}
    .sec{padding:52px 0}
  }
`

export function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{width:size,height:size,flexShrink:0}}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.985l6.295-1.452A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.017-1.376l-.36-.214-3.735.861.892-3.626-.235-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  )
}

export function GhIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{width:size,height:size}}><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
}

export function LiIcon({ size = 18 }: { size?: number }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" style={{width:size,height:size}}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
