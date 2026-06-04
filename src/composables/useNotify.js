import { useQuasar } from 'quasar'

export function useNotify() {
  const $q = useQuasar()
  return {
    success: (message) => $q.notify({ type: 'positive', message }),
    error: (message) => $q.notify({ type: 'negative', message }),
    info: (message) => $q.notify({ type: 'info', message }),
  }
}
