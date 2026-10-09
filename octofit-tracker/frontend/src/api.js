const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(path) {
  const resolved = new URL(path, API_BASE_URL)
  return `${API_BASE_URL}${resolved.pathname}${resolved.search}${resolved.hash}`
}

export function normalizeCollection(payload) {
  const nested = payload && typeof payload === 'object' && 'data' in payload
    ? payload.data
    : payload
  const items = Array.isArray(nested)
    ? nested
    : Array.isArray(nested?.results)
      ? nested.results
      : Array.isArray(nested?.items)
        ? nested.items
        : []

  return {
    items,
    count: Number(payload?.count ?? payload?.total ?? nested?.count ?? items.length),
    next: payload?.next ?? nested?.next ?? null,
    previous: payload?.previous ?? nested?.previous ?? null,
  }
}