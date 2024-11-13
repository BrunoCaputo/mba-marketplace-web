import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    return (
      <div className="flex w-full items-center gap-2">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={className}
          ref={ref}
          {...props}
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => setShowPassword((state) => !state)}
        >
          {showPassword ? (
            <EyeOff className="h-6 w-6 text-gray-200" />
          ) : (
            <Eye className="h-6 w-6 text-gray-200" />
          )}
        </Button>
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
