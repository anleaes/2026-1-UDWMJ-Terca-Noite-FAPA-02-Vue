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
    console.log('[auth] login start', { username })
    await AuthManager.login(username, password)
    console.log('[auth] login ok, calling loadMe')
    await loadMe()
  }

  async function loadMe() {
    const token = AuthManager.getAccessToken()
    console.log('[auth] loadMe start', { hasToken: !!token })
    if (!token) {
      state.user = null
      state.ready = true
      console.log('[auth] loadMe: no token, user=null')
      return
    }
    try {
      state.user = await AuthManager.me()
      console.log('[auth] loadMe ok', {
        user: state.user,
        isEmployee: !!state.user?.is_employee,
        isGuest: !!state.user?.is_guest,
      })
    } catch (err) {
      state.user = null
      AuthManager.clearTokens()
      console.error('[auth] loadMe failed — tokens cleared', err)
    } finally {
      state.ready = true
    }
  }

  function logout() {
    console.log('[auth] logout')
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
