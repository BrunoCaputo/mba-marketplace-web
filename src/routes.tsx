import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './pages/_layouts/auth'
import { MarketPlaceLayout } from './pages/_layouts/marketplace'
import { SignInPage } from './pages/auth/sign-in'
import { SignUpPage } from './pages/auth/sign-up'
import { DashboardPage } from './pages/marketplace/dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketPlaceLayout />,
    children: [{ path: '/', element: <DashboardPage /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
    ],
  },
])
