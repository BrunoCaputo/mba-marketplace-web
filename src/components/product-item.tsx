import { Product } from '@/@types/product'

import { StatusTag } from './status-tag'
import { Tag } from './tag'

interface ProductItemProps {
  product: Product
  onClick?: () => void
}

export function ProductItem({ product, onClick }: ProductItemProps) {
  const productImage = product.attachments[0]

  const formattedPrice = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.priceInCents / 100)

  return (
    <div
      className="relative flex h-[252px] w-[324px] cursor-pointer flex-col gap-1 rounded-[1.25rem] border-2 border-transparent bg-white p-1 hover:border-blue-base"
      onClick={onClick}
    >
      <div className="absolute right-3 top-3 flex items-center gap-1">
        <StatusTag status={product.status} />
        <Tag>{product.category.title}</Tag>
      </div>

      <img
        src={productImage.url}
        alt={`${product.title} Image`}
        loading="lazy"
        className="h-36 w-full rounded-2xl object-cover"
      />

      <div className="flex flex-col gap-2 p-3">
        <div className="flex w-full items-center justify-between gap-4">
          <h3 className="overflow-hidden text-ellipsis text-nowrap text-subtitle text-gray-400">
            {product.title}
          </h3>
          <div className="flex items-baseline gap-1 text-gray-500">
            <h3 className="text-label-md">R$</h3>
            <h3 className="font-ff-dm-sans text-[18px]/[120%] font-bold">
              {formattedPrice}
            </h3>
          </div>
        </div>
        <p className="line-clamp-2 text-body-sm text-gray-300">
          {product.description}
        </p>
      </div>
    </div>
  )
}
