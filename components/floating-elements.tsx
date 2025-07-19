"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white dark:bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Floating planets */}
      <div
        className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce opacity-20"
        style={{ animationDuration: "6s" }}
      />
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-30" />
      <div
        className="absolute top-1/2 left-10 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-25"
        style={{ animationDuration: "4s" }}
      />
    </div>
  )
}
