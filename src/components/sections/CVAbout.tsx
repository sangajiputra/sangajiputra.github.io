export default function CVAbout() {
  const cards = [
    { icon: '🏗️', title: 'End-to-End Ownership', desc: 'Dari desain database sampai deploy ke production. Saya handle semua layer, jadi nggak perlu koordinasi banyak orang untuk satu produk.' },
    { icon: '🚀', title: 'Cepat, Bersih, Scalable', desc: 'Kode yang saya tulis bisa dibaca, di-maintain, dan tumbuh bareng bisnis kamu — bukan cuma selesai di sprint pertama lalu jadi technical debt.' },
    { icon: '🤝', title: 'Komunikasi Transparan', desc: 'Progress selalu jelas, blocker langsung dikomunikasikan. Saya kerja dengan standar profesional, baik remote maupun on-site.' },
  ]
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .about-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .about-card { background:var(--white); border:1px solid var(--line); border-radius:10px; padding:26px 22px; transition:box-shadow .25s,transform .25s; }
        .about-card:hover { box-shadow:0 8px 32px rgba(0,0,0,.07); transform:translateY(-3px); }
        .about-icon { font-size:26px; margin-bottom:13px; }
        .about-card h3 { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:var(--ink); margin-bottom:8px; }
        .about-card p { font-size:13.5px; color:var(--muted); line-height:1.65; }
        @media(max-width:768px){ .about-grid { grid-template-columns:1fr; } }
      `}} />
      <section id="about" className="sec">
        <div className="cv-wrap">
          <div className="sec-label">Kenapa saya?</div>
          <h2 className="sec-title">Yang bisa saya bawa ke tim kamu</h2>
          <div className="about-grid">
            {cards.map(c => (
              <div key={c.title} className="about-card reveal">
                <div className="about-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
