import { getAllData } from '@/lib/db'
import type { CVData } from '@/types'
import CVClient from '@/components/CVClient'
import { headers } from 'next/headers'

// Force dynamic rendering — TIDAK boleh di-cache oleh Vercel Edge
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  // Trigger dynamic rendering dengan membaca headers
  headers()

  const data = await getAllData() as CVData
  return <CVClient data={data} />
}
