import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './assets/main.css'
//始终在整个应用配置和资源注册完成后被调用。同时请注意，不同于其他资源注册方法，它的返回值是根组件实例而非应用实例。
const app = createApp(App)
app.mount('#app')
app.config.errorHandler = err => {
    console.log("应用级错误处理器  ", err);
}
//app.component('', )
