export type Category = 'electronics' | 'fashion' | 'home' | 'sports' | 'beauty'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: Category
  imageUrl: string
  inStock: boolean
  rating: number
  ratingCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface ShippingAddress {
  fullName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface PaymentDetails {
  cardHolder: string
  cardNumber: string
  expiry: string
  cvv: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  createdAt: string
  shippingAddress: ShippingAddress
}

