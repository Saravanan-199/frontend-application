import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function OrderConfirmationPage() {
  const { lastOrder } = useCart()

  if (!lastOrder) {
    return (
      <div className="page">
        <section className="section">
          <h1>No recent order</h1>
          <p className="muted">
            Complete the checkout process to see your order summary.
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
        <h1>Thank you for your purchase!</h1>
        <p className="muted">
          Your simulated payment was successful. Below is a summary of your
          order.
        </p>
        <div className="order-confirmation">
          <div>
            <h2>Order details</h2>
            <p>
              Order ID: <strong>{lastOrder.id}</strong>
            </p>
            <p>
              Placed:{' '}
              <strong>
                {new Date(lastOrder.createdAt).toLocaleString()}
              </strong>
            </p>
            <h3>Items</h3>
            <ul className="order-items">
              {lastOrder.items.map((item) => (
                <li key={item.product.id}>
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>
                    $
                    {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <h2>Shipping to</h2>
            <p>
              <strong>{lastOrder.shippingAddress.fullName}</strong>
              <br />
              {lastOrder.shippingAddress.addressLine1}
              {lastOrder.shippingAddress.addressLine2 && (
                <>
                  <br />
                  {lastOrder.shippingAddress.addressLine2}
                </>
              )}
              <br />
              {lastOrder.shippingAddress.city}{' '}
              {lastOrder.shippingAddress.state}{' '}
              {lastOrder.shippingAddress.postalCode}
              <br />
              {lastOrder.shippingAddress.country}
            </p>
            <h2>Payment summary</h2>
            <p>
              Subtotal: <strong>${lastOrder.subtotal.toFixed(2)}</strong>
            </p>
            <p>
              Shipping:{' '}
              <strong>
                {lastOrder.shipping === 0
                  ? 'Free'
                  : `$${lastOrder.shipping.toFixed(2)}`}
              </strong>
            </p>
            <p>
              Tax: <strong>${lastOrder.tax.toFixed(2)}</strong>
            </p>
            <p className="checkout-total">
              Total: <strong>${lastOrder.total.toFixed(2)}</strong>
            </p>
          </aside>
        </div>
        <div className="order-actions">
          <Link to="/products" className="btn primary">
            Continue shopping
          </Link>
        </div>
      </section>
    </div>
  )
}

