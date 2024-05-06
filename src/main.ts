import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css' // この行を追加
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})



import { createI18n } from 'vue-i18n'
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}
const i18n = createI18n({
  legacy: false,
  locale: 'ja', // set locale
  messages, // set locale messages)
})

const app = createApp(App)
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
