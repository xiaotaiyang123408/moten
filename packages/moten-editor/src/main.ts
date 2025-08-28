import './assets/styles/main.scss'
import '@moten/ui/style'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores/index'
import { Icon } from '@iconify/vue'
import draggable from 'vuedraggable'
import moten from '@moten/ui'

const app = createApp(App)
app.use<{ platform: 'editor' | 'user' }>(moten, { platform: 'editor' })
app.use(router)
app.use(pinia)
app.component('Icon', Icon)
app.component('draggable', draggable)
app.mount('#app')
