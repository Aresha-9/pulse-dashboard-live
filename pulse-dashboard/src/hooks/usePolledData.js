import { useEffect, useRef, useState } from 'react'
import { POLL_INTERVAL_MS } from '../api.js'

// Fetches `fetcher()` immediately, then again every POLL_INTERVAL_MS.
// `deps` lets a page re-fetch on demand (e.g. when a search box changes)
// without waiting for the next poll tick.
export function usePolledData(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    let cancelled = false

    async function load(isFirstLoad) {
      if (isFirstLoad) setLoading(true)
      try {
        const result = await fetcherRef.current()
        if (!cancelled) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled && isFirstLoad) setLoading(false)
      }
    }

    load(true)
    const id = setInterval(() => load(false), POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, error, loading }
}
