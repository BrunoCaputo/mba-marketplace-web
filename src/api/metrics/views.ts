import { MetricsAmount } from '@/@types/metrics'
import { api } from '@/lib/axios'

export async function getViewsMetrics(): Promise<MetricsAmount> {
  return (await api.get('/sellers/metrics/views')).data as MetricsAmount
}
