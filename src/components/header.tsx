import { useMutation } from '@tanstack/react-query'
import { ChartArea, LogOut, Package, Plus, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Seller } from '@/@types/seller'
import { signOut } from '@/api/auth/sign-out'
import LogoIcon from '@/assets/LogoIcon.svg'
import { NavLink } from '@/components/nav-link'

import { Button } from './ui/button'

interface HeaderProps {
  seller: Seller | null
}

export function Header({ seller }: HeaderProps) {
  const navigate = useNavigate()

  const [showSellerMenu, setShowSellerMenu] = useState<boolean>(false)

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
  })

  function handleNewProduct() {
    navigate('/products/new')
  }

  async function handleLogout() {
    await signOutFn()
    navigate('/sign-in')
  }

  return (
    <header className="mx-auto flex h-20 w-full max-w-[1366px] items-center justify-between px-5 py-4">
      <img src={LogoIcon} alt="Logo" className="h-10 w-14" />

      <nav className="flex items-center gap-2">
        <NavLink to="/">
          <ChartArea className="h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink to="/products">
          <Package className="h-5 w-5" />
          Produtos
        </NavLink>
      </nav>

      <section className="flex h-12 items-center gap-4">
        <Button
          className="flex items-center gap-2 border-none border-transparent bg-orange-base text-action-sm text-white hover:bg-orange-dark"
          size="lg"
          variant="default"
          onClick={handleNewProduct}
        >
          <Plus className="h-5 w-5" />
          Novo produto
        </Button>

        <div className="relative">
          <div
            className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-shape"
            onClick={() => setShowSellerMenu((prev) => !prev)}
          >
            {seller?.avatar?.id ? (
              <img
                src={seller?.avatar?.url}
                alt=""
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-gray-200" />
            )}
          </div>

          {showSellerMenu && (
            <div className="absolute right-0 top-0 flex w-[168px] translate-y-2/4 flex-col gap-5 rounded-xl bg-white p-4">
              <div className="flex h-[34px] w-full items-center justify-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-shape">
                  {seller?.avatar?.id ? (
                    <img
                      src={seller?.avatar?.url}
                      alt=""
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-200" />
                  )}
                </div>
                <p className="line-clamp-2 text-body-sm text-gray-300">
                  {seller?.name}
                </p>
              </div>

              <div className="h-[1px] w-full bg-shape" />

              {/* LOGOUT */}
              <div
                className="flex cursor-pointer items-center justify-between p-[2px] text-orange-base"
                onClick={handleLogout}
              >
                <p className="text-action-sm">Sair</p>
                <LogOut className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>
      </section>
    </header>
  )
}
