import { MetricsAmount } from '@/@types/metrics'
import { api } from '@/lib/axios'

export async function getAvailableProductsMetrics(): Promise<MetricsAmount> {
  return (await api.get('/sellers/metrics/products/available'))
    .data as MetricsAmount
}
