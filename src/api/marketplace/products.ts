import { Product } from '@/@types/product'
import { api } from '@/lib/axios'
import { createApiPath } from '@/utils/create-api-path'

export async function getMyProducts(
  params: URLSearchParams,
): Promise<Product[]> {
  const products = await api.get(createApiPath('/products/me', params))

  return products.data.products as Product[]
}
