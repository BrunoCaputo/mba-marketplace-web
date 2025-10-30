export interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: ProductStatus
  owner: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
  category: Category
  attachments: {
    id: string
    url: string
  }[]
}

export interface ProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export enum ProductStatus {
  available = 'available',
  sold = 'sold',
  cancelled = 'cancelled',
}

export interface Category {
  id: string
  title: string
  slug: string
}
