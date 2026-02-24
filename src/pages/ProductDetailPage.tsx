import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-detail-content">
          <h1>{product.name}</h1>
          <p className="product-price-large">${product.price.toFixed(2)}</p>
          <p className="product-rating">
            ⭐ {product.rating.toFixed(1)} ({product.ratingCount} reviews)
          </p>
          <p className="product-description-full">{product.description}</p>
          <p className="muted">
            {product.inStock ? 'In stock and ready to ship.' : 'Out of stock.'}
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
      </section>
    </div>
  )
}

