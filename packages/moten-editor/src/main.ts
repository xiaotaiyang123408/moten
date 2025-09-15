import './assets/styles/main.scss'
import '@moten/ui/style'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores/index'
import { Icon } from '@iconify/vue'
import draggable from 'vuedraggable'
import moten from '@moten/ui'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use<{ platform: 'editor' | 'user' }>(moten, { platform: 'editor' })
app.use(router)
app.use(pinia)
app.component('Icon', Icon)
app.component('draggable', draggable)
app.component('QuillEditor', QuillEditor)
app.mount('#app')
