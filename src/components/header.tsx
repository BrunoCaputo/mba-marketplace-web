import { ChartArea, Package, Plus, User } from 'lucide-react'

import { Seller } from '@/@types/seller'
import LogoIcon from '@/assets/LogoIcon.svg'
import { NavLink } from '@/components/nav-link'

import { Button } from './ui/button'

interface HeaderProps {
  seller: Seller | null
}

export function Header({ seller }: HeaderProps) {
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
        >
          <Plus className="h-5 w-5" />
          Novo produto
        </Button>

        <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-shape">
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
      </section>
    </header>
  )
}
