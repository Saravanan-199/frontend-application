import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, subtotal, itemCount, updateQuantity, removeFromCart } =
    useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="page">
        <section className="section">
          <h1>Your cart is empty</h1>
          <p className="muted">
            Start exploring products and add items to your cart.
          </p>
          <Link to="/products" className="btn primary">
            Browse products
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="page">
      <section className="section">
        <h1>Your cart</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  <div>
                    <h3>{item.product.name}</h3>
                    <p className="muted">
                      ${item.product.price.toFixed(2)} each
                    </p>
                    <button
                      type="button"
                      className="link-inline"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.product.id,
                        Number(e.target.value) || 1,
                      )
                    }
                  />
                  <p className="cart-item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <aside className="cart-summary">
            <h2>Order summary</h2>
            <p>
              Items: <strong>{itemCount}</strong>
            </p>
            <p>
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <p className="muted small">
              Shipping and tax are calculated at checkout in this demo.
            </p>
            <button type="button" className="btn primary full" onClick={handleCheckout}>
              Proceed to checkout
            </button>
            <Link to="/products" className="btn ghost full">
              Continue shopping
            </Link>
          </aside>
        </div>
      </section>
    </div>
  )
}

