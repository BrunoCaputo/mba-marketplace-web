import { LucideProps } from 'lucide-react'
import { cloneElement, PropsWithChildren, ReactElement } from 'react'
import { FieldError } from 'react-hook-form'

import { ErrorText } from './error-text'
import { Label } from './ui/label'

interface FormFieldProps {
  labelText: string
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
    <div className="focus-within:text-orange-base focus-within:caret-orange-base">
      <Label htmlFor={labelFor}>{labelText}</Label>
      <div className="flex h-12 w-full items-center gap-2 border-b-[1px] border-gray-100 py-[14px] text-gray-400">
        {prefixIcon &&
          cloneElement<LucideProps>(prefixIcon, {
            className: `h-6 w-6 ${error ? 'text-danger' : 'text-gray-200'}`,
          })}
        {children}
      </div>
      {error && <ErrorText>{error.message}</ErrorText>}
    </div>
  )
}
