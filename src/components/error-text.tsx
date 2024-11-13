import { CircleAlert } from 'lucide-react'
import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface ErrorTextProps {
  className?: string
}

export function ErrorText({
  children,
  className,
}: PropsWithChildren<ErrorTextProps>) {
  return (
    <div
      className={cn(
        'flex h-7 items-center justify-start gap-1 py-[6px] text-danger',
        className,
      )}
    >
      <CircleAlert className="h-4 w-4" />
      <p className="text-body-xs">{children}</p>
    </div>
  )
}
