import { getAllData } from '@/lib/db'
import type { CVData } from '@/types'
import { headers } from 'next/headers'
import CVPage from '@/components/CVPage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  headers() // force dynamic
  const data = await getAllData() as CVData
  return <CVPage data={data} />
}
