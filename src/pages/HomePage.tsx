import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function HomePage() {
  const featured = products.slice(0, 4)

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>Shop the latest products</h1>
          <p>
            Modern, responsive e‑commerce experience built with React. Browse
            products, manage your cart, and complete a simulated checkout.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn primary">
              Browse products
            </Link>
            <Link to="/cart" className="btn ghost">
              View cart
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true" />
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured products</h2>
          <Link to="/products" className="link-inline">
            View all
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

