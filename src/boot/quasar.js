import { Quasar, Notify, Dialog } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

export function installQuasar(app) {
  app.use(Quasar, {
    plugins: { Notify, Dialog },
    config: {
      brand: { primary: '#0066CC' },
      notify: { position: 'top-right', timeout: 2500 },
    },
  })
}
