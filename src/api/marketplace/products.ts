import { Category, Product, ProductStatus } from '@/@types/product'
import { api } from '@/lib/axios'
import { createApiPath } from '@/utils/create-api-path'

export async function getMyProducts(
  params: URLSearchParams,
): Promise<Product[]> {
  const products = await api.get(createApiPath('/products/me', params))

  return products.data.products as Product[]
}

export async function updateProductStatus({
  id,
  status,
}: {
  id: string
  status: ProductStatus
}): Promise<Product> {
  const response = await api.patch(`/products/${id}/${status}`)

  return response.data.product as Product
}

export async function getProductById(id: string): Promise<Product> {
  const product = await api.get(`/products/${id}`)

  return product.data.product as Product
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = await api.get('/categories')

  return categories.data.categories as Category[]
}
