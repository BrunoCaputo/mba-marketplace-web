import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex w-full border-none bg-transparent text-body-md placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'h-[6.5rem] max-h-[6.5rem] resize-none overflow-y-auto px-[0.125rem] py-[0.875rem]',
        className,
      )}
      rows={4}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
