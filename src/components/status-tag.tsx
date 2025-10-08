import { ProductStatus } from '@/@types/product'
import { cn } from '@/lib/utils'

import { Tag } from './tag'

interface StatusTagProps {
  status: ProductStatus
  className?: string
}

export function StatusTag({ status, className }: StatusTagProps) {
  let statusLabel = ''
  let statusColor = ''

  switch (status) {
    case ProductStatus.available:
      statusLabel = 'Anunciado'
      statusColor = 'bg-blue-dark'
      break
    case ProductStatus.sold:
      statusLabel = 'Vendido'
      statusColor = 'bg-success'
      break
    case ProductStatus.cancelled:
      statusLabel = 'Desativado'
      statusColor = 'bg-gray-300'
      break
  }

  return <Tag className={cn(statusColor, className)}>{statusLabel}</Tag>
}
