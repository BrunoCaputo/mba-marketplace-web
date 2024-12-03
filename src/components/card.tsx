import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
}

export function Card({ children, className }: PropsWithChildren<CardProps>) {
  return (
    <div className={cn('rounded-[20px] bg-white', className)}>{children}</div>
  )
}
