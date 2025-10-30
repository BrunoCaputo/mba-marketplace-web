import { Category, Product, ProductBody, ProductStatus } from '@/@types/product'
import { api } from '@/lib/axios'
import { createApiPath } from '@/utils/create-api-path'

export async function getMyProducts(
  params: URLSearchParams,
): Promise<Product[]> {
  const response = await api.get(createApiPath('/products/me', params))

  return response.data.products as Product[]
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
  const response = await api.get(`/products/${id}`)

  return response.data.product as Product
}

export async function getAllCategories(): Promise<Category[]> {
  const response = await api.get('/categories')

  return response.data.categories as Category[]
}

export async function editProduct({
  productId,
  product,
}: {
  productId: string
  product: ProductBody
}): Promise<Product> {
  const response = await api.put(`/products/${productId}`, product)

  return response.data.product as Product
}

export async function createProduct(product: ProductBody): Promise<Product> {
  const response = await api.post('/products', product)

  return response.data.product as Product
}
