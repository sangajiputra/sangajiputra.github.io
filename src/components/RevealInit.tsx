'use client'
// Minimal client component — hanya init scroll reveal
// Tidak ada state, tidak ada data fetch, tidak ada loading
import { useEffect } from 'react'

export default function RevealInit() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
