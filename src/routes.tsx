import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout } from './pages/_layouts/auth'
import { MarketPlaceLayout } from './pages/_layouts/marketplace'
import { SignInPage } from './pages/auth/sign-in'
import { SignUpPage } from './pages/auth/sign-up'
import { DashboardPage } from './pages/marketplace/dashboard'
import { EditProductPage } from './pages/marketplace/edit-product'
import { NewProductPage } from './pages/marketplace/new-product'
import { ProductsPage } from './pages/marketplace/products'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketPlaceLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <EditProductPage /> },
      { path: '/products/new', element: <NewProductPage /> },
    ],
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
