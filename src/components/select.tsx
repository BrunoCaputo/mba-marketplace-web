import { X } from 'lucide-react'
import { PointerEvent } from 'react'

import { SelectOption } from '@/@types/ui'
import { cn } from '@/lib/utils'

import {
  Select as CnSelect,
  SelectContent,
  SelectItem,
  SelectProps as CnSelectProps,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface SelectProps extends CnSelectProps {
  options: SelectOption[]
  className?: string
  placeholder?: string
  onClearSelection?: () => void
}

export function Select({
  options,
  className,
  placeholder,
  onClearSelection,
  ...props
}: SelectProps) {
  function handleClearSelection(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    onClearSelection?.()
  }

  return (
    <CnSelect {...props}>
      <SelectTrigger
        className={cn(
          'group relative border-none px-0 focus:ring-0 focus:ring-offset-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:outline-0',
          className,
        )}
      >
        <SelectValue placeholder={placeholder} />

        <button
          type="button"
          onPointerDown={handleClearSelection}
          className="absolute right-8 top-1/2 z-[99] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-shape group-data-[placeholder]:hidden"
        >
          <X className="h-4 w-4 text-gray-300" />
        </button>
      </SelectTrigger>
      <SelectContent position="popper">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer text-body-sm data-[state=checked]:text-orange-base"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </CnSelect>
  )
}
