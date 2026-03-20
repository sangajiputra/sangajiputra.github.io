// Skeleton — ditampilkan saat server masih fetch data dari Neon
// Bentuknya mengikuti layout CV asli persis supaya tidak terasa seperti bug

export default function CVSkeleton() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #1a1612; --line: #e4ddd6; --bg: #faf8f5; --white: #fff;
          --accent: #c8521a; --wa: #25D366;
        }
        body { background: var(--bg); font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .cv-container { max-width: 960px; margin: 0 auto; padding: 0 24px; }

        /* SHIMMER */
        .sk {
          background: linear-gradient(90deg, #ede9e4 25%, #e4e0db 50%, #ede9e4 75%);
          background-size: 400% 100%;
          animation: shimmer 1.6s ease infinite;
          border-radius: 6px;
          display: block;
        }
        @keyframes shimmer {
          0%   { background-position: 100% 0 }
          100% { background-position: -100% 0 }
        }

        /* TOPBAR */
        .sk-topbar { border-bottom: 1px solid var(--line); padding: 13px 0; background: var(--white); position: sticky; top: 0; z-index: 100; }
        .sk-topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }

        /* HERO */
        .sk-hero { padding: 72px 0 64px; border-bottom: 1px solid var(--line); }
        .sk-hero-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: start; }
        .sk-hero-card { background: var(--white); border: 1px solid var(--line); border-radius: 12px; padding: 28px 24px; min-width: 210px; display: flex; flex-direction: column; gap: 20px; }
        .sk-stat { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .sk-divider { height: 1px; background: var(--line); }

        /* SECTION */
        .sk-section { padding: 72px 0; border-bottom: 1px solid var(--line); }
        .sk-section-white { background: var(--white); }

        /* GRIDS */
        .sk-about-grid  { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .sk-skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .sk-proj-grid   { display: grid; grid-template-columns: repeat(2,1fr); gap: 18px; }

        /* CARDS */
        .sk-card { background: var(--white); border: 1px solid var(--line); border-radius: 10px; padding: 26px 22px; }
        .sk-proj-card { background: var(--white); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
        .sk-skill-card { background: var(--white); border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; }

        /* CHIPS ROW */
        .sk-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }

        /* EXP */
        .sk-exp-item { display: grid; grid-template-columns: 155px 1fr; padding: 36px 0; border-bottom: 1px solid var(--line); }
        .sk-exp-item:last-child { border-bottom: none; padding-bottom: 0; }

        /* CTA */
        .sk-cta { padding: 80px 0; background: var(--ink); }
        .sk-cta-grid { display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; }
        .sk-cta-right { min-width: 240px; display: flex; flex-direction: column; gap: 12px; align-items: center; }
        .sk-dark { background: linear-gradient(90deg,rgba(255,255,255,.07) 25%,rgba(255,255,255,.12) 50%,rgba(255,255,255,.07) 75%); background-size: 400% 100%; animation: shimmer 1.6s ease infinite; border-radius: 6px; display: block; }

        /* FOOTER */
        .sk-footer { padding: 26px 0; background: var(--ink); border-top: 1px solid rgba(255,255,255,.07); }
        .sk-footer-inner { display: flex; justify-content: space-between; align-items: center; }

        @media (max-width: 768px) {
          .sk-hero-grid { grid-template-columns: 1fr; }
          .sk-hero-card { flex-direction: row; min-width: unset; }
          .sk-about-grid, .sk-skills-grid { grid-template-columns: 1fr; }
          .sk-proj-grid { grid-template-columns: 1fr; }
          .sk-exp-item { grid-template-columns: 1fr; gap: 8px; }
          .sk-cta-grid { grid-template-columns: 1fr; }
          .sk-cta-right { width: 100%; }
        }
        @media (max-width: 480px) {
          .sk-hero { padding: 44px 0; }
          .sk-section { padding: 52px 0; }
        }
      `}</style>

      {/* NAV */}
      <nav className="sk-topbar">
        <div className="cv-container sk-topbar-inner">
          <span className="sk" style={{width:200,height:22}} />
          <div style={{display:'flex',gap:28}}>
            {[60,48,72,52].map((w,i) => <span key={i} className="sk" style={{width:w,height:14}} />)}
          </div>
          <span className="sk" style={{width:140,height:36,borderRadius:6}} />
        </div>
      </nav>

      {/* HERO */}
      <section className="sk-hero">
        <div className="cv-container sk-hero-grid">
          <div>
            {/* eyebrow */}
            <span className="sk" style={{width:200,height:13,marginBottom:20,display:'block'}} />
            {/* name */}
            <span className="sk" style={{width:'70%',height:64,marginBottom:12,display:'block'}} />
            <span className="sk" style={{width:'50%',height:64,marginBottom:28,display:'block'}} />
            {/* bio */}
            <span className="sk" style={{width:'100%',height:14,marginBottom:8,display:'block'}} />
            <span className="sk" style={{width:'95%',height:14,marginBottom:8,display:'block'}} />
            <span className="sk" style={{width:'88%',height:14,marginBottom:8,display:'block'}} />
            <span className="sk" style={{width:'92%',height:14,marginBottom:8,display:'block'}} />
            <span className="sk" style={{width:'75%',height:14,marginBottom:32,display:'block'}} />
            {/* pills */}
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:36}}>
              {[120,90,80,90,100].map((w,i) => <span key={i} className="sk" style={{width:w,height:30,borderRadius:20}} />)}
            </div>
            {/* buttons */}
            <div style={{display:'flex',gap:12,marginBottom:20}}>
              <span className="sk" style={{width:220,height:50,borderRadius:8}} />
              <span className="sk" style={{width:140,height:50,borderRadius:8}} />
            </div>
            {/* socials */}
            <div style={{display:'flex',gap:10}}>
              <span className="sk" style={{width:100,height:36,borderRadius:7}} />
              <span className="sk" style={{width:100,height:36,borderRadius:7}} />
            </div>
          </div>

          {/* stat card */}
          <div className="sk-hero-card">
            <div className="sk-stat">
              <span className="sk" style={{width:64,height:44}} />
              <span className="sk" style={{width:80,height:11}} />
            </div>
            <div className="sk-divider" />
            <div className="sk-stat">
              <span className="sk" style={{width:64,height:44}} />
              <span className="sk" style={{width:80,height:11}} />
            </div>
            <div className="sk-divider" />
            <div className="sk-stat">
              <span className="sk" style={{width:64,height:44}} />
              <span className="sk" style={{width:80,height:11}} />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="sk-section">
        <div className="cv-container">
          <span className="sk" style={{width:100,height:11,marginBottom:8,display:'block'}} />
          <span className="sk" style={{width:300,height:36,marginBottom:40,display:'block'}} />
          <div className="sk-about-grid">
            {[0,1,2].map(i => (
              <div key={i} className="sk-card">
                <span className="sk" style={{width:40,height:40,borderRadius:8,marginBottom:14,display:'block'}} />
                <span className="sk" style={{width:'70%',height:18,marginBottom:10,display:'block'}} />
                <span className="sk" style={{width:'100%',height:13,marginBottom:6,display:'block'}} />
                <span className="sk" style={{width:'90%',height:13,marginBottom:6,display:'block'}} />
                <span className="sk" style={{width:'80%',height:13,display:'block'}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="sk-section sk-section-white">
        <div className="cv-container">
          <span className="sk" style={{width:80,height:11,marginBottom:8,display:'block'}} />
          <span className="sk" style={{width:240,height:36,marginBottom:40,display:'block'}} />
          <div className="sk-skills-grid">
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="sk-skill-card">
                <span className="sk" style={{width:'40%',height:16,marginBottom:12,display:'block'}} />
                <div className="sk-chips">
                  {[70,85,90,65,75].slice(0, 3 + (i % 3)).map((w,j) => (
                    <span key={j} className="sk" style={{width:w,height:26,borderRadius:4}} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="sk-section">
        <div className="cv-container">
          <span className="sk" style={{width:120,height:11,marginBottom:8,display:'block'}} />
          <span className="sk" style={{width:260,height:36,marginBottom:40,display:'block'}} />
          <div>
            {[0,1,2].map(i => (
              <div key={i} className="sk-exp-item">
                <div>
                  <span className="sk" style={{width:110,height:14,marginBottom:6,display:'block'}} />
                  <span className="sk" style={{width:70,height:12,display:'block'}} />
                </div>
                <div>
                  <span className="sk" style={{width:140,height:12,marginBottom:6,display:'block'}} />
                  <span className="sk" style={{width:'60%',height:26,marginBottom:14,display:'block'}} />
                  <span className="sk" style={{width:'100%',height:13,marginBottom:6,display:'block'}} />
                  <span className="sk" style={{width:'92%',height:13,marginBottom:6,display:'block'}} />
                  <span className="sk" style={{width:'80%',height:13,marginBottom:16,display:'block'}} />
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    {[70,80,65,90,75].slice(0,3+(i%2)).map((w,j) => (
                      <span key={j} className="sk" style={{width:w,height:24,borderRadius:4}} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="sk-section sk-section-white">
        <div className="cv-container">
          <span className="sk" style={{width:80,height:11,marginBottom:8,display:'block'}} />
          <span className="sk" style={{width:320,height:36,marginBottom:40,display:'block'}} />
          <div className="sk-proj-grid">
            {[0,1,2,3].map(i => (
              <div key={i} className="sk-proj-card">
                {/* thumb */}
                <span className="sk" style={{width:'100%',height:160,borderRadius:0,display:'block'}} />
                <div style={{padding:'20px 20px 22px'}}>
                  <span className="sk" style={{width:'75%',height:22,marginBottom:10,display:'block'}} />
                  <span className="sk" style={{width:'100%',height:13,marginBottom:6,display:'block'}} />
                  <span className="sk" style={{width:'85%',height:13,marginBottom:16,display:'block'}} />
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:14}}>
                    {[70,80,90].map((w,j) => <span key={j} className="sk" style={{width:w,height:24,borderRadius:4}} />)}
                  </div>
                  <div style={{display:'flex',gap:14}}>
                    <span className="sk" style={{width:80,height:14}} />
                    <span className="sk" style={{width:65,height:14}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="sk-cta">
        <div className="cv-container sk-cta-grid">
          <div>
            <span className="sk-dark" style={{width:130,height:11,marginBottom:14,display:'block'}} />
            <span className="sk-dark" style={{width:'65%',height:44,marginBottom:10,display:'block'}} />
            <span className="sk-dark" style={{width:'55%',height:44,marginBottom:20,display:'block'}} />
            <span className="sk-dark" style={{width:'90%',height:13,marginBottom:6,display:'block'}} />
            <span className="sk-dark" style={{width:'75%',height:13,display:'block'}} />
          </div>
          <div className="sk-cta-right">
            <span className="sk-dark" style={{width:'100%',height:54,borderRadius:10,display:'block'}} />
            <span className="sk-dark" style={{width:130,height:13,display:'block'}} />
            <span className="sk-dark" style={{width:160,height:13,display:'block'}} />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="sk-footer">
        <div className="cv-container sk-footer-inner">
          <span className="sk-dark" style={{width:200,height:16}} />
          <div style={{display:'flex',gap:18}}>
            {[60,65,80].map((w,i) => <span key={i} className="sk-dark" style={{width:w,height:12}} />)}
          </div>
        </div>
      </div>
    </>
  )
}
