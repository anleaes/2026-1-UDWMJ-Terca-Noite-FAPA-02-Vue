import axios from 'axios'
import BackendManager from './BackendManager'

const ACCESS_TOKEN_KEY = 'hf_access'
const REFRESH_TOKEN_KEY = 'hf_refresh'

export default class AuthManager {
  static async login(username, password) {
    const data = await BackendManager.post('/auth/token/', { username, password })
    this.setTokens({ access: data.access, refresh: data.refresh })
    return data
  }

  static logout() {
    this.clearTokens()
  }

  static me() {
    return BackendManager.get('/auth/me/')
  }

  static register({ username, password1, password2 }) {
    const fd = new FormData()
    fd.append('username', username)
    fd.append('password1', password1)
    fd.append('password2', password2)
    return BackendManager.post('/accounts/registrar/', fd)
  }

  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  static getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

  static setTokens({ access, refresh }) {
    if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access)
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  }

  static clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  static async refresh() {
    const refresh = this.getRefreshToken()
    if (!refresh) return false

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/token/refresh/`,
        { refresh }
      )
      this.setTokens({ access: data.access })
      return true
    } catch {
      this.clearTokens()
      return false
    }
  }
}
