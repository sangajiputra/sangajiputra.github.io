'use client'
import { useEffect } from 'react'

export default function RevealInit() {
  useEffect(() => {
    const run = () => {
      const io = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
        }),
        { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
      )
      document.querySelectorAll('.reveal').forEach(el => io.observe(el))
      return io
    }
    // Run once immediately
    const io = run()
    // Re-run after stream chunks arrive (MutationObserver)
    const mo = new MutationObserver(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el))
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
  return null
}
