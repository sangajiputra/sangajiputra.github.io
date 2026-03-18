import { getAllData } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getAllData()
  return Response.json(data)
}
