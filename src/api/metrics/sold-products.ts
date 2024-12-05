import { MetricsAmount } from '@/@types/metrics'
import { api } from '@/lib/axios'

export async function getSoldProductsMetrics(): Promise<MetricsAmount> {
  return (await api.get('/sellers/metrics/products/sold')).data as MetricsAmount
}
