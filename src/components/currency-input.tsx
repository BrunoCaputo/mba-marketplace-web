import {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { cn } from '@/lib/utils'

export interface CurrencyInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue'
  > {
  /**
   * Controlled value (em **cents**). Ex: 123456 => R$ 1.234,56
   * Também aceita string contendo apenas dígitos (ex: "123456").
   * Se `value` for fornecido o componente se comporta como controlado.
   */
  value?: number | string | null

  /**
   * Valor inicial (uncontrolled) em cents (mesmo formato de `value`).
   */
  defaultValue?: number | string | null

  /**
   * Chamado quando o valor muda. Recebe o valor em **cents** como number, ou `null` se vazio.
   */
  onValueChange?: (cents: number | null) => void

  /**
   * Classes tailwind etc.
   */
  className?: string
}

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

/** formata string de dígitos (cents) para exibição BRL-like: 123456 -> "1.234,56" */
function formatBRLCents(digits: string) {
  if (!digits) return ''
  if (digits === '0') return ''
  const normalized = digits.padStart(3, '0') // garante pelo menos 3 caracteres para separar centavos
  const cents = normalized.slice(-2)
  let integer = normalized.slice(0, -2)
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${integer},${cents}`
}

/** converte number|string|null para string somente dígitos representando cents */
function parseCentsToDigits(value: number | string | null | undefined) {
  if (value == null) return ''
  if (typeof value === 'number') return String(Math.abs(Math.trunc(value)))
  return digitsOnly(String(value))
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      className,
      placeholder,
      disabled,
      name,
      ...props
    },
    ref,
  ) => {
    const [display, setDisplay] = useState<string>(() => {
      const initialDigits = parseCentsToDigits(defaultValue ?? value ?? null)
      return initialDigits ? formatBRLCents(initialDigits) : ''
    })

    // Sync quando usado como controlled (value prop)
    useEffect(() => {
      if (value !== undefined) {
        const digits = parseCentsToDigits(value ?? null)
        setDisplay(digits ? formatBRLCents(digits) : '')
      }
    }, [value])

    const handleRawDigitsChange = useCallback((raw: string) => {
      const digits = digitsOnly(raw)
      // remove zeros à esquerda (mantém '' se ficar vazio)
      const cleaned = digits.replace(/^0+(?=\d)/, '')
      setDisplay(cleaned ? formatBRLCents(cleaned) : '')
      return cleaned || ''
    }, [])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // e.target.value pode conter pontos/virgulas se o usuário colar — extraímos apenas os dígitos
      const digits = handleRawDigitsChange(e.target.value)
      if (typeof onValueChange === 'function') {
        onValueChange(digits ? Number(digits) : null)
      }
    }

    return (
      <input
        ref={ref}
        name={name}
        inputMode="numeric"
        pattern="[0-9]*"
        className={cn(
          'flex w-full border-none bg-transparent text-body-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        placeholder={placeholder}
        disabled={disabled}
        value={display}
        onChange={onInputChange}
        {...props}
      />
    )
  },
)

CurrencyInput.displayName = 'CurrencyInput'

export default CurrencyInput
