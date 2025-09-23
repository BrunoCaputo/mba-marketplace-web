import { Users } from 'lucide-react'

interface ChartTooltipProps {
  active?: boolean
  payload?: { value: number }[]
  label?: string
  formatDateFunction: (date: Date) => string
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatDateFunction,
}: ChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-start justify-start gap-2 rounded-md bg-white p-3 shadow-chart">
        <p className="text-label-sm uppercase text-gray-400">
          {formatDateFunction(new Date(label ?? new Date()))}
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
