import { Link, NavLink, Outlet } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function MainLayout() {
  const { itemCount } = useCart()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container header-content">
          <Link to="/" className="logo">
            ShopSphere
          </Link>
          <nav className="nav-links">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/cart">
              Cart{itemCount > 0 ? ` (${itemCount})` : ''}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="app-footer">
        <div className="container footer-content">
          <p>&copy; {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

