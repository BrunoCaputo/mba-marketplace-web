import { LucideProps } from 'lucide-react'
import { cloneElement, PropsWithChildren, ReactElement } from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { ErrorText } from './error-text'
import { Label } from './ui/label'

interface FormFieldProps {
  labelText?: string
  labelFor: string
  error?: FieldError
  prefixIcon?: ReactElement
}

export function FormField({
  labelText,
  labelFor,
  error,
  prefixIcon,
  children,
}: PropsWithChildren<FormFieldProps>) {
  return (
    <div className="group w-full focus-within:text-orange-base focus-within:caret-orange-base">
      {labelText && (
        <Label
          htmlFor={labelFor}
          className="mb-1 block text-xs font-medium text-gray-400 transition-colors group-focus-within:text-orange-base"
        >
          {labelText}
        </Label>
      )}

      <div className="group flex h-12 w-full items-center gap-2 border-b border-gray-100 group-focus-within:border-orange-base group-focus-within:text-orange-base">
        {prefixIcon &&
          cloneElement<LucideProps>(prefixIcon, {
            className: cn(
              'h-6 w-6 transition-colors',
              error
                ? 'text-danger'
                : 'text-gray-200 group-focus-within:text-orange-base group-has-[input:not(:placeholder-shown)]:text-orange-base',
            ),
          })}
        <div className="flex-1 text-gray-400">{children}</div>
      </div>

      {error && <ErrorText>{error.message}</ErrorText>}
    </div>
  )
}
