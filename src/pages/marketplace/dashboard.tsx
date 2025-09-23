import { useQuery } from '@tanstack/react-query'
import { Store, Tag, Users } from 'lucide-react'

import { getAvailableProductsMetrics } from '@/api/metrics/available-products'
import { getSoldProductsMetrics } from '@/api/metrics/sold-products'
import { getViewsMetrics } from '@/api/metrics/views'
import { getViewsPerDayMetrics } from '@/api/metrics/views-per-day'
import { Card } from '@/components/card'
import { DashboardCardItem } from '@/components/dashboard/card-item'
import { DashboardChartItem } from '@/components/dashboard/chart-item'
import { TitleLabel } from '@/components/title-label'

export function DashboardPage() {
  const { data: soldProducts } = useQuery({
    queryKey: ['soldProducts'],
    queryFn: getSoldProductsMetrics,
  })

  const { data: availableProducts } = useQuery({
    queryKey: ['availableProducts'],
    queryFn: getAvailableProductsMetrics,
  })

  const { data: views } = useQuery({
    queryKey: ['views'],
    queryFn: getViewsMetrics,
  })

  const { data: viewsPerDay } = useQuery({
    queryKey: ['viewsPerDay'],
    queryFn: getViewsPerDayMetrics,
  })

  function getDates(): [Date, Date] {
    const lastDate: Date = new Date(viewsPerDay?.at(-1)?.date ?? new Date())
    const firstDate: Date = new Date(viewsPerDay?.[0]?.date ?? new Date())
    return [firstDate, lastDate]
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-10">
      <TitleLabel
        title="Últimos 30 dias"
        subtitle="Confira as estatísticas da sua loja no último mês"
      />

      <section className="grid grid-cols-4 grid-rows-3 gap-x-6 gap-y-[15px]">
        <Card className="col-span-1 row-span-1">
          <DashboardCardItem
            icon={<Tag className="h-10 w-10 text-blue-dark" />}
            quantity={soldProducts?.amount.toString() ?? '--'}
            name="Produtos vendidos"
          />
        </Card>
        <Card className="col-span-3 row-span-3">
          <DashboardChartItem
            title="Visitantes"
            dates={getDates()}
            chartData={viewsPerDay ?? []}
          />
        </Card>
        <Card className="col-span-1 row-span-1">
          <DashboardCardItem
            icon={<Store className="h-10 w-10 text-blue-dark" />}
            quantity={availableProducts?.amount.toString() ?? '--'}
            name="Produtos anunciados"
          />
        </Card>
        <Card className="col-span-1 row-span-1">
          <DashboardCardItem
            icon={<Users className="h-10 w-10 text-blue-dark" />}
            quantity={views?.amount.toString() ?? '--'}
            name="Pessoas visitantes"
          />
        </Card>
      </section>
    </div>
  )
}
