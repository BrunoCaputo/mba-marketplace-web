import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

interface DashboardChartItemProps {
  title: string
  dates: [Date, Date]
  chartData: { day: string; amount: number }[]
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

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} dy={16} />
          <YAxis axisLine={false} tickLine={false} width={80} />
          <Line
            type="linear"
            dataKey="amount"
            stroke="#0095E5"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
