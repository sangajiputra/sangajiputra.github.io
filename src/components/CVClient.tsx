'use client'

import { useEffect } from 'react'
import type { CVData } from '@/types'
import styles from './CVClient.module.css'

const WA_MSG = encodeURIComponent('Hi Sang Aji, saya tertarik untuk diskusi project bersama kamu!')

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.985l6.295-1.452A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.017-1.376l-.36-.214-3.735.861.892-3.626-.235-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
)

const ICON_LINK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{width:13,height:13}}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const ICON_GH = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{width:13,height:13}}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
  </svg>
)
const ICON_GH_FILL = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)
const ICON_LI = (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const STATUS_BADGE: Record<string, React.ReactNode> = {
  live: <span className={`${styles.projBadge} ${styles.badgeLive}`}>● Live</span>,
  wip:  <span className={`${styles.projBadge} ${styles.badgeWip}`}>⬡ WIP</span>,
  oss:  <span className={`${styles.projBadge} ${styles.badgeOss}`}>◈ Open Source</span>,
}

export default function CVClient({ data }: { data: CVData }) {
  const { profile: p, skills, experience, projects } = data
  const waUrl = `https://wa.me/${p.whatsapp}?text=${WA_MSG}`

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add(styles.visible); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const nameParts = p.name.split(' ')
  const lastName  = nameParts.pop()!
  const firstName = nameParts.join(' ')

  return (
    <>
      {/* NAV */}
      <nav className={styles.topbar}>
        <div className={styles.container}>
          <div className={styles.topbarName}>{p.name}</div>
          <ul className={styles.topbarNav}>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
          <a href={waUrl} className={styles.topbarCta} target="_blank" rel="noopener">
            <span className={styles.icon20}>{WA_ICON}</span>
            Hubungi via WA
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div>
            {p.available && (
              <div className={`${styles.heroEyebrow} fade-1`}>
                <span className={styles.dot} /> Open to work · Remote &amp; On-site
              </div>
            )}
            <h1 className={`${styles.heroName} fade-2`}>
              {firstName}<br /><em>{lastName}</em>
            </h1>
            <p className={`${styles.heroBio} fade-3`} dangerouslySetInnerHTML={{ __html: p.bio }} />
            <div className={`${styles.heroPills} fade-4`}>
              <span className={`${styles.pill} ${styles.pillAccent}`}>Fullstack Developer</span>
              <span className={styles.pill}>React &amp; Next.js</span>
              <span className={styles.pill}>Node.js</span>
              <span className={styles.pill}>PostgreSQL</span>
              <span className={styles.pill}>{p.location}</span>
            </div>
            <div className={`${styles.heroActions} fade-5`}>
              <a href={waUrl} className={styles.btnWa} target="_blank" rel="noopener">
                <span className={styles.icon20}>{WA_ICON}</span>
                Chat WhatsApp Sekarang
              </a>
              <a href="#projects" className={styles.btnOutline}>Lihat Project →</a>
            </div>
            {/* Social links */}
            <div className={`${styles.heroSocials} fade-5`}>
              {p.github && (
                <a href={p.github} className={styles.socialLink} target="_blank" rel="noopener">
                  {ICON_GH_FILL} GitHub
                </a>
              )}
              {p.linkedin && (
                <a href={p.linkedin} className={styles.socialLink} target="_blank" rel="noopener">
                  {ICON_LI} LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className={`${styles.heroCard} fade-5`}>
            <div className={styles.statItem}>
              <div className={styles.statNum}>{p.years_exp}<span>+</span></div>
              <div className={styles.statLabel}>Tahun Pengalaman</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNum}>{p.projects_done}<span>+</span></div>
              <div className={styles.statLabel}>Project Selesai</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNum}>{p.clients}<span>+</span></div>
              <div className={styles.statLabel}>Klien Puas</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionLabel}>Kenapa saya?</div>
          <h2 className={styles.sectionTitle}>Yang bisa saya bawa ke tim kamu</h2>
          <div className={styles.aboutGrid}>
            {[
              { icon: '🏗️', title: 'End-to-End Ownership', desc: 'Dari desain database sampai deploy ke production. Saya handle semua layer, jadi nggak perlu koordinasi banyak orang untuk satu produk.' },
              { icon: '🚀', title: 'Cepat, Bersih, Scalable', desc: 'Kode yang saya tulis bisa dibaca, di-maintain, dan tumbuh bareng bisnis kamu — bukan cuma selesai di sprint pertama lalu jadi technical debt.' },
              { icon: '🤝', title: 'Komunikasi Transparan', desc: 'Progress selalu jelas, blocker langsung dikomunikasikan. Saya kerja dengan standar profesional, baik remote maupun on-site.' },
            ].map(c => (
              <div key={c.title} className={`${styles.aboutCard} ${styles.reveal}`}>
                <div className={styles.aboutIcon}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className={styles.section} style={{ background: 'var(--white)' }}>
        <div className={styles.container}>
          <div className={styles.sectionLabel}>Tech Stack</div>
          <h2 className={styles.sectionTitle}>Tools &amp; Teknologi</h2>
          <div className={styles.skillsLayout}>
            {skills.map(s => (
              <div key={s.id} className={`${styles.skillRow} ${styles.reveal}`}>
                <div className={styles.skillRowTitle}>{s.icon} {s.category}</div>
                <div className={styles.skillChips}>
                  {s.items.split(',').map(item => (
                    <span key={item} className={styles.chip}>{item.trim()}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionLabel}>Perjalanan Karir</div>
          <h2 className={styles.sectionTitle}>Pengalaman Kerja</h2>
          <div className={styles.expList}>
            {experience.map(e => (
              <div key={e.id} className={`${styles.expItem} ${styles.reveal}`}>
                <div className={styles.expPeriod}>
                  <div className={styles.expYear}>{e.period}</div>
                  <div className={styles.expDur}>{e.duration}</div>
                </div>
                <div>
                  <div className={styles.expCo}>{e.company}</div>
                  <div className={styles.expRole}>{e.role}</div>
                  <p className={styles.expDesc}>{e.description}</p>
                  <div className={styles.expChips}>
                    {e.stack.split(',').map(s => <span key={s} className={styles.chip}>{s.trim()}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={styles.section} style={{ background: 'var(--white)' }}>
        <div className={styles.container}>
          <div className={styles.sectionLabel}>Portfolio</div>
          <h2 className={styles.sectionTitle}>Project yang Pernah Saya Bangun</h2>
          <div className={styles.projectsGrid}>
            {projects.map((proj, i) => (
              <div key={proj.id} className={`${styles.projCard} ${styles.reveal}`}>
                <div className={`${styles.projThumb} ${!proj.image_url ? styles[proj.color] : ''}`}
                  style={proj.image_url ? { backgroundImage: `url(${proj.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
                  {!proj.image_url && <span className={styles.ptLabel}>Project 0{i + 1}</span>}
                  {STATUS_BADGE[proj.status]}
                </div>
                <div className={styles.projBody}>
                  <div className={styles.projTitle}>{proj.title}</div>
                  <p className={styles.projDesc}>{proj.description}</p>
                  <div className={styles.projStack}>
                    {proj.stack.split(',').map(s => <span key={s} className={styles.chip}>{s.trim()}</span>)}
                  </div>
                  <div className={styles.projLinks}>
                    {proj.url_demo && proj.url_demo !== '#' && (
                      <a href={proj.url_demo} className={styles.projLink} target="_blank" rel="noopener">
                        {ICON_LINK} Live Demo
                      </a>
                    )}
                    {proj.url_github && proj.url_github !== '#' && (
                      <a href={proj.url_github} className={styles.projLink} target="_blank" rel="noopener">
                        {ICON_GH} GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} id="contact">
        <div className={styles.container}>
          <div>
            <div className={styles.ctaLabel}>Let&apos;s work together</div>
            <h2 className={styles.ctaHeadline}>Punya project<br />atau <em>posisi terbuka?</em></h2>
            <p className={styles.ctaSub}>Saya terbuka untuk full-time, freelance, maupun kontrak jangka pendek. Ceritakan kebutuhan kamu dan kita diskusi solusinya.</p>
          </div>
          <div className={styles.ctaRight}>
            <a href={waUrl} className={styles.btnWaBig} target="_blank" rel="noopener">
              <span className={styles.icon22}>{WA_ICON}</span>
              Chat WhatsApp Sekarang
            </a>
            <div className={styles.ctaNumber}>+{p.whatsapp}</div>
            <div className={styles.ctaAvail}><span className={styles.dot} /> Aktif &amp; siap dihubungi</div>
            <div className={styles.ctaSocials}>
              {p.github && <a href={p.github} target="_blank" rel="noopener">{ICON_GH_FILL}</a>}
              {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener">{ICON_LI}</a>}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerName}>{p.name}</div>
          <div className={styles.footerLinks}>
            {p.github   && <a href={p.github}   target="_blank" rel="noopener">GitHub</a>}
            {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener">LinkedIn</a>}
            <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  )
}
