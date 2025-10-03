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
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: {
    id: string
    url: string
  }[]
}

export enum ProductStatus {
  available = 'available',
  sold = 'sold',
  cancelled = 'cancelled',
}
