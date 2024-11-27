import { Seller } from '@/@types/seller'
import { api } from '@/lib/axios'

export async function getMyProfileData(): Promise<Seller> {
  return (await api.get('/sellers/me')).data.seller as Seller
}
