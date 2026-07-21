// Thin fetch wrapper around the Pulse API (see /pulse-api in the project root).
// Base URL is read from an env var so you can point this at localhost while
// developing and at your deployed API URL in production, without touching code.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// How often the dashboard re-fetches data in the background, in milliseconds.
// This is what gives the "live" feel without needing a WebSocket.
export const POLL_INTERVAL_MS = 8000

async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request to ${path} failed with ${res.status}`)
  }

  return res.json()
}

export function getStats() {
  return request('/api/stats')
}

export function getRevenueTrend() {
  return request('/api/revenue-trend')
}

export function getConversionTrend() {
  return request('/api/conversion-trend')
}

export function getOrders(query = '') {
  const q = query ? `?q=${encodeURIComponent(query)}` : ''
  return request(`/api/orders${q}`)
}

export function getCustomers() {
  return request('/api/customers')
}

export function createOrder(order) {
  return request('/api/orders', { method: 'POST', body: JSON.stringify(order) })
}
