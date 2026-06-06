import { reactive, computed } from 'vue'
import { router } from '../router'
import AuthManager from '../api/AuthManager'

const state = reactive({ user: null, ready: false })

export function useAuth() {
  function requireAuth(to) {
    if (state.user) {
      router.push(to)
      return true
    }
    router.push({ name: 'login', query: { next: typeof to === 'string' ? to : '/' } })
    return false
  }

  async function login(username, password) {
    await AuthManager.login(username, password)
    await loadMe()
  }

  async function loadMe() {
    if (!AuthManager.getAccessToken()) {
      state.user = null
      state.ready = true
      return
    }
    try {
      state.user = await AuthManager.me()
    } catch {
      state.user = null
      AuthManager.clearTokens()
    } finally {
      state.ready = true
    }
  }

  function logout() {
    AuthManager.logout()
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
    requireAuth,
  }
}
