import { useQuery } from '@tanstack/react-query'

import { getMyProducts } from '@/api/marketplace/products'
import { Filter } from '@/components/filter'
import { TitleLabel } from '@/components/title-label'

export function ProductsPage() {
  const { data: products } = useQuery({
    queryKey: ['myProducts'],
    queryFn: getMyProducts,
  })

  console.log(products)

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-10">
      <TitleLabel
        title="Seus produtos"
        subtitle="Acesse gerencie a sua lista de produtos à venda"
      />

      <section className="grid w-full grid-cols-3">
        <Filter />
        <div />
      </section>
    </div>
  )
}
