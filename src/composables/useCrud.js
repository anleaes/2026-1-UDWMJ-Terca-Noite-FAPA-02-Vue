import { ref } from 'vue'
import { get, del, request } from '../api/http'

function hasFile(payload) {
  if (!payload || typeof payload !== 'object') return false
  return Object.values(payload).some(v => v instanceof File || v instanceof Blob)
}

function toFormData(payload) {
  const fd = new FormData()
  Object.entries(payload).forEach(([k, v]) => {
    if (v === null || v === undefined || v === '') return
    fd.append(k, v)
  })
  return fd
}

function send(method, url, payload) {
  if (hasFile(payload)) {
    return request(method, url, { body: toFormData(payload), isMultipart: true })
  }
  return request(method, url, { body: payload })
}

export function useCrud(resource) {
  const base = `/${resource}/`
  const items = ref([])
  const item = ref(null)
  const loading = ref(false)
  const error = ref(null)

  function buildUrl(params) {
    if (!params || !Object.keys(params).length) return base
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') qs.append(k, v)
    })
    const s = qs.toString()
    return s ? `${base}?${s}` : base
  }

  async function list(params) {
    loading.value = true; error.value = null
    try {
      const data = await get(buildUrl(params))
      items.value = Array.isArray(data) ? data : (data.results || [])
    } catch (e) { error.value = e } finally { loading.value = false }
  }

  async function search(query, extra) {
    return list({ search: query, ...extra })
  }

  async function getOne(id) {
    item.value = await get(`${base}${id}/`)
    return item.value
  }

  const create = (payload)     => send('POST', base, payload)
  const update = (id, payload) => send('PUT',  `${base}${id}/`, payload)
  const remove = (id)          => del(`${base}${id}/`)

  return { items, item, loading, error, list, search, getOne, create, update, remove }
}
