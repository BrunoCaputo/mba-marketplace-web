import { Outlet } from 'react-router-dom'

import BackgroundImage from '@/assets/Background.png'
import Logo from '@/assets/Logo.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen min-w-full grid-cols-3 overflow-hidden bg-surface font-sans">
      <aside className="col-span-2 flex flex-col items-start justify-between gap-12 p-10">
        <img src={Logo} alt="" />

        <img src={BackgroundImage} alt="" className="h-full max-h-[720px]" />
      </aside>

      <aside className="col-span-1 max-h-screen p-6">
        <main className="h-full max-h-full w-full overflow-auto rounded-[32px] bg-white px-20 py-[72px]">
          <Outlet />
        </main>
      </aside>
    </div>
  )
}
