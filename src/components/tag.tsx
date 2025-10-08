import { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

interface TagProps {
  className?: string
}

export function Tag({ className, children }: PropsWithChildren<TagProps>) {
  return (
    <div className={cn('w-min rounded-full bg-gray-400 px-2 py-1', className)}>
      <p className="text-label-sm uppercase text-white">{children}</p>
    </div>
  )
}
