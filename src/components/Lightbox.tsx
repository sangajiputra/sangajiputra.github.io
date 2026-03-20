'use client'
// Lightbox — klik gambar project untuk zoom fullscreen
import { useState, useEffect, useCallback } from 'react'

interface LightboxProps {
  src: string
  alt: string
  children: React.ReactNode
}

export default function Lightbox({ src, alt, children }: LightboxProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ width:'100%', height:'100%', cursor:'zoom-in' }}>
        {children}
      </div>

      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            animation: 'lbFadeIn .2s ease',
          }}
        >
          <style>{`
            @keyframes lbFadeIn { from{opacity:0} to{opacity:1} }
            @keyframes lbScaleIn { from{transform:scale(.92)} to{transform:scale(1)} }
          `}</style>

          {/* Close button */}
          <button
            onClick={close}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,.15)', border: 'none',
              color: '#fff', width: 40, height: 40, borderRadius: '50%',
              fontSize: 20, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', transition: 'background .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.15)')}
          >
            ✕
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw', maxHeight: '88vh',
              objectFit: 'contain', borderRadius: 10,
              boxShadow: '0 30px 80px rgba(0,0,0,.5)',
              animation: 'lbScaleIn .25s ease',
              userSelect: 'none',
            }}
          />

          {/* Caption */}
          <div style={{
            position: 'absolute', bottom: 20, left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,.5)', fontSize: 12,
            letterSpacing: '.05em',
          }}>
            {alt} · Tekan ESC atau klik luar untuk tutup
          </div>
        </div>
      )}
    </>
  )
}
