import { ReactNode } from 'react'

interface DashboardCardItemProps {
  icon: ReactNode
  quantity: string
  name: string
}

export function DashboardCardItem({
  icon,
  quantity,
  name,
}: DashboardCardItemProps) {
  return (
    <div className="flex items-center justify-start gap-4 py-3 pl-3 pr-7">
      <div className="flex h-[86px] w-20 min-w-20 items-center justify-center rounded-xl bg-blue-light">
        {icon}
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <h2 className="font-ff-dm-sans text-title-lg text-gray-400">
          {quantity}
        </h2>
        <p className="whitespace-normal text-body-xs text-gray-300">{name}</p>
      </div>
    </div>
  )
}
