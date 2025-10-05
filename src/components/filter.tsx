import { zodResolver } from '@hookform/resolvers/zod'
import { Search, Tag } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ProductStatus } from '@/@types/product'
import { SelectOption } from '@/@types/ui'

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
}

export function Filter({ search, status, onUpdateFilterData }: FilterProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FilterFormType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search,
      status,
    },
  })

  async function handleFilter(data: FilterFormType) {
    onUpdateFilterData?.(data)
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-[1.25rem] bg-white p-6">
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
                  value={field.value ?? ''}
                  onValueChange={(value) => field.onChange(value)}
                  options={statusOptions}
                  onClearSelection={() => {
                    field.onChange('')
                    setTimeout(() => {
                      field.onChange(undefined)
                    }, 0)
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
