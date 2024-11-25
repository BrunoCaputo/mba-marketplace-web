import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: string
}

export async function signIn({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  return api.post('/sellers/sessions', { email, password })
}
