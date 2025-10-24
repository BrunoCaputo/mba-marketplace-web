import { format, InputMask, InputMaskProps, Modify } from '@react-input/mask'
import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface MoneyInputProps extends InputMaskProps {}

export function MoneyInput({
  value,
  className,
  onChange,
  ...props
}: MoneyInputProps) {
  const [initialMask, setInitialMask] = useState<string | null>(null)

  useEffect(() => {
    function getMask() {
      const raw = value?.toString() ?? ''

      const digits = raw.replace(/\D/g, '')
      const digitsLen = digits.length

      if (digitsLen === 0) return { mask: '' }

      if (digitsLen === 1) return { mask: '0,0#' }
      if (digitsLen === 2) return { mask: '0,##' }

      const integerLength = digitsLen - 2
      const intPlaceholders = '#'.repeat(integerLength)

      const groups: string[] = []
      for (let i = intPlaceholders.length; i > 0; i -= 3) {
        const start = Math.max(0, i - 3)
        groups.push(intPlaceholders.slice(start, i))
      }
      groups.reverse()
      const integerWithDots = groups.join('.')

      const mask = `${integerWithDots},##`
      return { mask }
    }

    const { mask } = getMask()
    setInitialMask(mask)
  }, []) // mantive como estava, assumindo que quer só a máscara inicial

  const formattedValue = useMemo(() => {
    if (!initialMask) return undefined

    const raw = String(value ?? '')
    try {
      return format(raw, { mask: initialMask, replacement: { '#': /\d/ } })
    } catch {
      return undefined
    }
  }, [initialMask, value]) // opcional: inclua value se quiser recalcular (veja comentário abaixo)

  // Aqui: inicializamos como '' — nunca ficará undefined.
  const [internalValue, setInternalValue] = useState<string>('')
  const initializedRef = useRef(false)

  useEffect(() => {
    // só inicializa se ainda não inicializamos e o campo estiver vazio
    if (
      !initializedRef.current &&
      formattedValue !== undefined &&
      internalValue === ''
    ) {
      setInternalValue(formattedValue)
      initializedRef.current = true
    }
  }, [formattedValue, internalValue])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) onChange(e)
  }

  const modify: Modify = ({ data, inputType, value: curValue }) => {
    console.log('data:', data)
    console.log('inputType:', inputType)
    console.log('value:', curValue)
    let mask = ''

    if (data === '0' && curValue === '') {
      return { mask }
    }

    const isInsert =
      typeof inputType === 'string' && inputType.startsWith('insert')
    const raw = isInsert
      ? String(curValue ?? '') + String(data ?? '')
      : String(curValue ?? '')

    const digits = raw.replace(/\D/g, '')
    const digitsLen = digits.length

    if (digitsLen === 1) {
      return { mask: '0,0#' }
    }

    if (curValue.startsWith('0,0')) {
      mask = '0,##'
      return { mask }
    }

    const integerLength = digitsLen - 2
    const intPlaceholders = '#'.repeat(integerLength)

    const groups: string[] = []
    for (let i = intPlaceholders.length; i > 0; i -= 3) {
      const start = Math.max(0, i - 3)
      groups.push(intPlaceholders.slice(start, i))
    }
    groups.reverse()
    const integerWithDots = groups.join('.')

    mask = `${integerWithDots},##`
    return { mask }
  }

  return (
    <InputMask
      className={cn(
        'flex w-full border-none bg-transparent text-body-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      value={internalValue}
      mask={initialMask ?? ''}
      replacement={{ '#': /\d/ }}
      modify={modify}
      onChange={handleChange}
      {...props}
    />
  )
}
