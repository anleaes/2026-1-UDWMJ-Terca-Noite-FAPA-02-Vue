import { reactive, computed } from 'vue'
import { post, get, setTokens, clearTokens, getAccessToken } from '../api/http'

const state = reactive({ user: null, ready: false })

export function useAuth() {
  async function login(username, password) {
    const data = await post('/auth/token/', { username, password })
    setTokens({ access: data.access, refresh: data.refresh })
    await loadMe()
  }

  async function loadMe() {
    if (!getAccessToken()) {
      state.user = null
      state.ready = true
      return
    }
    try {
      state.user = await get('/auth/me/')
    } catch {
      state.user = null
      clearTokens()
    } finally {
      state.ready = true
    }
  }

  function logout() {
    clearTokens()
    state.user = null
  }

  return {
    user: computed(() => state.user),
    isAuthenticated: computed(() => !!state.user),
    isEmployee: computed(() => !!state.user?.is_employee),
    isGuest: computed(() => !!state.user?.is_guest),
    ready: computed(() => state.ready),
    login,
    logout,
    loadMe,
  }
}
