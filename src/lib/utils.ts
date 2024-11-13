import { type ClassValue, clsx } from 'clsx'
import { twJoin, twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  if (inputs.includes('join')) {
    inputs.pop()
    return twJoin(clsx(inputs))
  }

  return twMerge(clsx(inputs))
}
