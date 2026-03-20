import { Suspense } from 'react'
import { getAllData } from '@/lib/db'
import type { CVData } from '@/types'
import { headers } from 'next/headers'
import CVPage from '@/components/CVPage'
import CVSkeleton from '@/components/CVSkeleton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function CVContent() {
  headers()
  const data = await getAllData() as CVData
  return <CVPage data={data} />
}

export default function HomePage() {
  return (
    <Suspense fallback={<CVSkeleton />}>
      <CVContent />
    </Suspense>
  )
}
