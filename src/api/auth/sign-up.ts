import { Seller } from '@/@types/seller'
import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  email: string
  password: string
  avatarId: string | null
  phone: string
  passwordConfirmation: string
}

interface SignUpResponse {
  seller: Seller
}

export async function signUp({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: SignUpBody): Promise<SignUpResponse> {
  return (
    await api.post('/sellers', {
      name,
      phone,
      email,
      avatarId,
      password,
      passwordConfirmation,
    })
  ).data as SignUpResponse
}
