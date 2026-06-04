import { ref } from 'vue'
import BackendManager from '../api/BackendManager'

export function useCrud(resource) {
  const base = `/${resource}/`
  const items = ref([])
  const item = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function list(params) {
    loading.value = true
    error.value = null
    try {
      const data = await BackendManager.get(base, params)
      items.value = Array.isArray(data) ? data : data.results || []
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  async function search(query, extra) {
    return list({ search: query, ...extra })
  }

  async function getOne(id) {
    item.value = await BackendManager.get(`${base}${id}/`)
    return item.value
  }

  const create = (payload) => BackendManager.post(base, payload)
  const update = (id, payload) => BackendManager.put(`${base}${id}/`, payload)
  const remove = (id) => BackendManager.delete(`${base}${id}/`)

  return { items, item, loading, error, list, search, getOne, create, update, remove }
}
