import { api } from '@/lib/axios'

export async function signOut(): Promise<void> {
  return await api.post('/sign-out')
}
