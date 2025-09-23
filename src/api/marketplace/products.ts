import { Product } from '@/@types/product'
import { api } from '@/lib/axios'

export async function getMyProducts(): Promise<Product[]> {
  const products = await api.get('/products/me')

  return products.data.products as Product[]
}
