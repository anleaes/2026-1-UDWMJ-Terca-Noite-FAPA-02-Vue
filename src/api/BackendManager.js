import axios from 'axios'
import AuthManager from './AuthManager'

export default class BackendManager {
  static #client = axios.create({ baseURL: import.meta.env.VITE_BACKEND_BASE_URL })

  static {
    this.#client.interceptors.request.use(this.#attachAuthHeader)
    this.#client.interceptors.response.use((response) => response, this.#handleUnauthorized)
  }

  static get(url, params) {
    return this.#request('get', url, null, params ? { params } : {})
  }

  static post(url, body) {
    return this.#request('post', url, body)
  }

  static put(url, body) {
    return this.#request('put', url, body)
  }

  static patch(url, body) {
    return this.#request('patch', url, body)
  }

  static delete(url) {
    return this.#request('delete', url)
  }

  static #attachAuthHeader(config) {
    const token = AuthManager.getAccessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  }

  static async #handleUnauthorized(error) {
    const original = error.config
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }
    original._retry = true
    if (!(await AuthManager.refresh())) {
      return Promise.reject(error)
    }
    original.headers.Authorization = `Bearer ${AuthManager.getAccessToken()}`
    return BackendManager.#client(original)
  }

  static #hasFile(payload) {
    if (!payload || typeof payload !== 'object') return false
    return Object.values(payload).some((v) => v instanceof File || v instanceof Blob)
  }

  static #toFormData(payload) {
    const fd = new FormData()
    Object.entries(payload).forEach(([k, v]) => {
      if (v !== null && v !== undefined && v !== '') fd.append(k, v)
    })
    return fd
  }

  static async #request(method, url, body, config = {}) {
    let data = body
    const finalConfig = { ...config }
    if (body && this.#hasFile(body)) {
      data = this.#toFormData(body)
      finalConfig.headers = { ...finalConfig.headers, 'Content-Type': 'multipart/form-data' }
    }
    const response = await this.#client.request({ method, url, data, ...finalConfig })
    return response.data
  }
}
