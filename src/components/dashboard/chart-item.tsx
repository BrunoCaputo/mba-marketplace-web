import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ViewsPerDay } from '@/@types/metrics'

import { ChartTooltip } from './chart-tooltip'

interface DashboardChartItemProps {
  title: string
  dates: [Date, Date]
  chartData: ViewsPerDay[]
}

export function DashboardChartItem({
  title,
  dates,
  chartData = [],
}: DashboardChartItemProps) {
  const [initialDate, endDate] = dates

  function formatDate(date: Date): string {
    return format(date, "dd 'de' MMMM", { locale: ptBR })
  }

  return (
    <div className="flex h-full w-full flex-col gap-7 px-6 pb-5 pt-6">
      <div className="flex items-center justify-between">
        <h3 className="font-ff-dm-sans text-title-sm text-gray-500">{title}</h3>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-dark" />
          <p className="text-label-sm uppercase text-gray-300">
            {formatDate(initialDate)}
            {' - '}
            {formatDate(endDate)}
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid
            stroke="#E5E5E5"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            dy={10}
            tickFormatter={(date: Date) => {
              const day: string = new Date(date).getDate().toString()
              return day.padStart(2, '0')
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            width={40}
          />

          <Tooltip content={<ChartTooltip />} />

          <Line
            type="monotone"
            dataKey="amount"
            stroke="#5EC5FD"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
