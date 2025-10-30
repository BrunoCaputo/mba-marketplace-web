import { ProductForm } from '@/components/product-form'
import { TitleLabel } from '@/components/title-label'

export function NewProductPage() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-10">
      <TitleLabel
        title="Novo produto"
        subtitle="Cadastre um produto para venda no marketplace"
      />

      <ProductForm />
    </div>
  )
}
