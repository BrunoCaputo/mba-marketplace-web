import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { ProductStatus } from '@/@types/product'
import { getMyProducts } from '@/api/marketplace/products'
import { Filter, FilterFormType } from '@/components/filter'
import { TitleLabel } from '@/components/title-label'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: products } = useQuery({
    queryKey: ['myProducts'],
    queryFn: getMyProducts,
  })

  function handleUpdateFilterData(data: FilterFormType) {
    const params = new URLSearchParams()

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      }
    })

    setSearchParams(params)
  }

  console.log(products)

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-10">
      <TitleLabel
        title="Seus produtos"
        subtitle="Acesse gerencie a sua lista de produtos à venda"
      />

      <section className="grid w-full grid-cols-3">
        <Filter
          search={searchParams.get('search') ?? undefined}
          status={
            searchParams.get('status') !== null
              ? ProductStatus[
                  searchParams.get('status')! as keyof typeof ProductStatus
                ]
              : undefined
          }
          onUpdateFilterData={handleUpdateFilterData}
        />
        <div />
      </section>
    </div>
  )
}
