import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isMoney?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      isMoney = false,
      onChange,
      onBlur,
      value: propValue,
      defaultValue,
      ...props
    },
    forwardedRef,
  ) => {
    const internalRef = React.useRef<HTMLInputElement | null>(null)

    // forward ref (suporta ref como função ou MutableRefObject)
    React.useEffect(() => {
      if (!forwardedRef) return
      if (typeof forwardedRef === 'function') {
        forwardedRef(internalRef.current)
      } else {
        try {
          ;(
            forwardedRef as React.MutableRefObject<HTMLInputElement | null>
          ).current = internalRef.current
        } catch {
          // ignore
        }
      }
    }, [forwardedRef])

    const [display, setDisplay] = React.useState('')

    // util: formata número (ex: 1234.56) para "1.234,56"
    function formatNumber(numberValue: number) {
      return numberValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }

    // util: transforma "onlyDigits" (centavos) -> número em reais (ex: "123456" -> 1234.56)
    function centsStringToNumber(centsStr: string) {
      if (!centsStr) return 0
      return Number(centsStr) / 100
    }

    // util: tenta interpretar um valor recebido (propValue/defaultValue/dom) que pode vir:
    // - como string de centavos (ex: "123456")
    // - como string com decimal (ex: "1234.56" ou "1234,56")
    // - como number (1234.56)
    // Retorna a string de exibição formatada ("1.234,56").
    function formatIncomingValueToDisplay(
      v: string | number | readonly string[],
    ) {
      if (v === null || v === '') return ''
      // se for number
      if (typeof v === 'number' && !Number.isNaN(v)) {
        return formatNumber(v)
      }
      const s = String(v)

      // se só dígitos -> considerar centavos
      if (/^\d+$/.test(s)) {
        const n = centsStringToNumber(s)
        return formatNumber(n)
      }

      // se contém vírgula ou ponto -> tentar converter para float
      // normaliza vírgula para ponto
      const normalized = s.replace(/\./g, '').replace(',', '.')
      const parsed = Number(normalized)
      if (!Number.isNaN(parsed)) {
        return formatNumber(parsed)
      }

      // fallback: retornar o próprio s
      return s
    }

    // Inicializa o display a partir de propValue | defaultValue | value já presente no DOM (caso register tenha setado)
    React.useEffect(() => {
      if (!isMoney) {
        // se o componente não for money, preferimos propValue || defaultValue
        if (propValue != null) {
          setDisplay(String(propValue))
        } else if (defaultValue != null) {
          setDisplay(String(defaultValue))
        } else if (internalRef.current?.value) {
          setDisplay(internalRef.current.value)
        }
        return
      }

      // isMoney === true
      // prioridade: propValue > defaultValue > input DOM value
      if (propValue != null && propValue !== '') {
        setDisplay(formatIncomingValueToDisplay(propValue))
        return
      }
      if (defaultValue != null && defaultValue !== '') {
        setDisplay(formatIncomingValueToDisplay(defaultValue))
        return
      }
      // se register do RHF já colocou um value no DOM via ref (caso comum com defaultValues), usamos ele
      const domVal = internalRef.current?.value
      if (domVal != null && domVal !== '') {
        setDisplay(formatIncomingValueToDisplay(domVal))
        return
      }

      // caso contrário limpa
      setDisplay('')
    }, [isMoney, propValue, defaultValue])

    // handleChange: atualiza display e propaga valor para onChange (como string de centavos)
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value

      if (!isMoney) {
        setDisplay(raw)
        onChange?.(e)
        return
      }

      // remove tudo que não é dígito
      const onlyDigits = raw.replace(/\D/g, '')

      if (!onlyDigits) {
        setDisplay('')
        // propagamos evento para RHF com value vazio (assim defaultValues/validação funcionam)
        const fakeEmpty = { ...e, target: { ...e.target, value: '' } }
        onChange?.(fakeEmpty as React.ChangeEvent<HTMLInputElement>)
        return
      }

      // transforma centavos -> reais
      const numeric = centsStringToNumber(onlyDigits)

      // atualiza a exibição formatada
      const formatted = formatNumber(numeric)
      setDisplay(formatted)

      // propagamos para o register -> **valores em centavos (string)**,
      // porque você inicializou o form com product.priceInCents.toString()
      // então o RHF espera "123456" e não "1234.56"
      const fakeEvent = {
        ...e,
        target: {
          ...e.target,
          value: onlyDigits, // string contendo os centavos (sem formatação)
        },
      }
      onChange?.(fakeEvent as React.ChangeEvent<HTMLInputElement>)
    }

    // handleBlur: propagamos onBlur (útil pro RHF tocar validação)
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      onBlur?.(e)
    }

    return (
      <input
        type={type}
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        inputMode={isMoney ? 'numeric' : undefined}
        className={cn(
          'flex w-full border-none bg-transparent text-body-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={internalRef}
        autoComplete="off"
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
