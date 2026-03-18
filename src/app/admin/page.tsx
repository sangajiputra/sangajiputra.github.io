'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Profile, Skill, Experience, Project } from '@/types'
import styles from './admin.module.css'

// ── helpers ──────────────────────────────────────────────
const api = async (method: string, path: string, body?: unknown, token?: string) => {
  const res = await fetch(`/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { 'x-admin-token': token } : {}) },
    credentials: 'include',
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error')
  return data
}

const STATUS_LABEL: Record<string, string> = { live: '● Live', wip: '⬡ WIP', oss: '◈ Open Source' }

// ── MAIN ─────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed]   = useState<boolean | null>(null)
  const [page, setPage]       = useState<'profile'|'skills'|'experience'|'projects'>('profile')
  const [toast, setToast]     = useState<{ msg: string; type: 'ok'|'err' } | null>(null)

  const showToast = (msg: string, type: 'ok'|'err' = 'ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // check session
  useEffect(() => {
    api('GET', '/auth').then(d => setAuthed(d.authenticated)).catch(() => setAuthed(false))
  }, [])

  if (authed === null) return <div className={styles.loading}>Memuat...</div>
  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div className={styles.layout}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoName}>Sang Aji Putra Choirul</div>
          <div className={styles.logoRole}>Admin Panel</div>
        </div>
        {([
          ['profile',    '👤', 'Profil & Bio'],
          ['skills',     '⚙️', 'Skills'],
          ['experience', '💼', 'Pengalaman'],
          ['projects',   '🚀', 'Projects'],
        ] as const).map(([key, icon, label]) => (
          <div key={key}
            className={`${styles.navItem} ${page === key ? styles.navActive : ''}`}
            onClick={() => setPage(key)}>
            <span>{icon}</span> {label}
          </div>
        ))}
        <div className={styles.sidebarFooter}>
          <a href="/" target="_blank">🌐 Lihat CV</a>
          <a href="#" onClick={async () => { await api('DELETE', '/auth'); setAuthed(false) }}>🚪 Keluar</a>
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        {page === 'profile'    && <ProfilePage    showToast={showToast} />}
        {page === 'skills'     && <SkillsPage     showToast={showToast} />}
        {page === 'experience' && <ExperiencePage showToast={showToast} />}
        {page === 'projects'   && <ProjectsPage   showToast={showToast} />}
      </main>

      {/* TOAST */}
      {toast && (
        <div className={`${styles.toast} ${toast.type === 'ok' ? styles.toastOk : styles.toastErr}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}

// ── LOGIN ─────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw]   = useState('')
  const [err, setErr] = useState('')
  const login = async () => {
    setErr('')
    try {
      await api('POST', '/auth', { password: pw })
      onLogin()
    } catch { setErr('Password salah') }
  }
  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginBox}>
        <h1>Admin Panel</h1>
        <p>CV Sang Aji Putra Choirul</p>
        <input className={styles.input} type="password" placeholder="Password admin"
          value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()} />
        <button className={styles.btnPrimary} onClick={login}>Masuk</button>
        {err && <div className={styles.errMsg}>{err}</div>}
      </div>
    </div>
  )
}

// ── PROFILE PAGE ──────────────────────────────────────────
function ProfilePage({ showToast }: { showToast: (m: string, t?: 'ok'|'err') => void }) {
  const [form, setForm] = useState<Partial<Profile>>({})
  const set = (k: keyof Profile, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    api('GET', '/profile').then(setForm)
  }, [])

  const save = async () => {
    try { await api('POST', '/profile', form); showToast('✅ Profil disimpan!') }
    catch { showToast('❌ Gagal menyimpan', 'err') }
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2>Profil &amp; Bio</h2>
        <p>Informasi utama yang tampil di hero section CV kamu</p>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}><h3>Data Diri</h3></div>
        <div className={styles.cardBody}>
          <div className={styles.row2}>
            <Field label="Nama Lengkap"><Input value={form.name||''} onChange={v => set('name',v)} /></Field>
            <Field label="Tagline"><Input value={form.tagline||''} onChange={v => set('tagline',v)} /></Field>
          </div>
          <Field label="Bio (boleh pakai HTML: <strong>, <br>)">
            <textarea className={styles.textarea} rows={5} value={form.bio||''} onChange={e => set('bio', e.target.value)} />
          </Field>
          <div className={styles.row2}>
            <Field label="Lokasi"><Input value={form.location||''} onChange={v => set('location',v)} /></Field>
            <Field label="Nomor WhatsApp (628...)"><Input value={form.whatsapp||''} onChange={v => set('whatsapp',v)} /></Field>
          </div>
          <div className={styles.row2}>
            <Field label="URL GitHub"><Input value={form.github||''} onChange={v => set('github',v)} /></Field>
            <Field label="URL LinkedIn"><Input value={form.linkedin||''} onChange={v => set('linkedin',v)} /></Field>
          </div>
          <div className={styles.row3}>
            <Field label="Tahun Pengalaman"><Input type="number" value={String(form.years_exp||0)} onChange={v => set('years_exp', Number(v))} /></Field>
            <Field label="Jumlah Project"><Input type="number" value={String(form.projects_done||0)} onChange={v => set('projects_done', Number(v))} /></Field>
            <Field label="Jumlah Klien"><Input type="number" value={String(form.clients||0)} onChange={v => set('clients', Number(v))} /></Field>
          </div>
          <Field label="Status">
            <label className={styles.toggleLabel}>
              <input type="checkbox" checked={!!form.available} onChange={e => set('available', e.target.checked)} />
              <span className={styles.toggleSlider} />
              <span style={{marginLeft:10,fontSize:13,color:'var(--muted)'}}>
                {form.available ? 'Open to work' : 'Tidak tersedia'}
              </span>
            </label>
          </Field>
          <div className={styles.formActions}>
            <button className={styles.btnPrimary} onClick={save}>💾 Simpan Perubahan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── SKILLS PAGE ───────────────────────────────────────────
function SkillsPage({ showToast }: { showToast: (m: string, t?: 'ok'|'err') => void }) {
  const [rows, setRows]     = useState<Skill[]>([])
  const [modal, setModal]   = useState<Partial<Skill> | null>(null)

  const load = useCallback(() => api('GET', '/skills').then(setRows), [])
  useEffect(() => { load() }, [load])

  const save = async () => {
    try { if (!modal) return; await api('POST', '/skills', modal); setModal(null); load(); showToast('✅ Skill disimpan!') }
    catch { showToast('❌ Gagal', 'err') }
  }
  const del = async (id: number) => {
    if (!confirm('Hapus skill ini?')) return
    await api('DELETE', `/skills?id=${id}`)
    load(); showToast('🗑️ Dihapus')
  }

  return (
    <div>
      <div className={styles.pageHeaderRow}>
        <div><h2>Skills</h2><p>Kategori skill di CV</p></div>
        <button className={styles.btnPrimarySmall} onClick={() => setModal({ sort_order: rows.length + 1 })}>+ Tambah</button>
      </div>
      <div className={styles.card}>
        <table className={styles.table}>
          <thead><tr><th>Icon</th><th>Kategori</th><th>Items</th><th>Urutan</th><th>Aksi</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{fontSize:20}}>{r.icon}</td>
                <td style={{fontWeight:600,color:'var(--ink)'}}>{r.category}</td>
                <td style={{fontSize:12,color:'var(--muted)',maxWidth:280}}>{r.items}</td>
                <td>{r.sort_order}</td>
                <td>
                  <button className={styles.btnGhost} onClick={() => setModal(r)}>Edit</button>
                  <button className={`${styles.btnGhost} ${styles.btnDanger}`} onClick={() => del(r.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.id ? 'Edit Skill' : 'Tambah Skill'} onClose={() => setModal(null)} onSave={save}>
          <div className={styles.row2}>
            <Field label="Icon (emoji)"><Input value={modal.icon||''} onChange={v => setModal(m => ({...m!, icon:v}))} /></Field>
            <Field label="Kategori"><Input value={modal.category||''} onChange={v => setModal(m => ({...m!, category:v}))} /></Field>
          </div>
          <Field label="Items (pisahkan dengan koma)"><Input value={modal.items||''} onChange={v => setModal(m => ({...m!, items:v}))} /></Field>
          <Field label="Urutan"><Input type="number" value={String(modal.sort_order||0)} onChange={v => setModal(m => ({...m!, sort_order:Number(v)}))} /></Field>
        </Modal>
      )}
    </div>
  )
}

// ── EXPERIENCE PAGE ───────────────────────────────────────
function ExperiencePage({ showToast }: { showToast: (m: string, t?: 'ok'|'err') => void }) {
  const [rows, setRows]   = useState<Experience[]>([])
  const [modal, setModal] = useState<Partial<Experience> | null>(null)

  const load = useCallback(() => api('GET', '/experience').then(setRows), [])
  useEffect(() => { load() }, [load])

  const save = async () => {
    try { if (!modal) return; await api('POST', '/experience', modal); setModal(null); load(); showToast('✅ Disimpan!') }
    catch { showToast('❌ Gagal', 'err') }
  }
  const del = async (id: number) => {
    if (!confirm('Hapus pengalaman ini?')) return
    await api('DELETE', `/experience?id=${id}`)
    load(); showToast('🗑️ Dihapus')
  }

  return (
    <div>
      <div className={styles.pageHeaderRow}>
        <div><h2>Pengalaman</h2><p>Timeline karir kamu</p></div>
        <button className={styles.btnPrimarySmall} onClick={() => setModal({ sort_order: rows.length + 1 })}>+ Tambah</button>
      </div>
      <div className={styles.card}>
        <table className={styles.table}>
          <thead><tr><th>Periode</th><th>Perusahaan</th><th>Role</th><th>Aksi</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{color:'var(--accent)',fontWeight:600,fontSize:13}}>{r.period}</td>
                <td style={{fontWeight:600,color:'var(--ink)'}}>{r.company}</td>
                <td>{r.role}</td>
                <td>
                  <button className={styles.btnGhost} onClick={() => setModal(r)}>Edit</button>
                  <button className={`${styles.btnGhost} ${styles.btnDanger}`} onClick={() => del(r.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.id ? 'Edit Pengalaman' : 'Tambah Pengalaman'} onClose={() => setModal(null)} onSave={save}>
          <div className={styles.row2}>
            <Field label="Perusahaan"><Input value={modal.company||''} onChange={v => setModal(m => ({...m!, company:v}))} /></Field>
            <Field label="Role"><Input value={modal.role||''} onChange={v => setModal(m => ({...m!, role:v}))} /></Field>
          </div>
          <div className={styles.row2}>
            <Field label="Periode"><Input value={modal.period||''} placeholder="2022 – Sekarang" onChange={v => setModal(m => ({...m!, period:v}))} /></Field>
            <Field label="Durasi"><Input value={modal.duration||''} placeholder="~3 tahun" onChange={v => setModal(m => ({...m!, duration:v}))} /></Field>
          </div>
          <Field label="Deskripsi">
            <textarea className={styles.textarea} rows={4} value={modal.description||''} onChange={e => setModal(m => ({...m!, description:e.target.value}))} />
          </Field>
          <Field label="Stack (pisahkan koma)"><Input value={modal.stack||''} onChange={v => setModal(m => ({...m!, stack:v}))} /></Field>
          <Field label="Urutan"><Input type="number" value={String(modal.sort_order||0)} onChange={v => setModal(m => ({...m!, sort_order:Number(v)}))} /></Field>
        </Modal>
      )}
    </div>
  )
}

// ── PROJECTS PAGE ─────────────────────────────────────────
function ProjectsPage({ showToast }: { showToast: (m: string, t?: 'ok'|'err') => void }) {
  const [rows, setRows]   = useState<Project[]>([])
  const [modal, setModal] = useState<Partial<Project> | null>(null)

  const load = useCallback(() => api('GET', '/projects?all=1').then(setRows), [])
  useEffect(() => { load() }, [load])

  const save = async () => {
    try { if (!modal) return; await api('POST', '/projects', { ...modal, image_url: modal.image_url ?? '' }); setModal(null); load(); showToast('✅ Project disimpan!') }
    catch { showToast('❌ Gagal', 'err') }
  }
  const del = async (id: number) => {
    if (!confirm('Hapus project ini?')) return
    await api('DELETE', `/projects?id=${id}`)
    load(); showToast('🗑️ Dihapus')
  }
  const toggle = async (row: Project, active: boolean) => {
    await api('POST', '/projects', { ...row, active })
    load()
  }

  return (
    <div>
      <div className={styles.pageHeaderRow}>
        <div><h2>Projects</h2><p>Portfolio project kamu</p></div>
        <button className={styles.btnPrimarySmall} onClick={() => setModal({ status:'live', color:'pt-1', active:true, sort_order: rows.length+1, image_url:'' })}>+ Tambah</button>
      </div>
      <div className={styles.card}>
        <table className={styles.table}>
          <thead><tr><th>Judul</th><th>Status</th><th>Stack</th><th>Aktif</th><th>Aksi</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td style={{fontWeight:600,color:'var(--ink)'}}>{r.title}</td>
                <td><span className={`${styles.badge} ${r.status==='live'?styles.badgeLive:r.status==='wip'?styles.badgeWip:styles.badgeOss}`}>{STATUS_LABEL[r.status]}</span></td>
                <td style={{fontSize:12,color:'var(--muted)',maxWidth:200}}>{r.stack}</td>
                <td>
                  <label className={styles.toggleLabel}>
                    <input type="checkbox" checked={r.active} onChange={e => toggle(r, e.target.checked)} />
                    <span className={styles.toggleSlider} />
                  </label>
                </td>
                <td>
                  <button className={styles.btnGhost} onClick={() => setModal(r)}>Edit</button>
                  <button className={`${styles.btnGhost} ${styles.btnDanger}`} onClick={() => del(r.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <Modal title={modal.id ? 'Edit Project' : 'Tambah Project'} onClose={() => setModal(null)} onSave={save}>
          <Field label="Judul"><Input value={modal.title||''} onChange={v => setModal(m => ({...m!, title:v}))} /></Field>
          <Field label="Deskripsi">
            <textarea className={styles.textarea} rows={3} value={modal.description||''} onChange={e => setModal(m => ({...m!, description:e.target.value}))} />
          </Field>
          <Field label="Stack (pisahkan koma)"><Input value={modal.stack||''} onChange={v => setModal(m => ({...m!, stack:v}))} /></Field>
          <div className={styles.row2}>
            <Field label="URL Demo"><Input value={modal.url_demo||''} placeholder="https://..." onChange={v => setModal(m => ({...m!, url_demo:v}))} /></Field>
            <Field label="URL GitHub"><Input value={modal.url_github||''} placeholder="https://github.com/..." onChange={v => setModal(m => ({...m!, url_github:v}))} /></Field>
          </div>
          <Field label="Gambar Thumbnail Project">
            <ImageUpload value={modal.image_url||''} onChange={v => setModal(m => ({...m!, image_url:v}))} />
          </Field>
          <div className={styles.row2}>
            <Field label="Status">
              <select className={styles.select} value={modal.status||'live'} onChange={e => setModal(m => ({...m!, status:e.target.value as Project['status']}))}>
                <option value="live">● Live</option>
                <option value="wip">⬡ WIP</option>
                <option value="oss">◈ Open Source</option>
              </select>
            </Field>
            <Field label="Warna (jika tanpa gambar)">
              <select className={styles.select} value={modal.color||'pt-1'} onChange={e => setModal(m => ({...m!, color:e.target.value as Project['color']}))}>
                <option value="pt-1">Oranye</option>
                <option value="pt-2">Hijau</option>
                <option value="pt-3">Biru</option>
                <option value="pt-4">Kuning</option>
                <option value="pt-5">Pink</option>
                <option value="pt-6">Biru Muda</option>
              </select>
            </Field>
          </div>
          <div className={styles.row2}>
            <Field label="Urutan"><Input type="number" value={String(modal.sort_order||0)} onChange={v => setModal(m => ({...m!, sort_order:Number(v)}))} /></Field>
            <Field label="Tampilkan di CV">
              <label className={styles.toggleLabel}>
                <input type="checkbox" checked={!!modal.active} onChange={e => setModal(m => ({...m!, active:e.target.checked}))} />
                <span className={styles.toggleSlider} />
              </label>
            </Field>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ── IMAGE UPLOAD ─────────────────────────────────────────
function ImageUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result as string)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { alert('Ukuran file maksimal 2MB'); return }
    const b64 = await toBase64(file)
    onChange(b64)
  }

  return (
    <div>
      {value ? (
        <div style={{position:'relative'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" style={{width:'100%',maxHeight:160,objectFit:'cover',borderRadius:8,display:'block'}} />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{position:'absolute',top:8,right:8,background:'rgba(0,0,0,.65)',color:'#fff',border:'none',borderRadius:4,padding:'3px 10px',fontSize:11,cursor:'pointer',fontWeight:600}}>
            ✕ Hapus
          </button>
        </div>
      ) : (
        <label style={{display:'block',border:'2px dashed #e2e4ea',borderRadius:8,padding:'20px',textAlign:'center',cursor:'pointer',background:'#fafafa',transition:'all .2s'}}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#c8521a'; (e.currentTarget as HTMLElement).style.background='#fdf0e8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='#e2e4ea'; (e.currentTarget as HTMLElement).style.background='#fafafa' }}>
          <input type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
          <div style={{fontSize:28,marginBottom:8}}>🖼️</div>
          <div style={{fontSize:13,fontWeight:600,color:'#4a4a6a'}}>Klik untuk upload gambar</div>
          <div style={{fontSize:11,color:'#8888aa',marginTop:4}}>PNG, JPG, WebP · Maks 2MB</div>
        </label>
      )}
      <div style={{fontSize:11,color:'#8888aa',marginTop:6}}>
        Jika tidak diupload, akan pakai warna gradient sebagai thumbnail.
      </div>
    </div>
  )
}

// ── REUSABLE COMPONENTS ───────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  )
}

function Input({ value, onChange, type='text', placeholder='' }: { value:string; onChange:(v:string)=>void; type?:string; placeholder?:string }) {
  return <input className={styles.input} type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
}

function Modal({ title, children, onClose, onSave }: { title:string; children:React.ReactNode; onClose:()=>void; onSave:()=>void }) {
  return (
    <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <button className={styles.btnGhost} onClick={onClose}>Batal</button>
          <button className={styles.btnPrimary} onClick={onSave}>Simpan</button>
        </div>
      </div>
    </div>
  )
}
