import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Product } from '@/@types/product'
import { getAllCategories } from '@/api/marketplace/products'

import { FileInput } from './file-input'
import { FormField } from './form-field'
import { MoneyInput } from './money-input'
import { Select } from './select'
import { StatusTag } from './status-tag'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface ProductFormProps {
  product?: Product
}

const productSchema = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.string(),
})

type ProductFormType = z.infer<typeof productSchema>

export function ProductForm({ product }: ProductFormProps) {
  const [, setProductImage] = useState<File | null>(null)
  const navigate = useNavigate()

  const initialProductImage = useRef<string>()

  const isEdit = product !== undefined

  if (isEdit) {
    const [productAttachment] = product.attachments
    initialProductImage.current = productAttachment.url
  }

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    values: isEdit
      ? {
          title: product.title,
          price: product.priceInCents.toString(),
          description: product.description,
          category: product.category.id,
        }
      : undefined,
  })

  function formatPrice(price: string): number {
    return Number(price.replace(/\D/g, ''))
  }

  function handleSaveProduct(data: ProductFormType) {
    console.log(data)
    console.log(formatPrice(data.price))
  }

  return (
    <div className="grid w-full grid-cols-[415px_auto] items-start gap-x-6">
      {/* Image */}
      <FileInput
        className="h-[340px] w-[415px] rounded-[20px]"
        initialImage={initialProductImage.current}
        onSelect={setProductImage}
        imageClassName="rounded-[20px]"
      />
      {/* Form */}
      <section className="flex w-full flex-col gap-6 rounded-[20px] bg-white p-6">
        {/* Title */}
        <div className="flex h-[22px] items-center justify-between gap-2">
          <h3 className="w-full text-start text-title-sm text-gray-300">
            Dados do produto
          </h3>
          {isEdit && <StatusTag status={product.status} />}
        </div>

        {/* Fields */}
        <form
          onSubmit={handleSubmit(handleSaveProduct)}
          className="flex w-full flex-col gap-5"
          noValidate
        >
          <div className="flex items-center gap-5">
            <FormField labelFor="title" labelText="Título" error={errors.title}>
              <Input
                id="title"
                placeholder="Título"
                type="text"
                {...register('title')}
              />
            </FormField>

            <FormField
              labelFor="price"
              labelText="Nome do produto"
              error={errors.price}
              prefixIcon={<DollarSign />}
            >
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <MoneyInput
                    id="price"
                    placeholder="0,00"
                    type="text"
                    {...field}
                  />
                )}
              />
            </FormField>
          </div>

          <FormField
            labelFor="description"
            labelText="Descrição"
            error={errors.description}
          >
            <Textarea
              id="description"
              placeholder="Escreva detalhes sobre o produto, tamanho, características"
              {...register('description')}
            />
          </FormField>

          <FormField
            labelFor="category"
            labelText="Categoria"
            error={errors.category}
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  options={(categories ?? [])?.map((category) => ({
                    label: category.title,
                    value: category.id,
                  }))}
                  onClearSelection={() => {
                    field.onChange(undefined)
                  }}
                  placeholder="Selecione"
                  className="w-full"
                />
              )}
            />
          </FormField>

          <div className="mt-5 flex h-12 w-full items-center gap-3">
            <Button
              variant="outline"
              type="button"
              className="flex w-full items-center justify-center border-orange-base text-action-md text-orange-base hover:border-orange-dark hover:text-orange-dark"
              disabled={isSubmitting}
              onClick={() => navigate('/products')}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              type="submit"
              className="flex w-full items-center justify-center border-none border-transparent bg-orange-base text-action-md text-white hover:bg-orange-dark"
              disabled={isSubmitting}
            >
              {isEdit ? 'Salvar e atualizar' : 'Salvar e publicar'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
