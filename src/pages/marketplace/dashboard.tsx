import { Store, Tag, Users } from 'lucide-react'

import { Card } from '@/components/card'
import { DashboardCardItem } from '@/components/dashboard/card-item'
import { DashboardChartItem } from '@/components/dashboard/chart-item'
import { TitleLabel } from '@/components/title-label'

export function DashboardPage() {
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
            quantity="24"
            name="Produtos vendidos"
          />
        </Card>
        <Card className="col-span-3 row-span-3">
          <DashboardChartItem
            title="Visitantes"
            dates={[new Date(), new Date()]}
            chartData={[]}
          />
        </Card>
        <Card className="col-span-1 row-span-1">
          <DashboardCardItem
            icon={<Store className="h-10 w-10 text-blue-dark" />}
            quantity="56"
            name="Produtos anunciados"
          />
        </Card>
        <Card className="col-span-1 row-span-1">
          <DashboardCardItem
            icon={<Users className="h-10 w-10 text-gray-300" />}
            quantity="1.238"
            name="Pessoas visitantes"
          />
        </Card>
      </section>
    </div>
  )
}
