import { API_BASE_URL } from './config'

const TOKEN_KEY = 'hf_access'
const REFRESH_KEY = 'hf_refresh'

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}
export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem(TOKEN_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
}
export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

async function refreshAccess() {
  const refresh = getRefreshToken()
  if (!refresh) return false
  const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  if (!res.ok) {
    clearTokens()
    return false
  }
  const data = await res.json()
  setTokens({ access: data.access })
  return true
}

export async function request(method, path, { body, isMultipart = false, retry = true } = {}) {
  const url = path.startsWith('http')
    ? path
    : `${API_BASE_URL}${path.startsWith('/') ? path : '/' + path}`
  const headers = {}
  const token = getAccessToken()
  if (token) headers.Authorization = `Bearer ${token}`
  let payload = body
  if (body && !isMultipart) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }
  const res = await fetch(url, { method, headers, body: payload })
  if (res.status === 401 && retry && (await refreshAccess())) {
    return request(method, path, { body, isMultipart, retry: false })
  }
  const contentType = res.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await res.json() : await res.text()
  if (!res.ok) {
    const err = new Error('HTTP ' + res.status)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const get = (p) => request('GET', p)
export const post = (p, body, o) => request('POST', p, { body, ...o })
export const put = (p, body, o) => request('PUT', p, { body, ...o })
export const patch = (p, body, o) => request('PATCH', p, { body, ...o })
export const del = (p) => request('DELETE', p)
