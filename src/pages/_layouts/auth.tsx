import { Outlet } from 'react-router-dom'

import BackgroundImage from '@/assets/Background.png'
import Logo from '@/assets/Logo.svg'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen w-full grid-cols-3 overflow-hidden bg-surface font-ff-poppins">
      <aside className="col-span-2 flex h-full max-h-screen flex-col items-start justify-between p-10">
        <img src={Logo} alt="" />

        <img
          src={BackgroundImage}
          alt="Auth Background Image"
          className="h-full max-h-[720px] w-full object-contain"
        />
      </aside>

      <aside className="col-span-1 max-h-screen p-6">
        <main className="h-full max-h-full w-full overflow-auto rounded-[32px] bg-white px-20 pt-[72px]">
          <Outlet />
        </main>
      </aside>
    </div>
  )
}
