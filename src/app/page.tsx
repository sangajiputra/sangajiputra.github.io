import { getAllData } from '@/lib/db'
import type { CVData } from '@/types'
import CVClient from '@/components/CVClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const data: CVData = await getAllData() as CVData
  return <CVClient data={data} />
}
