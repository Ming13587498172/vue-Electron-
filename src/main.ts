import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/styles/base.less'
import '@/assets/styles/iconfont.less'
import '@vant/touch-emulator'
import 'vant/es/toast/style'

import '@/mock/index'

const app = createApp(App)
app.use(router)
app.mount('#app')
