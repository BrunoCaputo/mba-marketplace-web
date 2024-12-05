import { ViewsPerDay } from '@/@types/metrics'
import { api } from '@/lib/axios'

export async function getViewsPerDayMetrics(): Promise<ViewsPerDay[]> {
  return (await api.get('/sellers/metrics/views/days')).data
    .viewsPerDay as ViewsPerDay[]
}
