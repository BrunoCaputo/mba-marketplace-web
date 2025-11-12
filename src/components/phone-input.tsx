import { InputHTMLAttributes, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type PhonePure = string

const onlyDigits = (s: string) => s?.replace(/\D/g, '')

/**
 * Formata o telefone para exibição:
 * - DDD sempre com 2 dígitos: (##)
 * - Número móvel (9 dígitos após DDD) -> (##) 9xxxx-xxxx
 * - Número fixo (8 dígitos após DDD)   -> (##) xxxx-xxxx
 * - Se houver menos dígitos, formata parcialmente
 */
export function formatPhone(raw: string) {
  const d = onlyDigits(raw)
  if (!d) return ''

  const ddd = d.slice(0, 2)
  const rest = d.slice(2) // pode ter 0..9 dígitos

  if (!rest) return `(${ddd}) `

  // limite prático: DDD (2) + número (até 9) => max 11 dígitos
  const r = rest.slice(0, 9)

  if (r.length <= 4) {
    return `(${ddd}) ${r}`
  }

  // parte antes do traço = tudo menos os 4 últimos dígitos
  const before = r.slice(0, r.length - 4)
  const after = r.slice(-4)

  return `(${ddd}) ${before}-${after}`
}

/**
 * Props:
 * - value: string pura (apenas dígitos)
 * - onChange: recebe string pura
 */
interface PhoneInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: PhonePure
  onChange: (pure: PhonePure) => void
}

export function PhoneInput({
  value,
  onChange,
  className,
  ...props
}: PhoneInputProps) {
  const [display, setDisplay] = useState(() => formatPhone(value))

  // sincroniza display quando value externo muda
  useEffect(() => {
    setDisplay(formatPhone(value))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // pega somente dígitos
    const raw = onlyDigits(e.target.value)

    // limita a 11 dígitos (2 DDD + 9 número móvel). Ajuste se quiser outro limite.
    const limited = raw.slice(0, 11)

    // atualiza estado local (mascara) e devolve a string pura ao pai
    setDisplay(formatPhone(limited))
    onChange(limited)
  }

  return (
    <input
      value={display}
      onChange={handleChange}
      inputMode="numeric"
      pattern="\d*"
      className={cn(
        'flex w-full border-none bg-transparent text-body-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}
