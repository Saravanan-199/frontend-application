import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import './index.css'
import { routes } from './routes'
import { CartProvider } from './context/CartContext'

function AppRouter() {
  const element = useRoutes(routes)
  return element
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)
