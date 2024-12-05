import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Users } from 'lucide-react'

interface ChartTooltipProps {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="shadow-chart flex flex-col items-start justify-start gap-2 rounded-md bg-white p-3">
        <p className="text-label-sm uppercase text-gray-400">
          {format(new Date(label ?? new Date()), "dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-300" />
          <p
            className="text-body-xs text-gray-300"
            style={{ fontSize: '12px', color: '#6B7280' }}
          >
            {payload[0].value} visitantes
          </p>
        </div>
      </div>
    )
  }

  return null
}
