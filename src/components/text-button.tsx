import { PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'

interface TextButtonProps {
  onClick?: () => void
  icon?: ReactNode
  iconPlacement?: 'before' | 'after'
  className?: string
}

export function TextButton({
  children,
  onClick,
  className,
  icon,
  iconPlacement = 'before',
}: PropsWithChildren<TextButtonProps>) {
  return (
    <Button
      variant="link"
      onClick={onClick}
      className={cn(
        'flex h-6 w-min items-center gap-2 p-[2px] text-action-sm text-orange-base hover:text-orange-dark hover:no-underline',
        className,
      )}
    >
      {iconPlacement === 'before' && icon}
      {children}
      {iconPlacement === 'after' && icon}
    </Button>
  )
}
