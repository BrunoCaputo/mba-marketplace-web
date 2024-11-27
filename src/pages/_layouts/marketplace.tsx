import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getMyProfileData } from '@/api/marketplace/profile'
import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export function MarketPlaceLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const reqInterceptorId = api.interceptors.request.use(
      (response) => {
        response.headers.setAuthorization(
          `Bearer ${localStorage.getItem('accessToken')}`,
        )

        return response
      },
      (error) => {
        throw error
      },
    )

    const respInterceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status

          if (status === 401) {
            navigate('/sign-in', { replace: true })
            toast.error('Não autorizado! Faça login novamente')
          } else {
            throw error
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(respInterceptorId)
      api.interceptors.request.eject(reqInterceptorId)
    }
  }, [navigate])

  const { data: seller } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMyProfileData(),
  })

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header seller={seller ?? null} />

      <main className="mx-auto h-full max-h-[1030px] overflow-auto py-16">
        <Outlet />
      </main>
    </div>
  )
}
