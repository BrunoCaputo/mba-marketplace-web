import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft, Ban, Check } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { ProductStatus } from '@/@types/product'
import { getProductById, updateProductStatus } from '@/api/marketplace/products'
import { ProductForm } from '@/components/product-form'
import { TextButton } from '@/components/text-button'
import { TitleLabel } from '@/components/title-label'

export function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) {
        return null
      }

      return getProductById(id)
    },
  })

  const { mutateAsync: markAsSold } = useMutation({
    mutationFn: updateProductStatus,
  })

  function handleBackToProducts() {
    navigate('/products')
  }

  async function handleMarkAsSold() {
    await markAsSold({ id: product!.id, status: ProductStatus.sold })
    await refetch()
  }

  if (!product) {
    return null
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-10">
      <div className="grid w-full grid-cols-2">
        <div className="col-span-1 flex flex-col items-start gap-2">
          <TextButton onClick={handleBackToProducts} icon={<ArrowLeft />}>
            Voltar
          </TextButton>
          <TitleLabel
            title="Editar produto"
            subtitle="Gerencie as informações do produto cadastrado"
          />
        </div>
        <div className="col-span-1 flex items-end justify-end gap-4 px-3">
          <TextButton onClick={handleMarkAsSold} icon={<Check />}>
            Marcar como vendido
          </TextButton>
          <TextButton icon={<Ban />}>Desativar anúncio</TextButton>
        </div>
      </div>

      <ProductForm product={product} />
    </div>
  )
}
