import { Link, LinkProps, useLocation } from 'react-router-dom'

interface NavLinkProps extends LinkProps {}

export function NavLink({ to, ...props }: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      to={to}
      data-active={pathname === to}
      className="flex h-10 items-center gap-2 rounded-[10px] px-4 text-body-sm text-gray-300 hover:text-orange-base data-[active=true]:bg-shape data-[active=true]:text-orange-base"
      {...props}
    />
  )
}
