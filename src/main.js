import { createApp } from 'vue'
import { installQuasar } from './boot/quasar'
import { router } from './router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
installQuasar(app)
app.use(router)
app.mount('#app')
