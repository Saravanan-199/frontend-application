import { useMemo, useState } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import type { Category } from '../types'

const categories: { label: string; value: Category | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Fashion', value: 'fashion' },
  { label: 'Home', value: 'home' },
  { label: 'Sports', value: 'sports' },
  { label: 'Beauty', value: 'beauty' },
]

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return products.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category
      const matchesSearch =
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  return (
    <div className="page">
      <section className="section">
        <div className="section-header">
          <h1>Products</h1>
        </div>
        <div className="filters">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | 'all')}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filtered.length === 0 && (
            <p className="muted">No products match your filters.</p>
          )}
        </div>
      </section>
    </div>
  )
}

