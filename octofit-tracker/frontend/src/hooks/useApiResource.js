import { useEffect, useState } from 'react'
import { apiUrl, normalizeCollection } from '../api.js'

export function useApiResource(path, fetcher = fetch) {
  const [requestUrl, setRequestUrl] = useState(() => apiUrl(path))
  const [reloadCount, setReloadCount] = useState(0)
  const [resource, setResource] = useState({
    items: [],
    count: 0,
    next: null,
    previous: null,
    loading: true,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setResource((current) => ({ ...current, loading: true, error: '' }))

      try {
        const response = await fetcher(requestUrl, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const collection = normalizeCollection(await response.json())
        if (active) {
          setResource({ ...collection, loading: false, error: '' })
        }
      } catch (error) {
        if (active && error.name !== 'AbortError') {
          setResource((current) => ({
            ...current,
            loading: false,
            error: error.message || 'Unable to load this resource.',
          }))
        }
      }
    }

    load()
    return () => {
      active = false
      controller.abort()
    }
  }, [fetcher, requestUrl, reloadCount])

  return {
    ...resource,
    refresh: () => setReloadCount((count) => count + 1),
    goToNextPage: () => resource.next && setRequestUrl(apiUrl(resource.next)),
    goToPreviousPage: () => resource.previous && setRequestUrl(apiUrl(resource.previous)),
  }
}