import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="product-content">
        <h3 className="product-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-rating">
          ⭐ {product.rating.toFixed(1)} ({product.ratingCount})
        </p>
        <p className="product-description">
          {product.description.length > 100
            ? product.description.slice(0, 100) + '...'
            : product.description}
        </p>
        <div className="product-actions">
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
      </div>
    </article>
  )
}

