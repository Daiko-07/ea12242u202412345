import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { i18n } from './i18n.js'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(i18n)
app.mount('#app')
