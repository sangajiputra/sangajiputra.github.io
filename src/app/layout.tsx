import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sang Aji Putra Choirul — Fullstack Developer',
  description: 'Fullstack Developer dengan 5+ tahun pengalaman membangun produk digital.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
