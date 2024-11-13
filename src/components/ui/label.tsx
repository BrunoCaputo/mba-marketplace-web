import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const classNames: string =
  'text-label-md text-gray-300 uppercase peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
const labelVariants = cva(classNames)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className, 'join')}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
