import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { ShippingAddress, PaymentDetails, Order } from '../types'

export default function CheckoutPage() {
  const { items, subtotal, clearCart, setLastOrder } = useCart()
  const navigate = useNavigate()
  const [shipping, setShipping] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })
  const [payment, setPayment] = useState<PaymentDetails>({
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return (
      <div className="page">
        <section className="section">
          <h1>Checkout</h1>
          <p className="muted">
            Your cart is empty. Add items to your cart before checking out.
          </p>
        </section>
      </div>
    )
  }

  const shippingCost = subtotal > 200 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!shipping.fullName || !shipping.email || !shipping.addressLine1) {
      setError('Please fill in required shipping details.')
      return
    }
    if (!payment.cardHolder || !payment.cardNumber || !payment.expiry || !payment.cvv) {
      setError('Please fill in all payment details.')
      return
    }

    setIsProcessing(true)

    // Simulated payment gateway call
    setTimeout(() => {
      const order: Order = {
        id: 'ORD-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
        items,
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        createdAt: new Date().toISOString(),
        shippingAddress: shipping,
      }
      setLastOrder(order)
      clearCart()
      setIsProcessing(false)
      navigate('/order-confirmation')
    }, 1500)
  }

  return (
    <div className="page">
      <section className="section">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout-layout">
          <div className="checkout-form">
            <h2>Shipping address</h2>
            <div className="form-grid">
              <label>
                Full name*
                <input
                  required
                  value={shipping.fullName}
                  onChange={(e) =>
                    setShipping({ ...shipping, fullName: e.target.value })
                  }
                />
              </label>
              <label>
                Email*
                <input
                  type="email"
                  required
                  value={shipping.email}
                  onChange={(e) =>
                    setShipping({ ...shipping, email: e.target.value })
                  }
                />
              </label>
              <label>
                Phone
                <input
                  value={shipping.phone}
                  onChange={(e) =>
                    setShipping({ ...shipping, phone: e.target.value })
                  }
                />
              </label>
              <label className="full-width">
                Address line 1*
                <input
                  required
                  value={shipping.addressLine1}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      addressLine1: e.target.value,
                    })
                  }
                />
              </label>
              <label className="full-width">
                Address line 2
                <input
                  value={shipping.addressLine2}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      addressLine2: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                City
                <input
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                />
              </label>
              <label>
                State / Province
                <input
                  value={shipping.state}
                  onChange={(e) =>
                    setShipping({ ...shipping, state: e.target.value })
                  }
                />
              </label>
              <label>
                Postal code
                <input
                  value={shipping.postalCode}
                  onChange={(e) =>
                    setShipping({
                      ...shipping,
                      postalCode: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Country
                <input
                  value={shipping.country}
                  onChange={(e) =>
                    setShipping({ ...shipping, country: e.target.value })
                  }
                />
              </label>
            </div>

            <h2>Payment details (simulated)</h2>
            <p className="muted small">
              This is a frontend-only demo. Card details are not sent anywhere.
            </p>
            <div className="form-grid">
              <label className="full-width">
                Cardholder name*
                <input
                  required
                  value={payment.cardHolder}
                  onChange={(e) =>
                    setPayment({ ...payment, cardHolder: e.target.value })
                  }
                />
              </label>
              <label className="full-width">
                Card number*
                <input
                  required
                  inputMode="numeric"
                  maxLength={19}
                  placeholder="•••• •••• •••• ••••"
                  value={payment.cardNumber}
                  onChange={(e) =>
                    setPayment({ ...payment, cardNumber: e.target.value })
                  }
                />
              </label>
              <label>
                Expiry (MM/YY)*
                <input
                  required
                  placeholder="MM/YY"
                  value={payment.expiry}
                  onChange={(e) =>
                    setPayment({ ...payment, expiry: e.target.value })
                  }
                />
              </label>
              <label>
                CVV*
                <input
                  required
                  inputMode="numeric"
                  maxLength={4}
                  value={payment.cvv}
                  onChange={(e) =>
                    setPayment({ ...payment, cvv: e.target.value })
                  }
                />
              </label>
            </div>
            {error && <p className="error">{error}</p>}
          </div>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            <p>
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </p>
            <p>
              Shipping:{' '}
              <strong>
                {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
              </strong>
            </p>
            <p>
              Estimated tax: <strong>${tax.toFixed(2)}</strong>
            </p>
            <p className="checkout-total">
              Total: <strong>${total.toFixed(2)}</strong>
            </p>
            <button
              type="submit"
              className="btn primary full"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing payment…' : 'Pay now'}
            </button>
          </aside>
        </form>
      </section>
    </div>
  )
}

