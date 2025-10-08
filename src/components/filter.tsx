import { zodResolver } from '@hookform/resolvers/zod'
import { Search, Tag } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ProductStatus } from '@/@types/product'
import { SelectOption } from '@/@types/ui'
import { cn } from '@/lib/utils'

import { FormField } from './form-field'
import { Select } from './select'
import { Button } from './ui/button'
import { Input } from './ui/input'

const filterSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['available', 'sold', 'cancelled']).optional(),
})

export type FilterFormType = z.infer<typeof filterSchema>

const statusOptions: SelectOption[] = [
  { label: 'Anunciado', value: ProductStatus.available },
  { label: 'Vendido', value: ProductStatus.sold },
  { label: 'Cancelado', value: ProductStatus.cancelled },
]

interface FilterProps {
  search?: string
  status?: ProductStatus
  onUpdateFilterData?: (data: FilterFormType) => void
  className?: string
}

export function Filter({
  search,
  status,
  onUpdateFilterData,
  className,
}: FilterProps) {
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FilterFormType>({
    resolver: zodResolver(filterSchema),
  })

  useEffect(() => {
    setValue('search', search ?? '')
    setValue('status', status ?? undefined)
  }, [])

  async function handleFilter(data: FilterFormType) {
    onUpdateFilterData?.(data)
  }

  return (
    <div
      className={cn(
        'flex max-h-[306px] w-full flex-col gap-6 rounded-[1.25rem] bg-white p-6',
        className,
      )}
    >
      <h3 className="text-left text-title-sm text-gray-300">Filtrar</h3>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex w-full flex-col gap-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <FormField
            labelFor="search"
            error={errors.search}
            prefixIcon={<Search />}
          >
            <Input
              id="search"
              placeholder="Pesquisar"
              type="text"
              {...register('search')}
            />
          </FormField>

          <FormField
            labelFor="status"
            error={errors.status}
            prefixIcon={<Tag />}
          >
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  options={statusOptions}
                  onClearSelection={() => {
                    field.onChange(undefined)
                    handleFilter({ status: undefined })
                  }}
                  placeholder="Status"
                  className="w-full"
                />
              )}
            />
          </FormField>
        </div>

        <Button
          variant="default"
          size="xl"
          type="submit"
          className="flex items-center justify-center border-none border-transparent bg-orange-base text-white hover:bg-orange-dark"
          disabled={isSubmitting}
        >
          <span className="text-action-md">Aplicar filtro</span>
        </Button>
      </form>
    </div>
  )
}
